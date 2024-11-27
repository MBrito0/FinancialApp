import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
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
        path: 'transacoes',
        loadChildren: () => import('../transacoes/transacoes.module').then(m => m.TransacoesPageModule)
      },
      {
        path: 'bot',
        loadChildren: () => import('../bot/bot.module').then(m => m.BotPageModule)
      },
      {
        path: '',
        redirectTo: '/home/dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
