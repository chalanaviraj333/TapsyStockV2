import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditremotePage } from './editremote.page';

const routes: Routes = [
  {
    path: '',
    component: EditremotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditremotePageRoutingModule {}
