/**
 * @file router
 * @author zhouminghui
 * @description router 国际化被迁移到了路由里
*/

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
// 必须在根注册
// 页面
import { AppHomepageComponent } from '../pages/app.home.page/app.home.page';
import { AppDeveloporComponent} from '../pages/app.developer.page/app.developer.page';
import { AppApplicationPageComponent } from '../pages/app.application.page/app.application.page';
import {ProclamationPageComponent} from '../pages/app.proclamation.page/app.proclamation.page';
// 组件
import {AppApplicationComponent} from '../components/app.application.component/app.application.component';
import {ButtonComponent} from '../components/app.button.component/app.button.component';
import {ListComponent} from '../components/app.list.component/app.list.component';
import {CorouselComponent} from '../components/app.carousel.component/app.carousel.component';
import {ModalComponent} from '../components/app.modal.component/app.modal.component';

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
        // 页面
        AppHomepageComponent,
        AppDeveloporComponent,
        ProclamationPageComponent,
        AppApplicationPageComponent,
        // 组件
        AppApplicationComponent,
        ButtonComponent,
        ListComponent,
        CorouselComponent,
        ModalComponent
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
