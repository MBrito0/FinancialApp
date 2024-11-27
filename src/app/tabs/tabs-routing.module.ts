import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'metas',
        loadChildren: () => import('../metas/metas.module').then(m => m.MetasPageModule)
      },
      {
        path: 'investimentos',
        loadChildren: () => import('../investimentos/investimentos.module').then(m => m.InvestimentosPageModule)
      },
      {
        path: 'bot',
        loadChildren: () => import('../bot/bot.module').then(m => m.BotPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
