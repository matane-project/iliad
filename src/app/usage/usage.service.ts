import {Injectable} from '@angular/core';
import {ApiService} from "../api-service.service";

@Injectable({
  providedIn: 'root'
})
export class UsageService {
  italianUsage: ItalianUsage = {
    call: undefined,
    callExpenses: undefined,
    sms: undefined,
    smsExpenses: undefined,
    data: undefined,
    dataExpenses: undefined,
    dataUsagePercentage: undefined,
    maxData: undefined,
    mms: undefined,
    mmsExpenses: undefined,
    renewalDate: undefined,
    offer: undefined,
    credit: undefined
  };

  roamingUsage: RoamingUsage = {
    call: undefined,
    callExpenses: undefined,
    sms: undefined,
    smsExpenses: undefined,
    data: undefined,
    dataUsagePercentage: undefined,
    dataExpenses: undefined,
    maxData: undefined,
    mms: undefined,
    mmsExpenses: undefined
  }

  constructor(private api: ApiService) {
  }

  async getItalianUsage() {
    let data = await this.api.get('/usage');
    this.italianUsage.call = data.call;
    this.italianUsage.callExpenses = data.callExpenses;
    this.italianUsage.sms = data.sms;
    this.italianUsage.smsExpenses = data.smsExpenses;
    this.italianUsage.data = data.data;
    this.italianUsage.dataExpenses = data.dataExpenses;
    this.italianUsage.dataUsagePercentage = data.dataUsagePercentage;
    this.italianUsage.maxData = data.maxData;
    this.italianUsage.mms = data.mms;
    this.italianUsage.mmsExpenses = data.mmsExpenses;
    this.italianUsage.renewalDate = data.renewalDate;
    this.italianUsage.offer = data.offer;
    this.italianUsage.credit = data.credit;
  }

  async getRoamingUsage(){
    let data = await this.api.get('/usage/roaming');
    this.roamingUsage.call = data.call;
    this.roamingUsage.callExpenses = data.callExpenses;
    this.roamingUsage.sms = data.sms;
    this.roamingUsage.smsExpenses = data.smsExpenses;
    this.roamingUsage.data = data.data;
    this.roamingUsage.dataUsagePercentage = data.dataUsagePercentage;
    this.roamingUsage.dataExpenses = data.dataExpenses;
    this.roamingUsage.maxData = data.maxData;
    this.roamingUsage.mms = data.mms;
    this.roamingUsage.mmsExpenses = data.mmsExpenses;

  }

  getItalianRemainingData(): number {
    if (this.italianUsage.data === undefined || this.italianUsage.maxData === undefined) return 0;
    let used: number;
    if (this.italianUsage.data.includes("gb")) {
      used = Number.parseFloat(this.italianUsage.data.replace('gb', '').replace(',', '.')) * 1e9;
    } else if (this.italianUsage.data.includes("mb")) {
      used = Number.parseFloat(this.italianUsage.data.replace('mb', '').replace(',', '.')) * 1e6;
    } else if (this.italianUsage.data.includes("kb")) {
      used = Number.parseFloat(this.italianUsage.data.replace('kb', '').replace(',', '.')) * 1000;
    } else {
      used = Number.parseFloat(this.italianUsage.data.replace('b', '').replace(',', '.'));
    }

    let maxData = Number.parseFloat(this.italianUsage.maxData.replace('gb', '').replace(',', '.')) * 1e9;
    maxData -= used;
    maxData /= 1e9;
    return maxData;
  }

  getRoamingRemainingData(): number {
    if (this.roamingUsage.data === undefined || this.roamingUsage.maxData === undefined) return 0;
    let used: number;
    if (this.roamingUsage.data.includes("gb")) {
      used = Number.parseFloat(this.roamingUsage.data.replace('gb', '').replace(',', '.')) * 1e9;
    } else if (this.roamingUsage.data.includes("mb")) {
      used = Number.parseFloat(this.roamingUsage.data.replace('mb', '').replace(',', '.')) * 1e6;
    } else if (this.roamingUsage.data.includes("kb")) {
      used = Number.parseFloat(this.roamingUsage.data.replace('kb', '').replace(',', '.')) * 1000;
    } else {
      used = Number.parseFloat(this.roamingUsage.data.replace('b', '').replace(',', '.'));
    }

    let maxData = Number.parseFloat(this.roamingUsage.maxData.replace('gb', '').replace(',', '.')) * 1e9;
    maxData -= used;
    maxData /= 1e9;
    return maxData;
  }


}


interface ItalianUsage {
  call: string | undefined,
  callExpenses: string | undefined,
  sms: string | number | undefined,
  smsExpenses: string | number | undefined,
  data: string | undefined,
  dataExpenses: string | undefined,
  maxData: string | undefined,
  dataUsagePercentage: number | undefined,
  mms: number | string | undefined,
  mmsExpenses: string | undefined,
  renewalDate: string | undefined,
  offer: string | undefined,
  credit: string | undefined
}

interface RoamingUsage {
  call: string | undefined,
  callExpenses: string | undefined,
  sms: string | undefined,
  smsExpenses: string | undefined,
  data: string | undefined,
  maxData: string | undefined,
  dataExpenses: string|undefined,
  dataUsagePercentage: number | undefined,
  mms: number | string | undefined,
  mmsExpenses: string | undefined
}
