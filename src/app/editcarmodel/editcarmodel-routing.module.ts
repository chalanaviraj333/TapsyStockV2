import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditcarmodelPage } from './editcarmodel.page';

const routes: Routes = [
  {
    path: '',
    component: EditcarmodelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditcarmodelPageRoutingModule {}
