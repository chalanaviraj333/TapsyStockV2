import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import firebase from 'firebase/app';
import 'firebase/storage';

interface RemoteShell {
  key: string;
  tapsycode: string;
  boxnumber: number;
  remotetype: string;
  compitablebrands: Array<string>;
  image: string;
  blade: string;
  buttons: string
  notes: string;
  inStock: boolean;
}


interface LowStockItem {
  key: string;
  tapsycode: string;
  boxnumber: number;
  image: string;
  remotetype: string;

}

@Component({
  selector: 'app-remoteshell-page',
  templateUrl: './remoteshell-page.page.html',
  styleUrls: ['./remoteshell-page.page.scss'],
})
export class RemoteshellPagePage implements OnInit {

  @ViewChild('search', { static: false }) search: IonSearchbar;

  public keyShells: Array<RemoteShell> = [];
  private searchedItem: Array<RemoteShell> = [];
  private lowStockItems: Array<LowStockItem> = [];



  constructor(private http: HttpClient) {

  }


  ngOnInit() {

    this.http.get<{ [key: string]: RemoteShell }>('https://tapsystock-a6450-default-rtdb.firebaseio.com/remote-shells.json')
      .subscribe(resData => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {

            this.keyShells.push({
              key,
              tapsycode: resData[key].tapsycode, boxnumber: resData[key].boxnumber,
              remotetype: resData[key].remotetype, compitablebrands: resData[key].compitablebrands, image: resData[key].image, blade: resData[key].blade,
              buttons: resData[key].buttons, notes: resData[key].notes, inStock: resData[key].inStock
            })
            this.keyShells.sort((a, b) => (a.boxnumber > b.boxnumber) ? 1 : -1)



            // const iconname = (resData[key].image);
            // firebase.storage().ref().child('images/keyshells/' + iconname).getDownloadURL()
            //   .then(response => {
            //     this.keyShells.push({
            //       key,
            //       tapsycode: resData[key].tapsycode, boxnumber: resData[key].boxnumber,
            //       remotetype: resData[key].remotetype, compitablebrands: resData[key].compitablebrands, image: response, blade: resData[key].blade,
            //       buttons: resData[key].buttons, notes: resData[key].notes, inStock: resData[key].inStock
            //     })
            //     this.keyShells.sort((a, b) => (a.boxnumber > b.boxnumber) ? 1 : -1)
            //   })
            //   .catch(error => { console.log('error', error) })
          }
        }

      });

    this.searchedItem = this.keyShells;


  }


  _gettingLowStock() {
    this.http.get<{ [key: string]: LowStockItem }>('https://tapsystock-a6450-default-rtdb.firebaseio.com/lowstockremotes.json')
      .subscribe(resData => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            this.lowStockItems.push({
              key,

              tapsycode: resData[key].tapsycode, boxnumber: resData[key].boxnumber, image: resData[key].image,
              remotetype: resData[key].remotetype
            })
            this.lowStockItems.sort((a, b) => (a.boxnumber > b.boxnumber) ? 1 : -1)
          }

        }


      });
  }




  _ionChange(event) {
    const val = event.target.value;

    this.searchedItem = this.keyShells;

    if (val && val.trim() != '') {
      this.searchedItem = this.searchedItem.filter((currentKeyShell) => {
        if (currentKeyShell.compitablebrands !== undefined) {
          let searchWord = currentKeyShell.tapsycode + currentKeyShell.blade + currentKeyShell.compitablebrands.toString();
          return (searchWord.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
        else {
          let searchWord = currentKeyShell.tapsycode + currentKeyShell.blade;
          return (searchWord.toLowerCase().indexOf(val.toLowerCase()) > -1);

        }

      })
    }
  }

  _lowStock(selectedRemoteShell, x) {

    const shellkey = x;
    this.searchedItem[selectedRemoteShell].inStock = false;
    this.http.post('https://tapsystock-a6450-default-rtdb.firebaseio.com/lowstockremotes.json', this.searchedItem[selectedRemoteShell]).subscribe(
      resData => {
        // console.log(resData);
      }
    );

    return this.http.put(`https://tapsystock-a6450-default-rtdb.firebaseio.com/remote-shells/${shellkey}.json`,
      { ...this.searchedItem[selectedRemoteShell], inStock: false, key: null }).subscribe(
        resData => {
          // console.log(resData);
        }
      );

  }

  _deleteRemoteShell(deleteRemoteShell , x){

    this.http.post('https://tapsystock-a6450-default-rtdb.firebaseio.com/delete-remote-shells.json', this.searchedItem[deleteRemoteShell]).subscribe(
      resData => {
        console.log(resData);
      }
    );

    this.http.delete(`https://tapsystock-a6450-default-rtdb.firebaseio.com/remote-shells/${x}.json`).subscribe
    (resData => {
      this.searchedItem.splice(x, 1);

      
    })
  }


  refreshImagesButton() {

    this.keyShells.forEach(keyshell => {

      this.http.put(`https://tapsystock-a6450-default-rtdb.firebaseio.com/remote-shells/${keyshell.key}.json`,
        { ...keyshell, key: null }).subscribe(
          resData => {
            console.log(resData);
          }
        );

    });

  }
}
