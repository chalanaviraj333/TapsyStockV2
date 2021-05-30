import { Component, OnInit, ViewChild } from "@angular/core";
import { IonContent, IonSearchbar } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { RemoteShell } from "../remote-shell";
import { LowStockItem } from "../low-stock-item";

@Component({
  selector: "app-remoteshell-page",
  templateUrl: "./remoteshell-page.page.html",
  styleUrls: ["./remoteshell-page.page.scss"],
})
export class RemoteshellPagePage implements OnInit {
  @ViewChild("search", { static: false }) search: IonSearchbar;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  private keyShells: Array<RemoteShell> = [];
  public searchedItem: Array<RemoteShell> = [];

  public hideButton: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<{ [key: string]: RemoteShell }>(
        "https://tapsystock-a6450-default-rtdb.firebaseio.com/remote-shells.json"
      )
      .subscribe((resData) => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            this.keyShells.push({
              key,
              tapsycode: resData[key].tapsycode,
              boxnumber: resData[key].boxnumber,
              remotetype: resData[key].remotetype,
              compitablebrands: resData[key].compitablebrands,
              image: resData[key].image,
              blade: resData[key].blade,
              buttons: resData[key].buttons,
              notes: resData[key].notes,
              inStock: resData[key].inStock,
            });
            this.keyShells.sort((a, b) => (a.boxnumber > b.boxnumber ? 1 : -1));
          }
        }
      });

    this.searchedItem = this.keyShells;
  }

  _ionChange(event) {
    const val = event.target.value;

    this.searchedItem = this.keyShells;

    if (val && val.trim() != "") {
      this.searchedItem = this.searchedItem.filter((currentKeyShell) => {
        if (currentKeyShell.compitablebrands !== undefined) {
          let searchWord =
            currentKeyShell.tapsycode +
            currentKeyShell.blade +
            currentKeyShell.compitablebrands.toString();
          return searchWord.toLowerCase().indexOf(val.toLowerCase()) > -1;
        } else {
          let searchWord = currentKeyShell.tapsycode + currentKeyShell.blade;
          return searchWord.toLowerCase().indexOf(val.toLowerCase()) > -1;
        }
      });
    }
  }

  _lowStock(i, lowStockRemoteShellTapsyCode) {
    const selectedlowstockitem = this.keyShells.find(
      (i) => i.tapsycode === lowStockRemoteShellTapsyCode
    );

    selectedlowstockitem.inStock = false;

    const lowStockItem: LowStockItem = {
      key: null,
      boxno: selectedlowstockitem.boxnumber,
      tapsycode: selectedlowstockitem.tapsycode,
      itemtype: selectedlowstockitem.remotetype,
      image: selectedlowstockitem.image,
    };

    this.http
      .post(
        "https://tapsystock-a6450-default-rtdb.firebaseio.com/lowstockitemsV2.json",
        lowStockItem
      )
      .subscribe((resData) => {
        // console.log(resData);
      });

    this.http
      .put(
        `https://tapsystock-a6450-default-rtdb.firebaseio.com/remote-shells/${selectedlowstockitem.key}.json`,
        { ...selectedlowstockitem, remoteinStock: false, key: null }
      )
      .subscribe((resData) => {
        // console.log(resData);
      });
  }

  logScrollStart() {
    setTimeout(() => {
      this.hideButton = true;
    }, 500);
  }

  ScrollToTop() {
    this.content.scrollToTop(1500);
    setTimeout(() => {
      this.hideButton = false;
    }, 4000);
  }
}
