import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NouveauComponent } from './components/nouveau/nouveau.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { FruitComponent } from './components/fruit/fruit.component';
import { APP_INITIALIZER } from '@angular/core';
import { AppConfigService } from 'src/service/app-config.service';
import { HttpClientModule } from '@angular/common/http';
import { UserformComponent } from './components/userform/userform.component';

@NgModule({
  declarations: [
    AppComponent,
    NouveauComponent,
    FruitComponent,
    UserformComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgOptimizedImage,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { 
      provide : APP_INITIALIZER, 
      multi : true, 
       deps : [AppConfigService], 
       useFactory : (appConfigService : AppConfigService) =>  () => appConfigService.loadAppConfig()
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
