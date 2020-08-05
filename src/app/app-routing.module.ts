import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent} from './home/home.component';

const routes: Routes = [
  { path: '', loadChildren: './home/home.module#HomeModule' },
  { path: 'app-about', loadChildren: './about/about.module#AboutModule' },
  { path: 'homepage', loadChildren: './homepage/homepage.module#HomePageModule' },
  { path: 'economic', loadChildren: './economic/economic.module#EconomicModule' },
  { path: 'facility', loadChildren: './facility/facility.module#FacilityModule' },
  { path: 'browser', loadChildren: './browser/browser.module#BrowserModule' },
  { path: 'developer', loadChildren: './developer/developer.module#DeveloperModule' },
  { path: 'plug', loadChildren: './plug/plug.module#PlugModule' },
  { path: 'wallet', loadChildren: './wallet/wallet.module#WalletModule' },
  { path: 'webwallet', loadChildren: './webwallet/webwallet.module#WebwalletModule' },
  { path: 'afterstart', loadChildren: './after-start/after-start.module#AferStartModule' },
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
