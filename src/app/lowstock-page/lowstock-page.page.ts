import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Remote } from "../remote";
import { LowStockItem } from "../low-stock-item";
import { RemoteShell } from "../remote-shell";

@Component({
  selector: "app-lowstock-page",
  templateUrl: "./lowstock-page.page.html",
  styleUrls: ["./lowstock-page.page.scss"],
})
export class LowstockPagePage implements OnInit {
  private remotes: Array<Remote> = [];
  private keyShells: Array<RemoteShell> = [];

  public lowstockItems: Array<LowStockItem> = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<{ [key: string]: LowStockItem }>(
        "https://tapsystock-a6450-default-rtdb.firebaseio.com/lowstockitemsV2.json"
      )
      .subscribe((resData) => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            this.lowstockItems.push({
              key,
              boxno: resData[key].boxno,
              tapsycode: resData[key].tapsycode,
              itemtype: resData[key].itemtype,
              image: resData[key].image,
            });
            this.lowstockItems.sort((a, b) => (a.boxno > b.boxno ? 1 : -1));
          }
        }
      });

    // getting all remotes
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
          }
        }
      });

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
          }
        }
      });
  }

  _stockadded(
    lowstockitemIndex,
    lowstockitemtapsycode,
    selecteditemtype,
    lowstockitemkey
  ) {
    if (
      selecteditemtype == "BLADED" ||
      selecteditemtype == "SLOT" ||
      selecteditemtype == "PROX"
    ) {
      const lowStockRemote = this.remotes.find(
        (i) => i.tapsycode === lowstockitemtapsycode
      );

      this.http
        .put(
          `https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes/${lowStockRemote.key}.json`,
          { ...lowStockRemote, remoteinStock: true, key: null }
        )
        .subscribe((resData) => {
          // console.log(resData);
        });
    } else if (selecteditemtype == "keyshell") {
      const lowstockRemoteShell = this.keyShells.find(
        (i) => i.tapsycode === lowstockitemtapsycode
      );

      this.http
        .put(
          `https://tapsystock-a6450-default-rtdb.firebaseio.com/remote-shells/${lowstockRemoteShell.key}.json`,
          { ...lowstockRemoteShell, inStock: true, key: null }
        )
        .subscribe((resData) => {
          // console.log(resData);
        });
    }

    this.lowstockItems.splice(lowstockitemIndex, 1);
    this.http
      .delete(
        `https://tapsystock-a6450-default-rtdb.firebaseio.com/lowstockitemsV2/${lowstockitemkey}.json`
      )
      .subscribe((resData) => {});
  }
}
