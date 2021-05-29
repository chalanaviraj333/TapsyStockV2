import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';
import { NavparamService } from '../navparam.service';


// interface Remote {
//   key: string;
//   tapsycode: string;
//   boxnumber: number;
//   inbuildchip: string;
//   inbuildblade: string;
//   remotetype: string;
//   compitablebrands: Array<string>;
//   image: string;
//   notes: string;
//   compitablecars: Array<Object>;
// }


interface Remote {
    key?: string;
    tapsycode?: string;
    boxnumber?: number;
    inbuildchip?: string;
    inbuildblade?: string;
    frequency?: string;
    remotetype?: string;
    image?: string;
    remoteinStock?: boolean;
    compitablecars?: Array<Object>;
    compitablebrands: Array<string>;
}


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild('search', { static: false }) search: IonSearchbar;

  private remotes: Array<Remote> = [];
  public searchedItem: Array<Remote> = [];

  constructor(private navParamService: NavparamService, private router: Router, private http: HttpClient) {

  }

  ngOnInit() {

    this.http.get<{ [key: string]: Remote }>('https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes.json')
      .subscribe(resData => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
                this.remotes.push({ key,
                  tapsycode: resData[key].tapsycode, boxnumber: resData[key].boxnumber, inbuildchip: resData[key].inbuildchip,
                  inbuildblade: resData[key].inbuildblade, frequency:resData[key].frequency, remotetype: resData[key].remotetype, remoteinStock: resData[key].remoteinStock, compitablebrands: resData[key].compitablebrands, image: resData[key].image,
                  compitablecars: resData[key].compitablecars
                })
                this.remotes.sort((a, b) => (a.boxnumber > b.boxnumber) ? 1 : -1)
          }
        }

      });

    this.searchedItem = this.remotes;
  }

  _ionChange(event) {
    const val = event.target.value;

    this.searchedItem = this.remotes;

    if (val && val.trim() != '') {
      this.searchedItem = this.searchedItem.filter((currentremote) => {
        if (currentremote.compitablebrands !== undefined) {
          let searchWord = currentremote.tapsycode + currentremote.inbuildblade + currentremote.compitablebrands.toString();
          return (searchWord.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
        else {
          let searchWord = currentremote.tapsycode + currentremote.inbuildblade;
          return (searchWord.toLowerCase().indexOf(val.toLowerCase()) > -1);

        }

      })
    }
  }

  onClick(x) {

    // let selectedremote: object;

    // for (let remote of this.remotes) {
    //   if (remote.tapsycode == x) {

    //     selectedremote = remote;
    //   }
    // }


    // this.navParamService.setNavData(selectedremote);
    // this.router.navigateByUrl('remotedetails');

    const selectedremote = x;

    this.router.navigateByUrl('tabs/tab2/remotedetails/' + selectedremote );

  }

  refreshImagesButton(){

    this.remotes.forEach(remote => {

      this.http.put(`https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes/${remote.key}.json`,
        {...remote, key: null}).subscribe(
          resData => {
        console.log(resData);
        }
    );
      
    });

  }

}

