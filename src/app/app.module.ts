import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import {CookieModule} from 'ngx-cookie';
import {LanguageService} from './shared/language.service';
import {FontFamliyService} from './shared/font-famliy.service';
import {PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {WindowService} from './shared/window.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
const PERFECT_SCOROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CookieModule.forRoot(),
    PerfectScrollbarModule.forRoot(PERFECT_SCOROLLBAR_CONFIG)
  ],
  providers: [LanguageService, FontFamliyService, WindowService],
  bootstrap: [AppComponent]
})
export class AppModule { }
