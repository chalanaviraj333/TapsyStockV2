import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddcarbrandPageRoutingModule } from './addcarbrand-routing.module';

import { AddcarbrandPage } from './addcarbrand.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddcarbrandPageRoutingModule
  ],
  declarations: [AddcarbrandPage]
})
export class AddcarbrandPageModule {}
