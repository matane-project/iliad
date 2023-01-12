import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoicemailPageRoutingModule } from './voicemail-routing.module';

import { VoicemailPage } from './voicemail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoicemailPageRoutingModule
  ],
  declarations: [VoicemailPage]
})
export class VoicemailPageModule {}
