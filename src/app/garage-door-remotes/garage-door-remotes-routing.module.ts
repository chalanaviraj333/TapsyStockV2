import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GarageDoorRemotesPage } from './garage-door-remotes.page';

const routes: Routes = [
  {
    path: '',
    component: GarageDoorRemotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GarageDoorRemotesPageRoutingModule {}
