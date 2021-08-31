import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { selectedData } from './database-service.service';
import { Remote } from './remote';

@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceTabTwoService {

  private allRemotes: Array<Remote> = [];
  public filterRemotes: Array<Remote> = [];
  public frequcnyList: Array<string> = [];
  public chipList: Array<string> = [];
  public bladeList: Array<string> = [];

  public lowStockItems : Array<any> = [];

  public selectedData: selectedData = {
    selectedCategory: '',
    selectedFrequncy: '',
    selectedBlade: '',
    selectedChip: ''
  }

  constructor(private http: HttpClient) { }

  getAllRemotes() {

    this.allRemotes = [];
    this.filterRemotes = [];
    let duplicatefreqArray: Array<string> = [];
    let duplicatechipArray: Array<string> = [];
    let duplicatebladeArray: Array<string> = [];
    
    this.http
      .get<{ [key: string]: Remote }>(
        "https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes.json"
      )
    // this.http
    // .get<{ [key: string]: Remote }>(
    //   "https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes-clone-delete-later.json"
    // )
      .subscribe((resData) => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
              this.allRemotes.push({
                key,
                tapsycode: resData[key].tapsycode,
                boxnumber: Number(resData[key].boxnumber),
                inbuildchip: resData[key].inbuildchip,
                inbuildblade: resData[key].inbuildblade,
                battery: resData[key].battery,
                qtyavailable: Number(resData[key].qtyavailable),
                buttons: resData[key].buttons,
                costperitem: resData[key].costperitem,
                frequency: resData[key].frequency,
                remotetype: resData[key].remotetype,
                productType: resData[key].productType,
                image: resData[key].image,
                notes: resData[key].notes,
                remoteinStock: resData[key].remoteinStock,
                compitablecars: resData[key].compitablecars,
                compitablebrands: resData[key].compitablebrands
              });

              if (resData[key].frequency != null && resData[key].frequency != '') {
                duplicatefreqArray.push(resData[key].frequency);
              }

              if (resData[key].inbuildchip != null && resData[key].inbuildchip != '') {
                duplicatechipArray.push(resData[key].inbuildchip);
              }

              if (resData[key].inbuildblade != null && resData[key].inbuildblade != '') {
                duplicatebladeArray.push(resData[key].inbuildblade);
              }
          }
          
        }

        this.allRemotes.sort((a, b) => (a.boxnumber > b.boxnumber ? 1 : -1));

        // frequncy list
        this.frequcnyList = duplicatefreqArray.filter(function (elem, index, self) {
          return index === self.indexOf(elem);
        });
        this.frequcnyList.sort((a, b) => (a > b ? 1 : -1));
      
        // chip list
        this.chipList = duplicatechipArray.filter(function (elem, index, self) {
          return index === self.indexOf(elem);
        });
        this.chipList.sort((a, b) => (a > b ? 1 : -1));
        
        // blade array
        this.bladeList = duplicatebladeArray.filter(function (elem, index, self) {
          return index === self.indexOf(elem);
        });
        this.bladeList.sort((a, b) => (a > b ? 1 : -1));
        
      });

      
      this.filterRemotes = this.allRemotes;
  }

  filterProducts(selectedData: selectedData) {
    this.selectedData = selectedData;

    this.filterRemotes = this.allRemotes;

    if (this.selectedData.selectedCategory != '') {
      this.filterRemotes = this.filterRemotes.filter(product => product.productType === this.selectedData.selectedCategory);
    }
    if (this.selectedData.selectedFrequncy != '') {
      this.filterRemotes = this.filterRemotes.filter(product => product.frequency === this.selectedData.selectedFrequncy);
    }
    if (this.selectedData.selectedChip != '') {
      this.filterRemotes = this.filterRemotes.filter(product => product.inbuildchip === this.selectedData.selectedChip);
    }
    if (this.selectedData.selectedBlade != '') {
      this.filterRemotes = this.filterRemotes.filter(product => product.inbuildblade === this.selectedData.selectedBlade);
    }  
  }

  performSearch(entervalue: string) {
    this.filterRemotes = this.allRemotes;

    if (entervalue && entervalue.trim() != "") {
      this.filterRemotes = this.filterRemotes.filter((currentremote) => {
        if (currentremote.compitablebrands !== undefined) {
          let searchWord =
            currentremote.tapsycode +
            currentremote.compitablebrands.toString();
          return searchWord.toLowerCase().indexOf(entervalue.toLowerCase()) > -1;
        } else {
          let searchWord = currentremote.tapsycode;
          return searchWord.toLowerCase().indexOf(entervalue.toLowerCase()) > -1;
        }
      });
    }
  }

  uploadclonetoDatabase() {
    this.allRemotes.forEach(remote => {
      this.http.post('https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes.json', {...remote, remoteinStock: null, qtyavailable: 0, key: null}).subscribe(
      resData => {
          console.log(resData);
        }
    );
    });
  }

  deleteDuplicates() {
    this.allRemotes.forEach(remote => {
      if (remote.qtyavailable != 0) {
        this.http.delete(`https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes/${remote.key}.json`).subscribe
        (resData => {
          console.log(resData);

    })
      }
    });
  }

  // onCLickLowStockItems() {
  //   this.http
  //   .get<{ [key: string]: Remote }>(
  //     "https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes-clone-delete-later.json"
  //   )
  //     .subscribe((resData) => {
  //       for (const key in resData) {
  //         if (resData.hasOwnProperty(key)) {
  //           if (resData[key].qtyavailable < 5) {
  //             console.log(key);
              // this.lowStockItems.push({
              //   key,
              //   tapsycode: resData[key].tapsycode,
              //   boxnumber: resData[key].boxnumber,
              //   inbuildchip: resData[key].inbuildchip,
              //   inbuildblade: resData[key].inbuildblade,
              //   battery: resData[key].battery,
              //   qtyavailable: resData[key].qtyavailable,
              //   buttons: resData[key].buttons,
              //   costperitem: resData[key].costperitem,
              //   frequency: resData[key].frequency,
              //   remotetype: resData[key].remotetype,
              //   productType: resData[key].productType,
              //   image: resData[key].image,
              //   notes: resData[key].notes,
              //   remoteinStock: resData[key].remoteinStock,
              //   compitablecars: resData[key].compitablecars,
              //   compitablebrands: resData[key].compitablebrands
              // })
  //           }
              
  //         }
  //       }
  //     });
  // }
}