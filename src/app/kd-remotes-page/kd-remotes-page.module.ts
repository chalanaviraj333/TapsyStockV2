import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KdRemotesPagePageRoutingModule } from './kd-remotes-page-routing.module';

import { KdRemotesPagePage } from './kd-remotes-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KdRemotesPagePageRoutingModule
  ],
  declarations: [KdRemotesPagePage]
})
export class KdRemotesPagePageModule {}
