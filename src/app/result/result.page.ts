import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Remote } from "../remote";
import { NavparamService } from "../navparam.service";

interface SelectedCar {
  carbrand?: string;
  model?: string;
  selectedyear?: number;
  blade?: string;
  carID?: string;
  image?: string;
}

interface Car {
  brand: string;
  model: string;
  icon: string;
}

interface CarNote {
  key?: string;
  brand?: string;
  model?: string;
  selectedyear?: number;
  carnotesDescription?: string;
}

interface LowStockItem {
  key?: string;
  boxno: number;
  tapsycode: string;
  itemtype: string;
  image: string;
}

@Component({
  selector: "app-result",
  templateUrl: "./result.page.html",
  styleUrls: ["./result.page.scss"],
})
export class ResultPage implements OnInit {
  public startyear: string;
  public endyear: string;

  public selectedCarDetails: SelectedCar = {};

  printerror = "LOADING";
  iconerror = "happy-outline";
  isFetching = true;
  public compitableremotes: Array<Remote> = [];
  public carnotes: Array<string> = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private navParamService: NavparamService
  ) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("selectedBrand" && "selectedModel" && "selectedYear")) {
        // redirect
        return;
      }
      this.selectedCarDetails.model = paramMap.get("selectedModel");
      this.selectedCarDetails.selectedyear = Number(
        paramMap.get("selectedYear")
      );
      this.selectedCarDetails.carbrand = paramMap.get("selectedBrand");

      this.startyear = paramMap.get("startyear");
      this.endyear = paramMap.get("endyear");
    });
  }

  onSubmit(form: NgForm) {
    const newCarNote: CarNote = {
      brand: this.selectedCarDetails.carbrand,
      model: this.selectedCarDetails.model,
      selectedyear: this.selectedCarDetails.selectedyear,
      carnotesDescription: form.value.carnote,
    };

    this.carnotes.push(newCarNote.carnotesDescription);
    this.navParamService.setCarNote(this.selectedCarDetails.selectedyear);

    this.http
      .post(
        "https://tapsystock-a6450-default-rtdb.firebaseio.com/carprogrammingdetailsV2.json",
        { ...newCarNote, key: null }
      )
      .subscribe((resData) => {
        // console.log(resData);
      });
  }

  ngOnInit() {
    this.http
      .get<{ [key: string]: Car }>(
        "https://tapsystock-a6450-default-rtdb.firebaseio.com/car-model.json"
      )
      .subscribe((resData) => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            if (
              resData[key].brand == this.selectedCarDetails.carbrand &&
              resData[key].model == this.selectedCarDetails.model
            ) {
              this.selectedCarDetails.image = resData[key].icon;
            }
          }
        }
      });

    // getting car notes
    this.http
      .get<{ [key: string]: CarNote }>(
        "https://tapsystock-a6450-default-rtdb.firebaseio.com/carprogrammingdetailsV2.json"
      )
      .subscribe((resData) => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            if (
              resData[key].brand == this.selectedCarDetails.carbrand &&
              resData[key].model == this.selectedCarDetails.model &&
              resData[key].selectedyear == this.selectedCarDetails.selectedyear
            ) {
              this.carnotes.push(resData[key].carnotesDescription);
            }
          }
        }
      });

    this.http
      .get<{ [key: string]: Remote }>(
        "https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes.json"
      )
      .subscribe((resData) => {
        for (const key in resData) {
          let compatiblecars: any = resData[key].compitablecars;

          if (
            compatiblecars !== undefined &&
            compatiblecars.find(
              (i) =>
                i.brand === this.selectedCarDetails.carbrand &&
                i.model === this.selectedCarDetails.model &&
                this.selectedCarDetails.selectedyear >= i.startyear &&
                this.selectedCarDetails.selectedyear <= i.endyear
            )
          ) {
            this.compitableremotes.push({
              key,
              tapsycode: resData[key].tapsycode,
              boxnumber: resData[key].boxnumber,
              inbuildchip: resData[key].inbuildchip,
              inbuildblade: resData[key].inbuildblade,
              remotetype: resData[key].remotetype.toUpperCase(),
              battery: resData[key].battery,
              buttons: resData[key].buttons,
              costperitem: resData[key].costperitem,
              frequency: resData[key].frequency,
              remoteinStock: resData[key].remoteinStock,
              compitablebrands: resData[key].compitablebrands,
              image: resData[key].image,
              notes: resData[key].notes,
              compitablecars: resData[key].compitablecars,
            });
            this.compitableremotes.sort((a, b) =>
              a.boxnumber > b.boxnumber ? 1 : -1
            );
            this.isFetching = false;
          }
        }

        if (this.compitableremotes.length == 0) {
          this.printerror = "No Remotes Found";
          this.iconerror = "sad-outline";
        }
      });
  }

  onClickLowStock(lowstockremote) {
    const selectedremote = this.compitableremotes.find(
      (i) => i.tapsycode === lowstockremote
    );
    this.navParamService.setRemoteKey(selectedremote.key);

    selectedremote.remoteinStock = false;

    const lowStockItem: LowStockItem = {
      boxno: selectedremote.boxnumber,
      tapsycode: selectedremote.tapsycode,
      itemtype: selectedremote.remotetype,
      image: selectedremote.image,
    };

    this.http
      .put(
        `https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes/${selectedremote.key}.json`,
        { ...selectedremote, remoteinStock: false, key: null }
      )
      .subscribe((resData) => {
        // console.log(resData);
      });

    this.http
      .post(
        "https://tapsystock-a6450-default-rtdb.firebaseio.com/lowstockitemsV2.json",
        { ...lowStockItem, key: null }
      )
      .subscribe((resData) => {
        // console.log(resData);
      });
  }
}
