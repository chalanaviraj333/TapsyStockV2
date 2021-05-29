import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavparamService } from '../navparam.service';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/storage';

interface Carmodel {
  brand: string;
  model: string;
  icon: string;
  startyear: number;
  endyear: number;
}

@Component({
  selector: 'app-programmingdetails',
  templateUrl: './programmingdetails.page.html',
  styleUrls: ['./programmingdetails.page.scss'],
})
export class ProgrammingdetailsPage implements OnInit {

  public searchedItem: Array<Carmodel> = [];
  public carmodels: Array<Carmodel> = [];

  constructor(private navParamService: NavparamService, private router: Router, private http: HttpClient) {

    this.http.get<{ [key: string]: Carmodel }>('https://tapsystock-a6450-default-rtdb.firebaseio.com/car-model.json')
      .subscribe(resData => {
        for (const key in resData) {
          const iconname = (resData[key].icon);
          firebase.storage().ref().child('images/carmodels/' + iconname).getDownloadURL()
            .then(response => {
              this.carmodels.push({
                brand: resData[key].brand, model: resData[key].model, icon: response,
                startyear: resData[key].startyear, endyear: resData[key].endyear
              })
              this.carmodels.sort((a, b) => (a.brand > b.brand) ? 1 : -1)
            })
            .catch(error => { console.log('error', error) })
        }

        this.searchedItem = this.carmodels;

      });

  }

  _ionChange(event) {
    const val = event.target.value;

    this.searchedItem = this.carmodels;

    if (val && val.trim() != '') {
      this.searchedItem = this.searchedItem.filter((currentcarmodel) => {
        let searchWord = currentcarmodel.brand + currentcarmodel.model;
        return (searchWord.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


  onClick(brand, model, startyear, endyear) {
    let selectedmodel = { brand: brand, model: model, startyear: startyear, endyear: endyear };


    this.navParamService.setNavData(selectedmodel);
    this.router.navigateByUrl('addprogrammingdetails');

  }

  ngOnInit() {
  }

}
