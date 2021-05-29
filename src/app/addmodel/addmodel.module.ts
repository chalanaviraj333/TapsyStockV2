import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddmodelPageRoutingModule } from './addmodel-routing.module';

import { AddmodelPage } from './addmodel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddmodelPageRoutingModule
  ],
  declarations: [AddmodelPage]
})
export class AddmodelPageModule {}
