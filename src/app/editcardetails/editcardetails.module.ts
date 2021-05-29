import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditcardetailsPageRoutingModule } from './editcardetails-routing.module';

import { EditcardetailsPage } from './editcardetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditcardetailsPageRoutingModule
  ],
  declarations: [EditcardetailsPage]
})
export class EditcardetailsPageModule {}
