import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ModalController, ToastController } from "@ionic/angular";
import { CarNote } from "./car-note";
import { NavparamService } from "./navparam.service";
import { SelectedCar } from "./selected-car";
// import { Storage } from '@capacitor/storage';
import { Remote } from "./remote";
import { Carmodel } from "./carmodel";
import { RemoteShell } from "./remote-shell";


@Injectable({
  providedIn: "root",
})
export class DatabaseServiceService {
  public carNotesforCar: Array<CarNote> = [];

  public allremotes: Array<Remote> = [];
  public searchedCarModels: Array<Carmodel> = [];
  public brandedProducts: Array<any> = [];

  constructor(
    private http: HttpClient,
    public toastController: ToastController,
    private modalController: ModalController,
    private navParamService: NavparamService
  ) {}

  getBrandedProducts(selectedBrand: string) {
    this.brandedProducts = [];
    
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
                inbuildchip: resData[key].inbuildchip,
                inbuildblade: resData[key].inbuildblade,
                battery: resData[key].battery,
                buttons: resData[key].buttons,
                costperitem: resData[key].costperitem,
                frequency: resData[key].frequency,
                remotetype: resData[key].remotetype,
                image: resData[key].image,
                notes: resData[key].notes,
                remoteinStock: resData[key].remoteinStock,
                compitablecars: resData[key].compitablecars,
                compitablebrands: resData[key].compitablebrands,
                cssClass: ''
              });
            }
          }
        }

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
              remotetype: resData[key].remotetype,
              compitablebrands: resData[key].compitablebrands,
              image: resData[key].image,
              blade: resData[key].blade,
              buttons: resData[key].buttons,
              notes: resData[key].notes,
              inStock: resData[key].inStock,
              cssClass: ''
            });
          }
        }
      }

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

  addtonotes(newNote: CarNote) {
    this.http
      .post(
        "https://tapsystock-a6450-default-rtdb.firebaseio.com/car-special-notes.json",
        { ...newNote, key: null }
      )
      .subscribe((resData) => {
        this.carNotesforCar.push(newNote);
        this.modalController.dismiss();
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

  // setUsername(username: string) {
  //   const data = JSON.stringify(username);
  //     Storage.set({
  //       key: 'username',
  //       value: data,
  //     });
  // }

  addremoteNote(updatedRemote: Remote) {
    this.http
        .put(
          `https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes/${updatedRemote.key}.json`,
          { ...updatedRemote, remoteKey: null }
        )
        .subscribe((resData) => {
          this.presentToastAddNote();
        });
  }


}
