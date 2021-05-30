import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavparamService } from "../navparam.service";
import { LowStockItem } from "../low-stock-item";

interface Car {
  brand: string;
  model: string;
  startyear: number;
  endyear: number;
}

interface Remote {
  key?: string;
  tapsycode?: string;
  boxnumber?: number;
  inbuildchip?: string;
  inbuildblade?: string;
  battery?: string;
  buttons?: number;
  frequency?: string;
  costperitem?: number;
  remotetype?: string;
  image?: string;
  notes?: string;
  remoteinStock?: boolean;
  compitablecars?: Array<Car>;
  compitablebrands?: Array<string>;
}

@Component({
  selector: "app-remotedetails",
  templateUrl: "./remotedetails.page.html",
  styleUrls: ["./remotedetails.page.scss"],
})
export class RemotedetailsPage implements OnInit {
  public selectedremote: Remote = {};

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private navParamService: NavparamService
  ) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("selectedRemote")) {
        // redirect
        return;
      }
      this.selectedremote.tapsycode = paramMap.get("selectedRemote");
    });
  }

  ngOnInit() {
    this.http
      .get<{ [key: string]: Remote }>(
        "https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes.json"
      )
      .subscribe((resData) => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            if (resData[key].tapsycode == this.selectedremote.tapsycode) {
              (this.selectedremote.key = key),
                (this.selectedremote.boxnumber = resData[key].boxnumber),
                (this.selectedremote.inbuildchip = resData[key].inbuildchip),
                (this.selectedremote.inbuildblade = resData[key].inbuildblade),
                (this.selectedremote.battery = resData[key].battery),
                (this.selectedremote.buttons = resData[key].buttons),
                (this.selectedremote.costperitem = resData[key].costperitem),
                (this.selectedremote.frequency = resData[key].frequency),
                (this.selectedremote.remotetype =
                  resData[key].remotetype.toUpperCase()),
                (this.selectedremote.image = resData[key].image),
                (this.selectedremote.notes = resData[key].notes),
                (this.selectedremote.remoteinStock =
                  resData[key].remoteinStock),
                (this.selectedremote.compitablecars =
                  resData[key].compitablecars),
                (this.selectedremote.compitablebrands =
                  resData[key].compitablebrands);
            }
          }
        }
      });
  }

  onClickLowStock() {
    this.selectedremote.remoteinStock = false;
    this.navParamService.setRemoteKey(this.selectedremote.key);

    const lowStockItem: LowStockItem = {
      key: null,
      boxno: this.selectedremote.boxnumber,
      tapsycode: this.selectedremote.tapsycode,
      itemtype: this.selectedremote.remotetype,
      image: this.selectedremote.image,
    };

    this.http
      .put(
        `https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes/${this.selectedremote.key}.json`,
        { ...this.selectedremote, remoteinStock: false, key: null }
      )
      .subscribe((resData) => {
        // console.log(resData);
      });

    this.http
      .post(
        "https://tapsystock-a6450-default-rtdb.firebaseio.com/lowstockitemsV2.json",
        lowStockItem
      )
      .subscribe((resData) => {
        // console.log(resData);
      });
  }
}
