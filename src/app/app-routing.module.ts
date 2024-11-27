import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'bemvindo',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./support/support.module').then(m => m.SupportPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'bemvindo',
    loadChildren: () => import('./bemvindo/bemvindo.module').then( m => m.BemvindoPageModule)
  },
  {
    path: 'metas',
    loadChildren: () => import('./metas/metas.module').then( m => m.MetasPageModule)
  },
  {
    path: 'transacoes',
    loadChildren: () => import('./transacoes/transacoes.module').then( m => m.TransacoesPageModule)
  },
  {
    path: 'investimentos',
    loadChildren: () => import('./investimentos/investimentos.module').then( m => m.InvestimentosPageModule)
  },
  {
    path: 'bot',
    loadChildren: () => import('./bot/bot.module').then( m => m.BotPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
