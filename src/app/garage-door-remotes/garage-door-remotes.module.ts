import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GarageDoorRemotesPageRoutingModule } from './garage-door-remotes-routing.module';

import { GarageDoorRemotesPage } from './garage-door-remotes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GarageDoorRemotesPageRoutingModule
  ],
  declarations: [GarageDoorRemotesPage]
})
export class GarageDoorRemotesPageModule {}
