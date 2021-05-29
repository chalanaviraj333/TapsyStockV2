import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

interface Remote {
  tapsycode: string;
  boxnumber: number;
  inbuildchip: string;
  inbuildblade: string;
  remotetype: string;
  compitablebrands: Array<string>;
  image: string;
  notes: string;
  compitablecars: Array<Object>;
}

interface Year {
  modelyear: number;
  availableremotes: boolean;
}

@Component({
  selector: "app-year",
  templateUrl: "./year.page.html",
  styleUrls: ["./year.page.scss"],
})
export class YearPage implements OnInit {
  car: any;
  public selectedModel: string;
  private startyear: number;
  private endyear: number;
  public selectedBrand: string;
  public years: Array<Year> = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (
        !paramMap.has(
          "selectedBrand" && "selectedModel" && "startyear" && "endyear"
        )
      ) {
        // redirect
        return;
      }
      this.selectedBrand = paramMap.get("selectedBrand");
      this.selectedModel = paramMap.get("selectedModel");
      this.startyear = Number(paramMap.get("startyear"));
      this.endyear = Number(paramMap.get("endyear"));
    });
  }

  ngOnInit() {
    const remotesCompatibleCarArray = [];

    for (let i = this.startyear; i <= this.endyear; i++) {
      this.years.push({ modelyear: i, availableremotes: false });
    }

    this.http
      .get<{ [key: string]: Remote }>(
        "https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes.json"
      )
      .subscribe((resData) => {
        for (const key in resData) {
          let compatiblecars: any = resData[key].compitablecars;

          this.years.forEach((year) => {
            if (
              compatiblecars !== undefined &&
              compatiblecars.find(
                (i) =>
                  i.brand === this.selectedBrand &&
                  i.model === this.selectedModel &&
                  year.modelyear >= i.startyear &&
                  year.modelyear <= i.endyear
              )
            ) {
              year.availableremotes = true;
            }
          });
        }
      });
  }

  onSelect(year) {
    const selectedYear = year;

    this.router.navigateByUrl(
      "tabs/tab1/result/" +
        this.selectedBrand +
        "/" +
        this.selectedModel +
        "/" +
        selectedYear +
        "/" +
        this.startyear +
        "/" +
        this.endyear
    );
  }
}
