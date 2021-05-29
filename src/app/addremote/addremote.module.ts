import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddremotePageRoutingModule } from './addremote-routing.module';

import { AddremotePage } from './addremote.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddremotePageRoutingModule
  ],
  declarations: [AddremotePage]
})
export class AddremotePageModule {}
