import {Component, OnInit, ViewChild} from '@angular/core';
import {faPhoneVolume} from "@fortawesome/free-solid-svg-icons";
import {faCoins} from "@fortawesome/free-solid-svg-icons";
import {faSms} from "@fortawesome/free-solid-svg-icons";
import {UserService} from "../../auth/user.service";
import {AlertButton, AlertController, IonSlides} from "@ionic/angular";
import {GlobalService} from "../../global.service";
import {Router} from "@angular/router";
import {UsageService} from "../../usage/usage.service";
import {ApiService} from "../../api-service.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(IonSlides) usageTabs: any;

  exitCall = faPhoneVolume;
  topup = faCoins;
  smsIcon = faSms;

  avatar = '';


  name: string | undefined = undefined;
  phoneNumber: string | undefined = undefined;
  currentIp: string | undefined = undefined;
  currentNation: string | undefined = undefined;

  constructor(private user: UserService, private alert: AlertController, private global: GlobalService, public router: Router, public usage: UsageService, private api: ApiService) {
  }

  async ngOnInit(showLoader = true) {
    let loader;
    this.avatar = "https://ui-avatars.com/api/?background=A8433&color=fffff&rounded=true8&name=";
    if (showLoader) {
      loader = await this.global.presentLoading();
    }
    try {
      this.name = await UserService.getName();
      this.phoneNumber = await UserService.getPhoneNumber();
      this.avatar += this.name.replace(/ /g, '+');
      this.currentIp = (await this.api.externalGet("https://api.bigdatacloud.net/data/client-ip")).ipString;
      let data = await this.api.get('/ip/' + this.currentIp);
      this.currentIp = data.ip;
      this.currentNation = data.countryName;
      if (this.currentNation !== 'Italy') {
        await this.usageTabs.slideTo(1, 500);
      }
      await this.usage.getItalianUsage();
      await this.usage.getRoamingUsage();
    } catch (e: any) {
      await this.generateAlert("Attenzione", e.message, [{
        text: 'Riprova',
        role: 'cancel',
        handler: async () => {
          await this.router.navigateByUrl('');
        }
      }]);
    } finally {
      if (showLoader) {
        // @ts-ignore
        await loader.dismiss();
      }
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

  async doRefresh(event: any) {
    try {
      await this.ngOnInit(false);
      event.target.complete();
    } catch (e: any) {
      await this.generateAlert("Si è verificato un errore", e.message ?? "Qualcosa è andato storto", [{
        text: 'Ok',
        role: "destructive"
      }])
    }
  }


}
