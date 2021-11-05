import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { selectedData } from './database-service.service';
import { LowStockItem } from './low-stock-item';
import { OrderDetails } from './order-details';
import { Remote } from './remote';
import { RemoteOrder } from './remote-order';

@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceTabTwoService {

  private allRemotes: Array<Remote> = [];
  public filterRemotes: Array<Remote> = [];
  public frequcnyList: Array<string> = [];
  public chipList: Array<string> = [];
  public bladeList: Array<string> = [];
  public pastTwoMothOrders: Array<OrderDetails> = [];

  public lowStockItems : Array<LowStockItem> = [];

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
      .subscribe((resData) => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
              this.allRemotes.push({
                key,
                tapsycode: resData[key].tapsycode,
                boxnumber: Number(resData[key].boxnumber),
                shell: resData[key].shell,
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

    // getallordersform database 
    getTwoMonthOrders() {
      const currentYear: number = new Date().getFullYear();
      const pasttwoMonth: number = new Date().getMonth() - 1;

      this.http
        .get<{ [key: string]: OrderDetails }>(
          "https://tapsystock-a6450-default-rtdb.firebaseio.com/all-orders.json"
        )
        .subscribe((resData) => {
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              if (resData[key].year == currentYear && resData[key].month > pasttwoMonth )
              {
                this.pastTwoMothOrders.push({
                  key,
                  year: resData[key].year,
                  month: resData[key].month,
                  remoteList: resData[key].remoteList,
                  remoteshelllist: resData[key].remoteshelllist
                });
                console.log(this.pastTwoMothOrders);
              }
          }
        }
      });
  
    }

    findLowStockItems() {
      this.lowStockItems = [];
      
      const lowStockRemotes: Array<Remote> = [];
      const lowStockRemotesNotSold: Array<LowStockItem> = [];
      const lowStockRemotesSold: Array<LowStockItem> = [];

      const lastTwoMonthRemoteOrders: Array<RemoteOrder> = [];

      this.pastTwoMothOrders.forEach(monthOrder => {
        monthOrder.remoteList.forEach(remoteOrder => {
          const allreadyinArray: RemoteOrder = lastTwoMonthRemoteOrders.find((order) => order.tapsycode === remoteOrder.tapsycode);

          if (allreadyinArray == undefined) {
            lastTwoMonthRemoteOrders.push(remoteOrder);
          }
          else {
            const index = lastTwoMonthRemoteOrders.indexOf(allreadyinArray);
            lastTwoMonthRemoteOrders[index].quantity = lastTwoMonthRemoteOrders[index].quantity + remoteOrder.quantity;
          }
        });
      });

      this.allRemotes.forEach(remote => {
        if (remote.qtyavailable < 2){
          lowStockRemotes.push(remote);
        }
      });

      lowStockRemotes.forEach(remote => {
        const inOrderedList = lastTwoMonthRemoteOrders.find((orderRemote) => orderRemote.tapsycode === remote.tapsycode);

        if (inOrderedList == undefined) {
          lowStockRemotesNotSold.push({
            tapsycode: remote.tapsycode,
            image: remote.image,
            boxnumber: remote.boxnumber,
            shell: remote.shell,
            producttype: remote.productType,
            qtyavaliable: remote.qtyavailable,
            soldontwomonths: 0
          });
        }
        else {
          lowStockRemotesSold.push({
            tapsycode: remote.tapsycode,
            image: remote.image,
            boxnumber: remote.boxnumber,
            shell: remote.shell,
            producttype: remote.productType,
            qtyavaliable: remote.qtyavailable,
            soldontwomonths: inOrderedList.quantity
          })
        }
      });

      this.lowStockItems = lowStockRemotesNotSold;
      lowStockRemotesSold.forEach(remote => {
        this.lowStockItems.unshift(remote);
      });
    
    }

}
