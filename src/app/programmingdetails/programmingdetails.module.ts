import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgrammingdetailsPageRoutingModule } from './programmingdetails-routing.module';

import { ProgrammingdetailsPage } from './programmingdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgrammingdetailsPageRoutingModule
  ],
  declarations: [ProgrammingdetailsPage]
})
export class ProgrammingdetailsPageModule {}
