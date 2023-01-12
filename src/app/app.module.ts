import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CanActivateUser} from "./auth/user.service";
import { NgCircleProgressModule } from 'ng-circle-progress';
import {EditInfoComponent} from "./components/edit-info/edit-info.component";
import {BiometricAuthComponent} from "./components/biometric-auth/biometric-auth.component";
import {FormsModule} from "@angular/forms";
import {AddressEditorComponent} from "./components/address-editor/address-editor.component";
import {EditEmailComponent} from "./components/edit-email/edit-email.component";
import {PaymentMethodComponent} from "./components/payment-method/payment-method.component";
import {EditPasswordComponent} from "./components/edit-password/edit-password.component";


@NgModule({
  declarations: [AppComponent, EditInfoComponent, BiometricAuthComponent, AddressEditorComponent, EditEmailComponent, PaymentMethodComponent, EditPasswordComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FontAwesomeModule, HttpClientModule, NgCircleProgressModule.forRoot({
    radius: 50,
    outerStrokeWidth: 16,
    innerStrokeWidth: 8,
    outerStrokeColor: "#A84338FF",
    innerStrokeColor: "#fff",
    animationDuration: 300,
  }), FormsModule],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, CanActivateUser],
  bootstrap: [AppComponent],
})
export class AppModule {
}
