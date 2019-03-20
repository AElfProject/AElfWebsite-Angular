/**
 * @file router
 * @author zhouminghui
*/

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppHomepageComponent } from '../pages/app.home.page/app.home.page';
import { AppDeveloporComponent} from '../pages/app.developer.page/app.developer.page';
import { AppApplicationPageComponent } from '../pages/app.application.page/app.application.page';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import {AppApplicationComponent} from '../components/app.application.component/app.application.component';
import {ProclamationPageComponent} from '../pages/app.proclamation.page/app.proclamation.page';
import {ButtonComponent} from '../components/app.button.component/app.button.component';
import {ListComponent} from '../components/app.list.component/app.list.component';

const routes: Routes = [
    { path: '', component: AppHomepageComponent },
    { path: 'developer', component: AppDeveloporComponent},
    { path: 'application', component: AppApplicationPageComponent},
    { path: 'node', component: AppDeveloporComponent},
    { path: 'community', component: AppDeveloporComponent},
    { path: 'proclamation', component: ProclamationPageComponent}

    // { path: 'path/:routeParam', component: MyComponent },
    // { path: 'staticPath', component: ... },
    // { path: '**', component: ... },
    // { path: 'oldPath', redirectTo: '/staticPath' },
    // { path: ..., component: ..., data: { message: 'Custom' }
];

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppHomepageComponent,
        AppDeveloporComponent,
        ProclamationPageComponent,
        AppApplicationPageComponent,
        AppApplicationComponent,
        ButtonComponent,
        ListComponent
    ],
    imports: [
        RouterModule.forRoot(routes),
        BrowserModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    ],
    exports: [RouterModule]
})

export class RoutingModule {}
