import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditcarmodelPageRoutingModule } from './editcarmodel-routing.module';

import { EditcarmodelPage } from './editcarmodel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditcarmodelPageRoutingModule
  ],
  declarations: [EditcarmodelPage]
})
export class EditcarmodelPageModule {}
