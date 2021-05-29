import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MfkPagePage } from './mfk-page.page';

const routes: Routes = [
  {
    path: '',
    component: MfkPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MfkPagePageRoutingModule {}
