import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KdRemotesPagePage } from './kd-remotes-page.page';

const routes: Routes = [
  {
    path: '',
    component: KdRemotesPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KdRemotesPagePageRoutingModule {}
