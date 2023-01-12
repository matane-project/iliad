import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SimPageRoutingModule } from './sim-routing.module';

import { SimPage } from './sim.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SimPageRoutingModule
  ],
  declarations: [SimPage]
})
export class SimPageModule {}
