import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddprogrammingdetailsPageRoutingModule } from './addprogrammingdetails-routing.module';

import { AddprogrammingdetailsPage } from './addprogrammingdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddprogrammingdetailsPageRoutingModule
  ],
  declarations: [AddprogrammingdetailsPage]
})
export class AddprogrammingdetailsPageModule {}
