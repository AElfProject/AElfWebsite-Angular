import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent} from './about/about.component';
import { HomeComponent} from './home/home.component';
import { HomepageComponent} from './homepage/homepage.component';
import { EconomicComponent} from './economic/economic.component';
import { FacilityComponent} from './facility/facility.component';
import { BrowserComponent} from './browser/browser.component';
import { DeveloperComponent} from './developer/developer.component';
import { PlugComponent} from './plug/plug.component';
import { WalletComponent} from './wallet/wallet.component';
import { WebwalletComponent} from './webwallet/webwallet.component';
import { AfterStartComponent} from './after-start/after-start.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'app-about', component: AboutComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'economic', component: EconomicComponent },
  { path: 'facility', component: FacilityComponent },
  { path: 'browser', component: BrowserComponent },
  { path: 'developer', component: DeveloperComponent },
  { path: 'plug', component: PlugComponent },
  { path: 'wallet', component: WalletComponent },
  { path: 'webwallet', component: WebwalletComponent },
  { path: 'afterstart', component: AfterStartComponent },
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
