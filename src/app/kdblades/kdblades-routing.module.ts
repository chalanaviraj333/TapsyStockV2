import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KdbladesPage } from './kdblades.page';

const routes: Routes = [
  {
    path: '',
    component: KdbladesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KdbladesPageRoutingModule {}
