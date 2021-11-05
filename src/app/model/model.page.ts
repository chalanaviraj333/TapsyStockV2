import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { IonContent, IonSearchbar } from "@ionic/angular";
import { DatabaseServiceService } from "../database-service.service";


interface Model {
  key: string;
  brand: string;
  model: string;
  icon: string;
  startyear: number;
  endyear: number;
}
@Component({
  selector: "app-model",
  templateUrl: "./model.page.html",
  styleUrls: ["./model.page.scss"],
})
export class ModelPage implements OnInit {
  @ViewChild("search", { static: false }) search: IonSearchbar;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  private models: Array<Model> = [];
  public searchedItem: Array<Model> = [];
  public selectedBrand: string;

  private carModelswithoutImages: Array<Model> = [];
  printerror = "LOADING";
  iconerror = "happy-outline";
  isFetching = true;

  public hideButton: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    public databaseService: DatabaseServiceService
  ) {

    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("brandId")) {
        // redirect
        return;
      }
      this.selectedBrand = paramMap.get("brandId");
    });
  }

  ngOnInit() {

    this.http
      .get<{ [key: string]: Model }>(
        "https://tapsystock-a6450-default-rtdb.firebaseio.com/car-model.json"
      )
      .subscribe((resData) => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            if (resData[key].brand == this.selectedBrand) {
              this.models.push({
                key,
                brand: resData[key].brand,
                model: resData[key].model,
                startyear: resData[key].startyear,
                endyear: resData[key].endyear,
                icon: resData[key].icon,
              });
              this.models.sort((a, b) => (a.model > b.model ? 1 : -1));
              this.isFetching = false;
            }
          }
        }

        this.searchedItem = this.models;

        if (this.models.length == 0) {
          this.printerror = "No Models Found";
          this.iconerror = "sad-outline";
        }

        this.searchedItem.forEach((carmodel) => {
          if (carmodel.icon.length < 50) {
            this.carModelswithoutImages.push(carmodel);
          }
        });
      });
  }

  onClick(x, startyear, endyear) {
    const selectedModel = x;

    this.router.navigateByUrl(
      "tabs/tab1/year/" +
        this.selectedBrand +
        "/" +
        selectedModel +
        "/" +
        startyear +
        "/" +
        endyear
    );
  }

  _ionChange(event) {
    const val = event.target.value;

    this.searchedItem = this.models;

    if (val && val.trim() != "") {
      this.searchedItem = this.searchedItem.filter((item: any) => {
        return item.model.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
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
