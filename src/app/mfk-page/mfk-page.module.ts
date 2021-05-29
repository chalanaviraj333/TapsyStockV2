import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MfkPagePageRoutingModule } from './mfk-page-routing.module';

import { MfkPagePage } from './mfk-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MfkPagePageRoutingModule
  ],
  declarations: [MfkPagePage]
})
export class MfkPagePageModule {}
