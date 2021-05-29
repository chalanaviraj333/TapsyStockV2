import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemoteCircuitsPagePageRoutingModule } from './remote-circuits-page-routing.module';

import { RemoteCircuitsPagePage } from './remote-circuits-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemoteCircuitsPagePageRoutingModule
  ],
  declarations: [RemoteCircuitsPagePage]
})
export class RemoteCircuitsPagePageModule {}
