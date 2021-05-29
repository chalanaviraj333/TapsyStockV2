import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemotedetailsPage } from './remotedetails.page';

const routes: Routes = [
  {
    path: '',
    component: RemotedetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemotedetailsPageRoutingModule {}
