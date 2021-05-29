import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import 'firebase/storage';
import { NavparamService } from '../navparam.service';

interface Model {
  key: string;
  brand: string;
  model: string;
  icon: string;
  startyear: number;
  endyear: number;
}
@Component({
  selector: 'app-model',
  templateUrl: './model.page.html',
  styleUrls: ['./model.page.scss'],
})
export class ModelPage implements OnInit {

  private models: Array<Model> = [];
  public searchedItem: Array<Model> = [];
  public selectedBrand: string;
  printerror = 'LOADING';
  iconerror = 'happy-outline';
  isFetching = true;


  constructor(
    private router: Router, private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private navParamService: NavparamService
  ) {

    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('brandId')) {
        // redirect
        return;
      }
      this.selectedBrand = paramMap.get('brandId');
    });

  }

  ngOnInit() {

      this.http.get<{ [key: string]: Model }>('https://tapsystock-a6450-default-rtdb.firebaseio.com/car-model.json')
      .subscribe(resData => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            if (resData[key].brand == this.selectedBrand) {
                  this.models.push({ key, brand: resData[key].brand, model: resData[key].model, startyear: resData[key].startyear, endyear: resData[key].endyear, icon: resData[key].icon })
                  this.models.sort((a, b) => (a.model > b.model) ? 1 : -1)
                  this.isFetching = false;

            }
          }
        }

        this.searchedItem = this.models;

        if (this.models.length == 0){
          this.printerror = 'No Models Found';
          this.iconerror = 'sad-outline';
        }
      });
    }




  onClick(x, startyear, endyear) {

    const selectedModel = x;


    // let car = { brand: this.selectedBrand, model: x, startyear: startyear, endyear: endyear };
    // this.navParamService.setNavData(car);

      this.router.navigateByUrl('tabs/tab1/year/' + this.selectedBrand + '/' + selectedModel + '/' + startyear + '/' + endyear );

  }

  _ionChange(event) {
    const val = event.target.value;

    this.searchedItem = this.models;

    if (val && val.trim() != '') {
      this.searchedItem = this.searchedItem.filter((item: any) => {
        return (item.model.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  // refreshImagesButton() {

  //   this.models.forEach(model => {

  //     this.http.put(`https://tapsystock-a6450-default-rtdb.firebaseio.com/car-model/${model.key}.json`,
  //       { ...model, key: null }).subscribe(
  //         resData => {
  //           console.log(resData);
  //         }
  //       );

  //   });

  // }



}

