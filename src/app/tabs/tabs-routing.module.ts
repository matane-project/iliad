import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import {CanActivateUser} from "../auth/user.service";

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../tabs/home/home.module').then(m => m.HomePageModule),
        canActivate: [CanActivateUser]
      },
      {
        path: 'sim',
        loadChildren: () => import('../tabs/sim/sim.module').then(m => m.SimPageModule),
        canActivate: [CanActivateUser]
      },
      {
        path: 'voicemail',
        loadChildren: () => import('../tabs/voicemail/voicemail.module').then(m => m.VoicemailPageModule),
        canActivate: [CanActivateUser]
      },
      {
        path: 'account',
        loadChildren: () => import('../tabs/account/account.module').then(m => m.AccountPageModule),
        canActivate: [CanActivateUser]
      },
      {
        path: 'topup',
        loadChildren: () => import('./topup/topup.module').then( m => m.TopupPageModule),
        canActivate: [CanActivateUser]
      }

    ]
  },
  {
    path: '',
    redirectTo: '/app/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
