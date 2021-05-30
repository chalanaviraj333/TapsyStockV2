import { HttpClient } from "@angular/common/http";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { IonContent, IonSearchbar } from "@ionic/angular";
import { NavparamService } from "../navparam.service";
import { Remote } from "../remote";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page implements OnInit, OnDestroy {
  @ViewChild("search", { static: false }) search: IonSearchbar;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  private remotes: Array<Remote> = [];
  public searchedItem: Array<Remote> = [];

  public hideButton: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private navParamService: NavparamService
  ) {}

  ngOnInit() {
    this.http
      .get<{ [key: string]: Remote }>(
        "https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes.json"
      )
      .subscribe((resData) => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            this.remotes.push({
              key,
              tapsycode: resData[key].tapsycode,
              boxnumber: resData[key].boxnumber,
              inbuildchip: resData[key].inbuildchip,
              inbuildblade: resData[key].inbuildblade,
              battery: resData[key].battery,
              buttons: resData[key].buttons,
              costperitem: resData[key].costperitem,
              frequency: resData[key].frequency,
              remotetype: resData[key].remotetype,
              image: resData[key].image,
              notes: resData[key].notes,
              remoteinStock: resData[key].remoteinStock,
              compitablecars: resData[key].compitablecars,
              compitablebrands: resData[key].compitablebrands,
            });
            this.remotes.sort((a, b) => (a.boxnumber > b.boxnumber ? 1 : -1));
          }
        }
      });

    this.searchedItem = this.remotes;
  }

  ionViewWillEnter() {
    let changedLowStockItem = this.navParamService.getRemoteKey();

    if (changedLowStockItem !== undefined) {
      const changingitem = this.remotes.find(
        (i) => i.key === changedLowStockItem
      );

      changingitem.remoteinStock = false;
      this.navParamService.setRemoteKey(undefined);
    }
  }

  ngOnDestroy() {}

  _ionChange(event) {
    const val = event.target.value;

    this.searchedItem = this.remotes;

    if (val && val.trim() != "") {
      this.searchedItem = this.searchedItem.filter((currentremote) => {
        if (currentremote.compitablebrands !== undefined) {
          let searchWord =
            currentremote.tapsycode +
            currentremote.inbuildblade +
            currentremote.compitablebrands.toString();
          return searchWord.toLowerCase().indexOf(val.toLowerCase()) > -1;
        } else {
          let searchWord = currentremote.tapsycode + currentremote.inbuildblade;
          return searchWord.toLowerCase().indexOf(val.toLowerCase()) > -1;
        }
      });
    }
  }

  onClick(x) {
    const selectedremote = x;

    this.router.navigateByUrl("tabs/tab2/remotedetails/" + selectedremote);
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
