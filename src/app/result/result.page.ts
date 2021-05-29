import { Component, OnInit } from '@angular/core';
import { NavparamService } from '../navparam.service';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';


import { ActivatedRoute, Router } from '@angular/router';

interface Remote {
  tapsycode: string;
  boxnumber: number;
  inbuildchip: string;
  inbuildblade: string;
  remotetype: string;
  compitablebrands: Array<string>;
  image: string;
  notes: string;
  compitablecars: Array<Object>;
}

interface SelectedCar {
  carbrand?: string;
  model?: string;
  selectedyear?: number;
  blade?: string;
  carID?: string;
  image?: string;
}

interface Car {
  brand: string;
  model: string;
  icon: string;

}

// interface ProgrammingDetails {
//   brand: string;
//   model: string;
//   years: Array<number>;
//   blade: string;
//   chip: string;
//   smartProYes: number;
//   smartProNo: number;
//   autelYes: number;
//   autelNo: number;
//   xtoolYes: number;
//   xtoolNo: number;
//   obdStarYes: number;
//   obdStarNo: number;
//   kdRemotesYes: number;
//   kdRemotesNo: number;
//   xHorseYes: number;
//   xHorseNo: number;
//   notes: Array<string>;
// }

// interface ModelPrices {
//   key: string;
//   brand: string;
//   model: string;
//   icon: string;
//   modelyears: number[];
//   selectedyears: number[];
//   programmingMethod: string;
//   accessMethod: string;
//   allLostRemoteLocation: number;
//   allLostRemoteShop: number;
//   allLostMFKLocation: number;
//   allLostMFKShop: number;
//   spareRemoteLocation: number;
//   spareRemoteShop: number;
//   spareMFKLocation: number;
//   spareMFKShop: number;
//   ignitionRepairLocation: number;
//   ignitionRepairShop: number;
//   keyShellLocation: number;
//   keyShellShop: number;
//   gainingAccessLocation: number;
//   gainingAccessShop: number;
//   allLockChangeLocation: number;
//   allLockChangeShop: number;

// }


@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})


export class ResultPage implements OnInit {

  public startyear: string;
  public endyear: string;

  public selectedCarDetails: SelectedCar = {};

  printerror = 'LOADING';
  iconerror = 'happy-outline';
  isFetching = true;
  public compitableremotes: Array<Remote> = [];


  // public choosecar: any;
  
  // public programmingDetails: ProgrammingDetails = { brand: 'N/A', model: 'N/A', years: [], blade: 'N/A', chip: 'N/A', smartProYes: 0, smartProNo: 0, autelYes: 0, autelNo: 0, xtoolYes: 0, xtoolNo: 0, obdStarYes: 0, obdStarNo: 0, kdRemotesYes: 0, kdRemotesNo: 0, xHorseYes: 0, xHorseNo: 0, notes: [] };
  // public modelPrices: ModelPrices = { key: null,
  //   brand: null, model: null, icon: null, modelyears: null, selectedyears: null, programmingMethod: 'N/A', accessMethod: 'N/A', allLostRemoteLocation: 0, allLostRemoteShop: 0, allLostMFKLocation: 0, allLostMFKShop: 0, spareRemoteLocation: 0, spareRemoteShop: 0, spareMFKLocation: 0, spareMFKShop: 0, ignitionRepairLocation: 0, ignitionRepairShop: 0, keyShellLocation: 0, keyShellShop: 0, gainingAccessLocation: 0, gainingAccessShop: 0, allLockChangeLocation: 0, allLockChangeShop: 0 };
  // public firebaseKey: string;
  // public foundFromDatabase = false;
  

  // chipmfkmachine = {};
  // remotealerticon = "remove.png";

  constructor( private http: HttpClient,private router: Router,
    private activatedRoute: ActivatedRoute) {

      this.activatedRoute.paramMap.subscribe(paramMap => {
        if (!paramMap.has('selectedBrand' && 'selectedModel' && 'selectedYear')) {
          // redirect
          return;
        }
        this.selectedCarDetails.model = paramMap.get('selectedModel');
        this.selectedCarDetails.selectedyear = Number(paramMap.get('selectedYear'));
        this.selectedCarDetails.carbrand = paramMap.get('selectedBrand');

        this.startyear = paramMap.get('startyear');
        this.endyear = paramMap.get('endyear');


      });
      

    }


    // this.choosecar = this.navParamService.getNavData();

    // getting results of compatible remotes from database

    ngOnInit() {

      this.http.get<{ [key: string]: Car }>('https://tapsystock-a6450-default-rtdb.firebaseio.com/car-model.json')
      .subscribe(resData => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            if (resData[key].brand == this.selectedCarDetails.carbrand && resData[key].model == this.selectedCarDetails.model) {
                  this.selectedCarDetails.image = resData[key].icon;
            }
          }
        }
      });

      this.http.get<{ [key: string]: Remote }>('https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes.json')
      .subscribe(resData => {

        for (const key in resData) {

          let compatiblecars: any = resData[key].compitablecars;

          if (compatiblecars !== undefined && compatiblecars.find(i => i.brand === this.selectedCarDetails.carbrand && i.model === this.selectedCarDetails.model && (this.selectedCarDetails.selectedyear >= i.startyear && this.selectedCarDetails.selectedyear <= i.endyear))) {
    
                this.compitableremotes.push({
                  tapsycode: resData[key].tapsycode, boxnumber: resData[key].boxnumber, inbuildchip: resData[key].inbuildchip,
                  inbuildblade: resData[key].inbuildblade, remotetype: resData[key].remotetype, compitablebrands: resData[key].compitablebrands, image: resData[key].image, notes: resData[key].notes,
                  compitablecars: resData[key].compitablecars
                })
                this.compitableremotes.sort((a, b) => (a.boxnumber > b.boxnumber) ? 1 : -1)
                this.isFetching = false;
        
          }
        }

        if (this.compitableremotes.length == 0){
          this.printerror = 'No Remotes Found';
          this.iconerror = 'sad-outline';
        }

      });

    }

    

    // getting results of car programming details from database
  //   this.http.get<{ [key: string]: ProgrammingDetails }>('https://tapsystock-a6450-default-rtdb.firebaseio.com/programming-details.json')
  //     .subscribe(resData => {


  //       for (const key in resData) {

  //         if (this.choosecar.brand == resData[key].brand && this.choosecar.model == resData[key].model && resData[key].years.find(i => i === this.choosecar.year)) {
  //           this.programmingDetails = resData[key];
  //           this.foundFromDatabase = true;

  //           this.firebaseKey = key;
  //         }
  //         else {

  //         }
  //       }

  //       if (this.foundFromDatabase == false) {
  //         this.programmingDetails.brand = this.choosecar.brand;
  //         this.programmingDetails.model = this.choosecar.model;
  //         this.programmingDetails.years = [this.choosecar.year];
  //         this.programmingDetails.blade = 'N/A';
  //         this.programmingDetails.chip = 'N/A';
  //         this.programmingDetails.smartProYes = 0;
  //         this.programmingDetails.smartProNo = 0;
  //         this.programmingDetails.autelYes = 0;
  //         this.programmingDetails.autelNo = 0;
  //         this.programmingDetails.xtoolYes = 0;
  //         this.programmingDetails.xtoolNo = 0;
  //         this.programmingDetails.obdStarYes = 0;
  //         this.programmingDetails.obdStarNo = 0;
  //         this.programmingDetails.kdRemotesYes = 0;
  //         this.programmingDetails.kdRemotesNo = 0;
  //         this.programmingDetails.xHorseYes = 0;
  //         this.programmingDetails.xHorseNo = 0;
  //         this.programmingDetails.notes = [];

  //       }

  //     });


  //     // getting car model prices from the database
  //   this.http.get<{ [key: string]: ModelPrices }>('https://tapsystock-a6450-default-rtdb.firebaseio.com/car-model-prices.json')
  //   .subscribe(resData => {
  //     for (const key in resData) {

  //       if (resData.hasOwnProperty(key)) {
  //         if (this.choosecar.brand == resData[key].brand && this.choosecar.model == resData[key].model && resData[key].modelyears.find(i => i === this.choosecar.year)) 
  //         {
  //           this.modelPrices.programmingMethod = resData[key].programmingMethod,
  //           this.modelPrices.accessMethod = resData[key].accessMethod,
  //           this.modelPrices.allLostRemoteLocation = resData[key].allLostRemoteLocation,
  //           this.modelPrices.allLostRemoteShop =resData[key].allLostRemoteShop,
  //           this.modelPrices.allLostMFKLocation = resData[key].allLostMFKLocation,
  //           this.modelPrices.allLostMFKShop =resData[key].allLostMFKShop,
  //           this.modelPrices.spareRemoteLocation = resData[key].spareRemoteLocation,
  //           this.modelPrices.spareRemoteShop = resData[key].spareRemoteShop,
  //           this.modelPrices.spareMFKLocation = resData[key].spareMFKLocation,
  //           this.modelPrices.spareMFKShop = resData[key].spareMFKShop,
  //           this.modelPrices.ignitionRepairLocation = resData[key].ignitionRepairLocation,
  //           this.modelPrices.ignitionRepairShop =resData[key].ignitionRepairShop,
  //           this.modelPrices.keyShellLocation = resData[key].keyShellLocation, 
  //           this.modelPrices.keyShellShop = resData[key].keyShellShop,
  //           this.modelPrices.gainingAccessLocation = resData[key].gainingAccessLocation,
  //           this.modelPrices.gainingAccessShop = resData[key].gainingAccessShop,
  //           this.modelPrices.allLockChangeLocation = resData[key].allLockChangeLocation,
  //           this.modelPrices.allLockChangeShop = resData[key].allLockChangeShop
            
  //         }

  //         else {
  
  //         }

  //       }
  //     }


  //   });

  // }

  // updateProgrammingDetails() {

  //   if (this.foundFromDatabase == true) {
  //     return this.http.put(`https://tapsystock-a6450-default-rtdb.firebaseio.com/programming-details/${this.firebaseKey}.json`, this.programmingDetails).subscribe(
  //       resData => {
          
  //       }
  //     );

  //   }
  //   else {
  //     return this.http.post('https://tapsystock-a6450-default-rtdb.firebaseio.com/programming-details.json', this.programmingDetails).subscribe(
  //       resData => {
          
  //       }
  //     );
  //   }
  // }

  // async _smartProYes() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Success',
  //     message: 'Smart Pro worked for this Car?',
  //     buttons: [
  //       {
  //         text: 'Yes',
  //         handler: () => {
  //           this.programmingDetails.smartProYes++;
  //           this.updateProgrammingDetails();
  //         }
  //       },
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'alertBoxCancel'
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // async _smartProNo() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Failed',
  //     message: 'Smart Pro not worked for this Car?',
  //     buttons: [
  //       {
  //         text: 'Yes',
  //         handler: () => {
  //           this.programmingDetails.smartProNo++;
  //           this.updateProgrammingDetails();
  //         }
  //       },
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'alertBoxCancel'
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // async _autelYes() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Success',
  //     message: 'Autel worked for this Car?',
  //     buttons: [
  //       {
  //         text: 'Yes',
  //         handler: () => {
  //           this.programmingDetails.autelYes++;
  //           this.updateProgrammingDetails();
  //         }
  //       },
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'alertBoxCancel'
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // async _autelNo() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Failed',
  //     message: 'Autel not worked for this Car?',
  //     buttons: [
  //       {
  //         text: 'Yes',
  //         handler: () => {
  //           this.programmingDetails.autelNo++;
  //           this.updateProgrammingDetails();
  //         }
  //       },
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'alertBoxCancel'
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // async _xtoolYes() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Success',
  //     message: 'Xtool worked for this Car?',
  //     buttons: [
  //       {
  //         text: 'Yes',
  //         handler: () => {
  //           this.programmingDetails.xtoolYes++;
  //           this.updateProgrammingDetails();
  //         }
  //       },
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'alertBoxCancel'
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }


  // async _xtoolNo() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Failed',
  //     message: 'Xtool not worked for this Car?',
  //     buttons: [
  //       {
  //         text: 'Yes',
  //         handler: () => {
  //           this.programmingDetails.xtoolNo++;
  //           this.updateProgrammingDetails();
  //         }
  //       },
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'alertBoxCancel'
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // async _obdStarYes() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Success',
  //     message: 'OBD Star worked for this Car?',
  //     buttons: [
  //       {
  //         text: 'Yes',
  //         handler: () => {
  //           this.programmingDetails.obdStarYes++;
  //           this.updateProgrammingDetails();
  //         }
  //       },
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'alertBoxCancel'
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // async _obdStarNo() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Failed',
  //     message: 'OBD Star not worked for this Car?',
  //     buttons: [
  //       {
  //         text: 'Yes',
  //         handler: () => {
  //           this.programmingDetails.obdStarNo++;
  //           this.updateProgrammingDetails();
  //         }
  //       },
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'alertBoxCancel'
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // async _kdRemotesYes() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Success',
  //     message: 'KD Remotes worked for this Car?',
  //     buttons: [
  //       {
  //         text: 'Yes',
  //         handler: () => {
  //           this.programmingDetails.kdRemotesYes++;
  //           this.updateProgrammingDetails();
  //         }
  //       },
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'alertBoxCancel'
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // async _kdRemotesNo() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Failed',
  //     message: 'KD Remotes not worked for this Car?',
  //     buttons: [
  //       {
  //         text: 'Yes',
  //         handler: () => {
  //           this.programmingDetails.kdRemotesNo++;
  //           this.updateProgrammingDetails();
  //         }
  //       },
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'alertBoxCancel'
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // async _xHorseYes() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Success',
  //     message: 'XHorse Remotes worked for this Car?',
  //     buttons: [
  //       {
  //         text: 'Yes',
  //         handler: () => {
  //           this.programmingDetails.xHorseYes++;
  //           this.updateProgrammingDetails();
  //         }
  //       },
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'alertBoxCancel'
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // async _xHorseNo() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Failed',
  //     message: 'XHorse Remotes not worked for this Car?',
  //     buttons: [
  //       {
  //         text: 'Yes',
  //         handler: () => {
  //           this.programmingDetails.xHorseNo++;
  //           this.updateProgrammingDetails();
  //         }
  //       },
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'alertBoxCancel'
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }


  // _carNotes() {
  //   this.navParamService.setNavData(this.choosecar);
  //   this.router.navigateByUrl('carnotes');
  // }

  

}
