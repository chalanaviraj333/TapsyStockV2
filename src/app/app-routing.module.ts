import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tab1',
    loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  // {
  //   path: 'model/:brandId',
  //   loadChildren: () => import('./model/model.module').then( m => m.ModelPageModule)
  // },
  // {
  //   path: 'year',
  //   loadChildren: () => import('./year/year.module').then( m => m.YearPageModule)
  // },
  // {
  //   path: 'result',
  //   loadChildren: () => import('./result/result.module').then( m => m.ResultPageModule)
  // },
  // {
  //   path: 'remotedetails',
  //   loadChildren: () => import('./remotedetails/remotedetails.module').then( m => m.RemotedetailsPageModule)
  // },
  {
    path: 'addremote',
    loadChildren: () => import('./addremote/addremote.module').then( m => m.AddremotePageModule)
  },
  {
    path: 'addmodel',
    loadChildren: () => import('./addmodel/addmodel.module').then( m => m.AddmodelPageModule)
  },
  {
    path: 'addcarbrand',
    loadChildren: () => import('./addcarbrand/addcarbrand.module').then( m => m.AddcarbrandPageModule)
  },
  {
    path: 'programmingdetails',
    loadChildren: () => import('./programmingdetails/programmingdetails.module').then( m => m.ProgrammingdetailsPageModule)
  },
  {
    path: 'addprogrammingdetails',
    loadChildren: () => import('./addprogrammingdetails/addprogrammingdetails.module').then( m => m.AddprogrammingdetailsPageModule)
  },
  {
    path: 'carnotes',
    loadChildren: () => import('./carnotes/carnotes.module').then( m => m.CarnotesPageModule)
  },
  {
    path: 'additems',
    loadChildren: () => import('./additems/additems.module').then( m => m.AdditemsPageModule)
  },
  {
    path: 'editcarmodel',
    loadChildren: () => import('./editcarmodel/editcarmodel.module').then( m => m.EditcarmodelPageModule)
  },
  {
    path: 'editremote',
    loadChildren: () => import('./editremote/editremote.module').then( m => m.EditremotePageModule)
  },
  {
    path: 'editcardetails',
    loadChildren: () => import('./editcardetails/editcardetails.module').then( m => m.EditcardetailsPageModule)
  },
  {
    path: 'lowstock-page',
    loadChildren: () => import('./lowstock-page/lowstock-page.module').then( m => m.LowstockPagePageModule)
  },
  {
    path: 'remoteshell-page',
    loadChildren: () => import('./remoteshell-page/remoteshell-page.module').then( m => m.RemoteshellPagePageModule)
  },
  {
    path: 'mfk-page',
    loadChildren: () => import('./mfk-page/mfk-page.module').then( m => m.MfkPagePageModule)
  },
  {
    path: 'kd-remotes-page',
    loadChildren: () => import('./kd-remotes-page/kd-remotes-page.module').then( m => m.KdRemotesPagePageModule)
  },
  {
    path: 'remote-circuits-page',
    loadChildren: () => import('./remote-circuits-page/remote-circuits-page.module').then( m => m.RemoteCircuitsPagePageModule)
  },
  {
    path: 'garage-door-remotes',
    loadChildren: () => import('./garage-door-remotes/garage-door-remotes.module').then( m => m.GarageDoorRemotesPageModule)
  },
  {
    path: 'kdblades',
    loadChildren: () => import('./kdblades/kdblades.module').then( m => m.KdbladesPageModule)
  },
  {
    path: 'tab3',
    loadChildren: () => import('./tab3/tab3.module').then( m => m.Tab3PageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
