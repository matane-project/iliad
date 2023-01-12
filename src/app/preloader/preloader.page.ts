import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {Network} from "@capacitor/network";
import {NativeBiometric} from "capacitor-native-biometric";
import {Capacitor} from "@capacitor/core";
import {UserService} from "../auth/user.service";
import {AlertButton, AlertController} from "@ionic/angular";

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.page.html',
  styleUrls: ['./preloader.page.scss'],
})
export class PreloaderPage implements OnInit {
  hasConnection = true;

  constructor(private auth: AuthService, private router: Router, private alert: AlertController) {
  }

  async ngOnInit() {
    await this.initState();
  }

  async initState() {
    try {
      this.hasConnection = true;
      if ((await Network.getStatus()).connected) {

        if (Capacitor.getPlatform() !== "web" && await NativeBiometric.isAvailable() && await UserService.getBiometricStatus() === 'enabled') {
          let res = await NativeBiometric.verifyIdentity({
            reason: 'Visualizza i tuoi consumi',
            title: 'Accedi',
            description: 'Abbiamo bisogno di verificare che chi sta provando ad accedere sia veramente tu.'
          }).then(() => true).catch(() => false);
          if (res) {
            let data = await this.auth.silentLogin();
            if (data) {
              await this.router.navigateByUrl('/app/home', {replaceUrl: true})
            } else {
              await this.router.navigateByUrl('/login', {replaceUrl: true});
            }
          } else {
            await this.generateAlert("Attenzione", "Non siamo riusciti a verificare la tua identità", [
              {
                text: "Riprova",
                role: "cancel",
                handler: () => {
                  this.initState();
                }
              },
              {
                text: 'Logout',
                role: "destructive",
                handler: () => {
                  this.auth.logout();
                  this.router.navigateByUrl('/user/login', {replaceUrl: true})
                }
              }
            ]);

            return;
          }
        } else {
          let data = await this.auth.silentLogin();
          if (data) {
            await this.router.navigateByUrl('/app/home', {replaceUrl: true})
          } else {
            await this.router.navigateByUrl('/login', {replaceUrl: true});
          }
        }
      } else {
        this.hasConnection = false;
      }
    } catch (e) {
      await this.router.navigateByUrl('/login', {replaceUrl: true});
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
