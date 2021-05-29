import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LowstockPagePage } from './lowstock-page.page';

const routes: Routes = [
  {
    path: '',
    component: LowstockPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LowstockPagePageRoutingModule {}
