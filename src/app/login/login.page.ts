import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {AlertButton, AlertController, LoadingController} from "@ionic/angular";
import {Router} from "@angular/router";
import {GlobalService} from "../global.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userId = '';
  password = '';
  constructor(private auth: AuthService, private alert: AlertController, private router: Router, private global: GlobalService) { }

  ngOnInit() {

  }


  async login(){
    if(this.userId === '' || this.password === ''){
      await this.generateAlert('Attenzione', 'User ID e password sono obbligatori', [{text: 'Ok', role: 'cancel'}])
      return;
    }
   let loader = await this.global.presentLoading("white");
    try{
      let data = await this.auth.tryLogin(this.userId, this.password);
      if(data.isError){
        // @ts-ignore
        await this.generateAlert("Attenzione", data.error.message,[{
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            this.password = ''
          }
        }])
        return;
      }
      await this.router.navigateByUrl('/app/home');
    }catch (e){
      // @ts-ignore
      await this.generateAlert("Attenzione", e.message,[{
        text: 'Ok',
        role: 'cancel',
      }])
    } finally {
      await loader.dismiss();
    }
  }


  async generateAlert(title: string, message: string, buttons: AlertButton[] = []){
    let alert = await this.alert.create({
      header: title,
      message,
      buttons
    });
    return await alert.present();
  }
}
