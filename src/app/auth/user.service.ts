import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Preferences} from "@capacitor/preferences";
import {ApiService} from "../api-service.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api: ApiService) {
  }

  static async getToken() {
    return (await Preferences.get({key: 'key'})).value!;
  }

  static async getName() {
    return (await Preferences.get({key: 'name'})).value!;
  }

  static async getPhoneNumber() {
    return (await Preferences.get({key: 'phoneNumber'})).value!;
  }

  static async getUserId() {
    return (await Preferences.get({key: 'userId'})).value!;
  }

  static async getPassword() {
    return (await Preferences.get({key: 'password'})).value!;
  }

  static async isLoggedIn() {
    const preferences = (await Preferences.keys()).keys;
    return (preferences.indexOf('key') >= 0) && (preferences.indexOf('userId') >= 0) && (preferences.indexOf('password') >= 0);
  }

  static async getBiometricStatus() {
    return (await Preferences.get({key: 'biometric'})).value ?? "disabled";
  }

  static async setBiometricStatus(status: boolean) {
    return (await Preferences.set({key: 'biometric', value: status ? 'enabled' : 'disabled'}));
  }

  async getDetails() {
    let details: userDetails;

    const data = await this.api.get('/user/details');
    details = data.details;

    return details;
  }

}

@Injectable()
export class CanActivateUser implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!UserService.isLoggedIn()) {
      this.router.navigateByUrl('/login', {replaceUrl: true});
      return false;
    }
    return true;
  }

}

export interface userDetails {
  address: {
    canEdit: boolean,
    value: string
  },
  email: {
    canEdit: boolean,
    value: string
  },
  paymentMethod: {
    canEdit: boolean,
    value: string
  },
  password: {
    canEdit: boolean,
    value: string
  },
  keys: {
    canEdit: boolean,
    value: [
      'email',
      'address',
      'paymentMethod',
      'password'
    ]
  }
}
