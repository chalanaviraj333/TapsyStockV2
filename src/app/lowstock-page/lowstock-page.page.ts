import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


interface Remote {
  key: string;
  tapsycode: string;
  boxnumber: number;
  image: string;
  remotetype: string;
  
}

interface RemoteShell {
  key:string;
  tapsycode:string;
  boxnumber: number;
  remotetype: string;
  compitablebrands: Array<string>;
  image: string;
  blade: string;
  buttons: string
  notes: string;
  inStock: boolean;
}


@Component({
  selector: 'app-lowstock-page',
  templateUrl: './lowstock-page.page.html',
  styleUrls: ['./lowstock-page.page.scss'],
})


export class LowstockPagePage implements OnInit {

  public remotes: Array<Remote> = [];
  private keyShells: Array<RemoteShell> = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.http.get<{ [key: string]: Remote }>('https://tapsystock-a6450-default-rtdb.firebaseio.com/lowstockremotes.json')
      .subscribe(resData => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)){
            this.remotes.push({ key,

              tapsycode: resData[key].tapsycode, boxnumber: resData[key].boxnumber, image: resData[key].image,
              remotetype: resData[key].remotetype
            })
            this.remotes.sort((a, b) => (a.boxnumber > b.boxnumber) ? 1 : -1)
          }
              
        }

      });

      this.http.get<{ [key: string]: RemoteShell }>('https://tapsystock-a6450-default-rtdb.firebaseio.com/remote-shells.json')
      .subscribe(resData => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)){
              this.keyShells.push({ key,
                tapsycode: resData[key].tapsycode, boxnumber: resData[key].boxnumber,
                remotetype: resData[key].remotetype, compitablebrands: resData[key].compitablebrands, image: resData[key].image, blade: resData[key].blade,
                buttons: resData[key].buttons, notes: resData[key].notes, inStock: resData[key].inStock
              })
            }
          }
        })
  }

  _stockadded(remoteIndex, remotekey){

    this.keyShells.forEach(keyShell => {
      if (keyShell.tapsycode == this.remotes[remoteIndex].tapsycode)
      {
        
        const updateitemKey = keyShell.key;
        const updateitemIndex = this.keyShells.indexOf(keyShell);


        this.http.put(`https://tapsystock-a6450-default-rtdb.firebaseio.com/remote-shells/${updateitemKey}.json`,
        {...this.keyShells[updateitemIndex], inStock: true, key: null}).subscribe(
          resData => {
      
        }
    );
        
      }
      
    });
    
    this.remotes.splice(remoteIndex, 1);
    this.http.delete(`https://tapsystock-a6450-default-rtdb.firebaseio.com/lowstockremotes/${remotekey}.json`).subscribe
    (resData => {

      
    })

  }

}
