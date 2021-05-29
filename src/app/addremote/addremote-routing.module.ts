import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddremotePage } from './addremote.page';

const routes: Routes = [
  {
    path: '',
    component: AddremotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddremotePageRoutingModule {}
