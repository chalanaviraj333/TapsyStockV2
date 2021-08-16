import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddnotesPage } from './addnotes/addnotes.page';
import { FilterPage } from './filter/filter.page';
import { ProductsbybrandPage } from './productsbybrand/productsbybrand.page';
import { Remote } from './remote';
import { RemotedetailsmodalPage } from './remotedetailsmodal/remotedetailsmodal.page';
import { SelectedCar } from './selected-car';

@Injectable({
  providedIn: 'root'
})
export class ModalserviceService {

  constructor(public modalController: ModalController) { }

// add car notes model
  async onClickaddNotes(selectedCar: SelectedCar) {
      const modal = await this.modalController.create({
        component: AddnotesPage,
        componentProps: {
          "selectedCar": selectedCar
        },
        cssClass: 'my-add-notes-class',
        swipeToClose: true,
      });
      return await modal.present();
  }

  async onClickViewItem(selectedRemote: Remote) {
    const modal = await this.modalController.create({
      component: RemotedetailsmodalPage,
      componentProps: {
        "selectedRemote": selectedRemote
      },
      cssClass: 'view-Remote-Details-class',
      swipeToClose: true,
    });
    return await modal.present();
  }


  // on click view brand products tab 1
  async onClickViewBrandProducts(selectedbrand: string) {
    const modal = await this.modalController.create({
      component: ProductsbybrandPage,
      componentProps: {
        "selectedBrand": selectedbrand
      },
      cssClass: 'view-brand-products-class',
      swipeToClose: true,
    });
    return await modal.present();

  }

  async onClickFilter() {
    const modal = await this.modalController.create({
      component: FilterPage,
      cssClass: 'filtermodal-page-class',
      swipeToClose: true,
    });
    return await modal.present();

  }
}
