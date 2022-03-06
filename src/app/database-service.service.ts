import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ModalController, ToastController } from "@ionic/angular";
import { CarNote } from "./car-note";
import { NavparamService } from "./navparam.service";
import { SelectedCar } from "./selected-car";
import { Storage } from '@capacitor/storage';
import { Remote } from "./remote";
import { Carmodel } from "./carmodel";
import { RemoteShell } from "./remote-shell";

export interface selectedData {
  selectedCategory: string;
  selectedFrequncy: string;
  selectedChip: string;
  selectedBlade: string;
}


@Injectable({
  providedIn: "root",
})
export class DatabaseServiceService {
  public carNotesforCar: Array<CarNote> = [];

  public allremotes: Array<Remote> = [];
  public searchedCarModels: Array<Carmodel> = [];
  private brandedProducts: Array<any> = [];
  public filteredBrandProducts: Array<any> = [];
  public frequcnyList: Array<string> = [];
  public chipList: Array<string> = [];
  public bladeList: Array<string> = [];
  
  public selectedData: selectedData = {
    selectedCategory: '',
    selectedFrequncy: '',
    selectedBlade: '',
    selectedChip: ''
  }


  constructor(
    private http: HttpClient,
    public toastController: ToastController,
    private navParamService: NavparamService,
    private modalController: ModalController
  ) { }

  getBrandedProducts(selectedBrand: string) {
    this.brandedProducts = [];
    this.filteredBrandProducts = [];
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
            if (resData[key].compitablebrands !== undefined && resData[key].compitablebrands.find((i) => i === selectedBrand)){
              this.brandedProducts.push({
                key,
                tapsycode: resData[key].tapsycode,
                boxnumber: resData[key].boxnumber,
                shell: resData[key].shell,
                qtyavailable: resData[key].qtyavailable,
                inbuildchip: resData[key].inbuildchip,
                inbuildblade: resData[key].inbuildblade,
                battery: resData[key].battery,
                buttons: resData[key].buttons,
                costperitem: resData[key].costperitem,
                frequency: resData[key].frequency,
                remotetype: resData[key].remotetype,
                productType: resData[key].productType,
                image: resData[key].image,
                notes: resData[key].notes,
                compitablecars: resData[key].compitablecars,
                compitablebrands: resData[key].compitablebrands,
                cssClass: ''
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
        }

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
        

        let indexofProduct: number = 0;

        this.brandedProducts.forEach(product => {
         indexofProduct = indexofProduct + 1;
         if (indexofProduct % 2 == 0) {
          product.cssClass = "cssLeftClass";
         }
         else {
          product.cssClass = "cssRightClass";
         }

      });
      });

      this.http
      .get<{ [key: string]: RemoteShell }>(
        "https://tapsystock-a6450-default-rtdb.firebaseio.com/remote-shells.json"
      )
      .subscribe((resData) => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            if (resData[key].compitablebrands !== undefined && resData[key].compitablebrands.find((i) => i === selectedBrand)){
            this.brandedProducts.push({
              key,
              tapsycode: resData[key].tapsycode,
              boxnumber: resData[key].boxnumber,
              shell: resData[key].shell,
              remotetype: resData[key].remotetype,
              productType: resData[key].productType,
              qtyavailable: resData[key].qtyavailable,
              compitablebrands: resData[key].compitablebrands,
              image: resData[key].image,
              inbuildblade: resData[key].inbuildblade,
              buttons: resData[key].buttons,
              notes: resData[key].notes,
              cssClass: ''
            });

            if (resData[key].inbuildblade != null && resData[key].inbuildblade != '') {
              duplicatebladeArray.push(resData[key].inbuildblade);
            }
          }
        }
      }

      this.bladeList = duplicatebladeArray.filter(function (elem, index, self) {
        return index === self.indexOf(elem);
      });
      this.bladeList.sort((a, b) => (a > b ? 1 : -1));
      

      let indexofProduct: number = 0;

        this.brandedProducts.forEach(product => {
         indexofProduct = indexofProduct + 1;
         if (indexofProduct % 2 == 0) {
          product.cssClass = "cssLeftClass";
         }
         else {
          product.cssClass = "cssRightClass";
         }

      });
      });
      this.filteredBrandProducts = this.brandedProducts;
  }

  gettingcarnotesforselectedCar(selectedCar: SelectedCar) {
    this.carNotesforCar = [];

    this.http
      .get<{ [key: string]: CarNote }>(
        "https://tapsystock-a6450-default-rtdb.firebaseio.com/car-special-notes.json"
      )
      .subscribe((resData) => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            if (
              resData[key].brand == selectedCar.carbrand &&
              resData[key].model == selectedCar.model &&
              resData[key].selectedyear == selectedCar.selectedyear
            ) {
              this.carNotesforCar.push({
                userename: resData[key].userename,
                carnotesDescription: resData[key].carnotesDescription,
                date: new Date(resData[key].date)
              });
            }
          }
        }
      });
  }

  closebrandedProductsPage() {
    this.selectedData = {
      selectedCategory: '',
      selectedFrequncy: '',
      selectedBlade: '',
      selectedChip: ''
    }
    this.modalController.dismiss();

  }

  addtonotes(newNote: CarNote) {
    this.http
      .post(
        "https://tapsystock-a6450-default-rtdb.firebaseio.com/car-special-notes.json",
        { ...newNote, key: null }
      )
      .subscribe((resData) => {
        this.carNotesforCar.push(newNote);
        this.presentToastAddNote();
        this.navParamService.setCarNote(newNote.selectedyear);
      });
  }

  async presentToastAddNote() {
    const toast = await this.toastController.create({
      message: "Note Added Successfully.",
      duration: 2000,
      position: "top",
      color: "dark",
    });
    toast.present();
  }

  setUsername(username: string) {
    const data = JSON.stringify(username);
      Storage.set({
        key: 'username',
        value: data,
      });
  }

  addProductNote(updatedRemote: Remote) {
    if (updatedRemote.productType == 'remote'){
      this.http
        .put(
          `https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes/${updatedRemote.key}.json`,
          { ...updatedRemote, remoteKey: null }
        )
        .subscribe((resData) => {
          this.presentToastAddNote();
        });
    } else if (updatedRemote.productType == 'remoteshell') {
      this.http
        .put(
          `https://tapsystock-a6450-default-rtdb.firebaseio.com/remote-shells/${updatedRemote.key}.json`,
          { ...updatedRemote, remoteKey: null }
        )
        .subscribe((resData) => {
          this.presentToastAddNote();
        });
    }
    
  }


  filterProducts(selectedData: selectedData) {
    this.selectedData = selectedData;

    this.filteredBrandProducts = this.brandedProducts;

    if (this.selectedData.selectedCategory != '') {
      this.filteredBrandProducts = this.filteredBrandProducts.filter(product => product.productType === this.selectedData.selectedCategory);
    }
    if (this.selectedData.selectedFrequncy != '') {
      this.filteredBrandProducts = this.filteredBrandProducts.filter(product => product.frequency === this.selectedData.selectedFrequncy);
    }
    if (this.selectedData.selectedChip != '') {
      this.filteredBrandProducts = this.filteredBrandProducts.filter(product => product.inbuildchip === this.selectedData.selectedChip);
    }
    if (this.selectedData.selectedBlade != '') {
      this.filteredBrandProducts = this.filteredBrandProducts.filter(product => product.inbuildblade === this.selectedData.selectedBlade);
    }  

    let indexofProduct: number = 0;

    this.filteredBrandProducts.forEach(product => {
      indexofProduct = indexofProduct + 1;
      if (indexofProduct % 2 == 0) {
       product.cssClass = "cssLeftClass";
      }
      else {
       product.cssClass = "cssRightClass";
      }
    })
  }

}
