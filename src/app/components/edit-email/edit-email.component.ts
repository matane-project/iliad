import {Component, Input, OnInit} from '@angular/core';
import {NativeBiometric} from "capacitor-native-biometric";
import {Capacitor} from "@capacitor/core";
import {UserService} from "../../auth/user.service";
import {GlobalService} from "../../global.service";

@Component({
  selector: 'app-edit-email',
  templateUrl: './edit-email.component.html',
  styleUrls: ['./edit-email.component.scss'],
})
export class EditEmailComponent implements OnInit {
  @Input('value') value = '';
  repeatEmail: string = '';
  password: string = '';
  requestPassword: boolean = false;
  constructor(private user: UserService, private global: GlobalService) { }

  async ngOnInit() {
    let loader = await this.global.presentLoading();
    try{
      if(Capacitor.getPlatform() === "web" && await UserService.getBiometricStatus() === 'enabled' && await NativeBiometric.isAvailable()){
        this.requestPassword = false;
      } else {
        this.requestPassword = true;
      }
    }catch (e){

    }finally {
      await loader.dismiss();
    }
  }

}
