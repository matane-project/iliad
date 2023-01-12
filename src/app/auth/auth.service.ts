import {Injectable} from '@angular/core';
import {ApiService} from "../api-service.service";
import {Preferences} from "@capacitor/preferences";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiService) {
  }

  async tryLogin(userId: string, password: string) {
    try {
      const value = await this.api.post("/user/login",{userId,password});
      if (!value.ok) return {isError: true, error: 'Qualcosa è andato storto'};
      await Preferences.set({
        key: 'key',
        // @ts-ignore
        value: value.token
      });

      // @ts-ignore
      await Preferences.set({
        key: 'name',
        // @ts-ignore
        value: value.name
      })
      await Preferences.set({
        key: 'userId',
        value: userId
      });
      await Preferences.set({
        key: 'phoneNumber',
        value: value.phoneNumber
      })

      await Preferences.set({
        key: 'password',
        value: password
      });
      return {
        isError: false
      }
    } catch (e) {
      console.log(e);
      return {isError: true, error: new Error("Qualcosa è davvero andato storto")}
    }

  }

  async silentLogin() {
    let preferences = (await Preferences.keys()).keys;
    console.log(preferences);
    if ((preferences.indexOf('userId')>=0) && (preferences.indexOf('password') >= 0)) {
      try {
        await this.tryLogin((await Preferences.get({key: 'userId'})).value!, (await Preferences.get({key: 'password'})).value!);
        return true;
      } catch (e) {
        return false;
      }
    }
    return false;
  }

  async logout(){
    await Preferences.clear();
  }
}
