import { Injectable } from '@angular/core';
import {LoadingController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private loader: LoadingController) { }

  async presentLoading(backgroundColor: 'transparent'| 'white' = 'transparent'){
    const loader = await this.loader.create({
      message: '<img alt="logo" src="assets/logo.png" height="100px">',
      cssClass: 'pulse '+backgroundColor,
      showBackdrop: false,
      spinner: null,
      duration: 2000,
      translucent: false
    });

    await loader.present();
    return loader;
  }
}
