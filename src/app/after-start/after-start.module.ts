import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

import {CookieModule} from 'ngx-cookie';

import { AfterStartComponent } from './after-start.component';

import { routes } from './after-start.routing';

@NgModule({
  declarations: [
    AfterStartComponent
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
export class AferStartModule{

}
