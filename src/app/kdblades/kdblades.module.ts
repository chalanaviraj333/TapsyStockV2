import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KdbladesPageRoutingModule } from './kdblades-routing.module';

import { KdbladesPage } from './kdblades.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KdbladesPageRoutingModule
  ],
  declarations: [KdbladesPage]
})
export class KdbladesPageModule {}
