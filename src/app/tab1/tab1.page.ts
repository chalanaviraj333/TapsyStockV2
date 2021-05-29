import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import firebase from 'firebase/app';
import 'firebase/storage';


import { environment } from '../../environments/environment';

interface Brand {
  key: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild('search', { static: false }) search: IonSearchbar;

  public brands: Array<Brand> = [];
  public searchedItem: any;

  constructor(
    private router: Router, private http: HttpClient
  ) {

    firebase.initializeApp(environment.firebase);

  }

  ngOnInit() {
    this.http.get<{ [key: string]: Brand }>('https://tapsystock-a6450-default-rtdb.firebaseio.com/car-brand.json')
      .subscribe(resData => {


        // for (const key in resData) {
        //   if (resData.hasOwnProperty(key)){
        //   const iconname = (resData[key].icon);
        //   firebase.storage().ref().child('images/' + iconname).getDownloadURL()
        //     .then(response => {
        //       this.brands.push({key, name: resData[key].name, icon: response })
        //       this.brands.sort((a, b) => (a.name > b.name) ? 1 : -1)
        //     })
        //     .catch(error => { console.log('error', error)
        //    })
        //   }
        // }

        for (const key in resData) {
          if (resData.hasOwnProperty(key)){
              this.brands.push({key, name: resData[key].name, icon: resData[key].icon })
              this.brands.sort((a, b) => (a.name > b.name) ? 1 : -1)
          }
            
        }
        
    });
     

    this.searchedItem = this.brands;

  }

  onClick(x) {
    this.router.navigateByUrl('tabs/tab1/model/' + x);
  }

  _ionChange(event) {
    const val = event.target.value;

    this.searchedItem = this.brands;

    if (val && val.trim() != '') {
      this.searchedItem = this.searchedItem.filter((item: any) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }


  addbutton() {

    this.router.navigateByUrl('additems');
  }

  refreshImagesButton(){

    
    this.brands.forEach(brand => {

      // if (brand.name == 'PORSCHE'){
      //     this.http.put(`https://tapsystock-a6450-default-rtdb.firebaseio.com/car-brand/${brand.key}.json`,
      //   {...brand, key: null}).subscribe(
      //     resData => {
      //   console.log(resData);
      //   }
      // );
      // }

      this.http.put(`https://tapsystock-a6450-default-rtdb.firebaseio.com/car-brand/${brand.key}.json`,
        {...brand, key: null}).subscribe(
          resData => {
        console.log(resData);
        }
    );
      
    });

  }

}
