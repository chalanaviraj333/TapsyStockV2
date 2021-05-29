import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgrammingdetailsPage } from './programmingdetails.page';

const routes: Routes = [
  {
    path: '',
    component: ProgrammingdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgrammingdetailsPageRoutingModule {}
