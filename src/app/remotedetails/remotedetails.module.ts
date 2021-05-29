import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemotedetailsPageRoutingModule } from './remotedetails-routing.module';

import { RemotedetailsPage } from './remotedetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemotedetailsPageRoutingModule
  ],
  declarations: [RemotedetailsPage]
})
export class RemotedetailsPageModule {}
