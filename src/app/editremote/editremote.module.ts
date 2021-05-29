import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditremotePageRoutingModule } from './editremote-routing.module';

import { EditremotePage } from './editremote.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditremotePageRoutingModule
  ],
  declarations: [EditremotePage]
})
export class EditremotePageModule {}
