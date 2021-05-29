import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Car {
  brand: string;
  model: string;
  startyear: number;
  endyear: number;
}

interface Remote {
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
}

@Component({
  selector: 'app-remotedetails',
  templateUrl: './remotedetails.page.html',
  styleUrls: ['./remotedetails.page.scss'],
})
export class RemotedetailsPage implements OnInit {

  public selectedremote: Remote = {};
  // lowstockYes = false;
  // lowstockButton = true;

  constructor( private http: HttpClient, private activatedRoute: ActivatedRoute) {

    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (
        !paramMap.has(
          "selectedRemote"
        )
      ) {
        // redirect
        return;
      }
      this.selectedremote.tapsycode = paramMap.get("selectedRemote");
    });

    

  }

  // _lowStock() {
  //   this.http.post('https://tapsystock-a6450-default-rtdb.firebaseio.com/lowstockremotes.json', this.selectedremote).subscribe(
  //       resData => {
  //         console.log(resData);
  //       }
  //     );

  //     this.lowstockYes = true;
  // }

  ngOnInit() {

    this.http.get<{ [key: string]: Remote }>('https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes.json')
      .subscribe(resData => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            if (resData[key].tapsycode == this.selectedremote.tapsycode) {
              this.selectedremote.boxnumber = resData[key].boxnumber,
              this.selectedremote.inbuildchip = resData[key].inbuildchip,
              this.selectedremote.inbuildblade = resData[key].inbuildblade,
              this.selectedremote.battery = resData[key].battery,
              this.selectedremote.buttons = resData[key].buttons,
              this.selectedremote.costperitem = resData[key].costperitem,
              this.selectedremote.frequency = resData[key].frequency,
              this.selectedremote.remotetype = resData[key].remotetype,
              this.selectedremote.image = resData[key].image,
              this.selectedremote.notes = resData[key].notes,
              this.selectedremote.remoteinStock = resData[key].remoteinStock,
              this.selectedremote.compitablecars = resData[key].compitablecars
            }
        }
      }

      });

    // this.http.get<{ [key: string]: Remote }>('https://tapsystock-a6450-default-rtdb.firebaseio.com/lowstockremotes.json')
    //   .subscribe(resData => {
    //     for (const key in resData) {
    //       if (resData[key].boxnumber == this.selectedremote.boxnumber)
    //       {
    //         this.lowstockYes = true;
    //       }
    //     }
        
    //   });


  }

}
