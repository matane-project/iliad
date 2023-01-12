import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimPage } from './sim.page';

const routes: Routes = [
  {
    path: '',
    component: SimPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimPageRoutingModule {}
