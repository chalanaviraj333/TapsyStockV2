import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarnotesPageRoutingModule } from './carnotes-routing.module';

import { CarnotesPage } from './carnotes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarnotesPageRoutingModule
  ],
  declarations: [CarnotesPage]
})
export class CarnotesPageModule {}
