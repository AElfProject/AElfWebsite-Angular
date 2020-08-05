import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

import {CookieModule} from 'ngx-cookie';

import { AboutComponent } from './about.component';

import { routes } from './about.routing';

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    CookieModule,
    PerfectScrollbarModule,
    TranslateModule
  ]
})
export class AboutModule{

}
