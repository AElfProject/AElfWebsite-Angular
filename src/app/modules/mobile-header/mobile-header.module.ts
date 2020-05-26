import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileHeaderComponent } from './mobile-header.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { AppRoutingModule } from '../../app-routing.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [MobileHeaderComponent],
  exports: [
    MobileHeaderComponent
  ]
})
export class MobileHeaderModule { }
