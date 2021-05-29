import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LowstockPagePageRoutingModule } from './lowstock-page-routing.module';

import { LowstockPagePage } from './lowstock-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LowstockPagePageRoutingModule
  ],
  declarations: [LowstockPagePage]
})
export class LowstockPagePageModule {}
