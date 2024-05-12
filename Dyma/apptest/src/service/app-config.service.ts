import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AppConfigService {

  private appConfig: any;
  private http : HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
   }

   async loadAppConfig() {
    const config = await lastValueFrom(this.http.get('./assets/env/appSetting.json'));
     this.appConfig = config;
  }

  get apiBaseUrl() : string {
    return this.appConfig.apiBaseUrl;
  }
  get apiUser() : string {
    return this.appConfig.apiUser;
  }
  get apiRecipe() : string {
    return this.appConfig.apiRecipe;
  }

}
