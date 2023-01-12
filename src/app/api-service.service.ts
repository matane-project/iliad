import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {UserService} from "./auth/user.service";
import * as request from 'request';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUri = 'https://api.iliadapp.it';

  constructor(private http: HttpClient) {
  }


  async get(path: string): Promise<any> {
    let headers = new HttpHeaders();
    if (await UserService.isLoggedIn()) {
      headers = headers.append('Authorization', await UserService.getToken());
    }
    return await lastValueFrom(this.http.get(this.baseUri + path, {headers}));
  }

  async post(path: string, data: object): Promise<any> {
    let headers = new HttpHeaders();
    if (await UserService.isLoggedIn()) {
      headers = headers.append('Authorization', await UserService.getToken());
    }
    return await lastValueFrom(this.http.post(this.baseUri + path, data, {headers}));
  }

  async externalGet(path: string): Promise<any> {
    return await lastValueFrom(this.http.get(path));
  }

}
