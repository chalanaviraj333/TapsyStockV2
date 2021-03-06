import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../remoteshell-page/remoteshell-page.module').then( m => m.RemoteshellPagePageModule)
      },
      {
        path: 'more',
        loadChildren: () => import('../more/more.module').then( m => m.MorePageModule)
      },
      {
        path: 'tab1/model/:brandId',
        loadChildren: () => import('../model/model.module').then( m => m.ModelPageModule)
      },
      {
        path: 'tab1/year/:selectedBrand/:selectedModel/:startyear/:endyear',
        loadChildren: () => import('../year/year.module').then( m => m.YearPageModule)
      },
      {
        path: 'tab1/result/:selectedBrand/:selectedModel/:selectedYear/:startyear/:endyear',
        loadChildren: () => import('../result/result.module').then( m => m.ResultPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
