import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import {CookieModule} from 'ngx-cookie';

import { DeveloperComponent } from './developer.component';

import { routes } from './developer.routing';

@NgModule({
  declarations: [
    DeveloperComponent
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
export class DeveloperModule{

}
