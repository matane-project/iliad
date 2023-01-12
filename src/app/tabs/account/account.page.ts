import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {GlobalService} from "../../global.service";
import {userDetails, UserService} from "../../auth/user.service";
import {AlertButton, AlertController, ModalController} from "@ionic/angular";
import {AuthService} from "../../auth/auth.service";
import {EditInfoComponent} from "../../components/edit-info/edit-info.component";
import {Capacitor} from "@capacitor/core";
import {NativeBiometric} from "capacitor-native-biometric";

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  isLoading = true;
  name: string | undefined = undefined;
  phoneNumber: string | undefined = undefined;
  avatar = '';
  puk = '';
  isBiometricSupported = false;
  isBiometricEnabled = 'disabled';
  // @ts-ignore
  details: userDetails = {
    address: {
      canEdit: true,
      value: ''
    },
    password: {
      canEdit: true,
      value: ''
    },
    email: {
      canEdit: true,
      value: ''
    },
    paymentMethod: {
      canEdit: true,
      value: ''
    }
  }

  constructor(public router: Router, private global: GlobalService, private alert: AlertController, private user: UserService, private auth: AuthService, private modal: ModalController) {
  }

  async ngOnInit() {
    this.isLoading = true;
    let loader = await this.global.presentLoading();
    this.avatar = "https://ui-avatars.com/api/?background=A8433&color=fffff&rounded=true8&name=";
    try {
      this.name = await UserService.getName();
      this.phoneNumber = await UserService.getPhoneNumber();
      this.avatar += this.name.replace(/ /g, '+');
      this.details = await this.user.getDetails();
      this.details.keys = {
        canEdit: false,
        value: [
          'email',
          'address',
          'paymentMethod',
          'password'
        ]
      }
      if (Capacitor.getPlatform() !== "web" && await NativeBiometric.isAvailable()) {
        this.isBiometricSupported = true;
      }
      this.isBiometricEnabled = await UserService.getBiometricStatus();
    } catch (e: any) {
      await this.generateAlert("Attenzione", e.message, [{
        text: 'Riprova',
        role: 'cancel',
        handler: async () => {
          await this.router.navigateByUrl('');
        }
      }]);
    } finally {
      await loader.dismiss();
      this.isLoading = false
    }
  }

  async editItem(name: string) {
    let value: string;
    // @ts-ignore
    if(this.details.keys.value.indexOf(name) >= 0){
      // @ts-ignore
      value = this.details[name].value;
    } else {
      // @ts-ignore
      value = this[name];
    }

    // @ts-ignore
    const modal = await this.modal.create({
      mode: "ios",
      component: EditInfoComponent,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.5,
      componentProps: {
        name: name.toString(),
        // @ts-ignore
        value: value
      },
    });

    modal.addEventListener('close', () => {
      this.ngOnInit();
    });

    return await modal.present();
  }

  async logout() {
    try {
      await this.auth.logout();
      await this.router.navigateByUrl('', {replaceUrl: true});
    } catch (e) {
      await this.generateAlert("Attenzione", "Non sono riuscito a fare il logout");
    }
  }

  async generateAlert(title: string, message: string, buttons: AlertButton[] = []) {
    let alert = await this.alert.create({
      header: title,
      message,
      buttons
    });
    return await alert.present();
  }

}
