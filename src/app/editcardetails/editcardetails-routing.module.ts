import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditcardetailsPage } from './editcardetails.page';

const routes: Routes = [
  {
    path: '',
    component: EditcardetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditcardetailsPageRoutingModule {}
