import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddprogrammingdetailsPage } from './addprogrammingdetails.page';

const routes: Routes = [
  {
    path: '',
    component: AddprogrammingdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddprogrammingdetailsPageRoutingModule {}
