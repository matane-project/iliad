import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../auth/user.service";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-biometric-auth',
  templateUrl: './biometric-auth.component.html',
  styleUrls: ['./biometric-auth.component.scss'],
})
export class BiometricAuthComponent implements OnInit {
  @Input('isEnabled') isEnabled: boolean = false;
  constructor(private modal: ModalController) { }

  ngOnInit() {}

  async submit(){
    await UserService.setBiometricStatus(this.isEnabled);
    await this.modal.dismiss();
  }

}
