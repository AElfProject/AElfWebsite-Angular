import { BrowserModule } from '@angular/platform-browser';
import {AfterViewInit, NgModule, OnInit} from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import {CookieModule} from 'ngx-cookie';
import {LanguageService} from './shared/language.service';
import {NewsService} from './shared/news.service';
import {HeaderTabsService} from './shared/header-tabs.service';
import {SwiperService} from './shared/swiper.service';
import {ProductionNodesService} from './shared/production-nodes.service';
import {DevCaseService} from './shared/dev-case.service';
import {PapersService} from './shared/papers.service';
import {FontFamliyService} from './shared/font-famliy.service';
import { WindowService } from './shared/window.service';
import { ConnectInfoService } from './shared/connectInfo.service';
import { MainnetSourceService } from './shared/mainnet-source.service';
import { ConfigHiddenService } from './shared/config-hidden.service';

import {PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

import { AppRoutingModule } from './app-routing.module';
import { HeaderModule } from './modules/header/header.module';
import { MobileHeaderModule } from './modules/mobile-header/mobile-header.module';
import { FooterModule } from './modules/footer/foot.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', `.json?${(new Date()).getTime()}`);
}
const PERFECT_SCOROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { HomeComponent } from './home/home.component';

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
    PerfectScrollbarModule.forRoot(PERFECT_SCOROLLBAR_CONFIG),
    AppRoutingModule,
    HeaderModule,
    MobileHeaderModule,
    FooterModule
  ],
  providers: [
    LanguageService, NewsService, SwiperService, HeaderTabsService, ConnectInfoService,
    ProductionNodesService, DevCaseService, PapersService, FontFamliyService, WindowService,
    MainnetSourceService, ConfigHiddenService],
  bootstrap: [AppComponent]
})
export class AppModule{

}
