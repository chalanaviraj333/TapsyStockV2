import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdditemsPageRoutingModule } from './additems-routing.module';

import { AdditemsPage } from './additems.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdditemsPageRoutingModule
  ],
  declarations: [AdditemsPage]
})
export class AdditemsPageModule {}
