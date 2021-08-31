import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonSearchbar } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Carbrand } from '../carbrand';
import { MainModalViewServiceService } from '../main-modal-view-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild('search', { static: false }) search: IonSearchbar;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  public brands: Array<Carbrand> = [];
  public searchedItem: any;
  public hideButton: boolean = false;

  constructor(
    private router: Router, private http: HttpClient, private mainModalControlService: MainModalViewServiceService
  ) {

  }

  ngOnInit() {

    // till here
    this.http.get<{ [key: string]: Carbrand }>('https://tapsystock-a6450-default-rtdb.firebaseio.com/car-brand.json')
      .subscribe(resData => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)){
              this.brands.push({key, name: resData[key].name, icon: resData[key].icon })
              this.brands.sort((a, b) => (a.name > b.name) ? 1 : -1)
          }
            
        }
        
    });
     

    this.searchedItem = this.brands;
  }

  onClick(selectedcarbrand) {
    this.router.navigateByUrl('tabs/tab1/model/' + selectedcarbrand);
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


  logScrollStart() {
    setTimeout(() => {
      this.hideButton = true;
    }, 500);
  }

  ScrollToTop(){
    this.content.scrollToTop(1500);
    setTimeout(() => {
      this.hideButton = false;
    }, 4000);
    
  }

  onClickViewBrandProducts(selectedbrand: string) {
    this.mainModalControlService.onClickViewBrandProducts(selectedbrand);
  }

}
