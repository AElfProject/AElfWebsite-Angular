/**
 * @file router
 * @author zhouminghui
 * @description router 国际化被迁移到了路由里
*/

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
// 必须在根注册
// 页面
import { AppHomepageComponent } from '../pages/app.home.page/app.home.page';
import { AppDeveloporComponent} from '../pages/app.developer.page/app.developer.page';
import { AppApplicationPageComponent } from '../pages/app.application.page/app.application.page';
import { ProclamationPageComponent } from '../pages/app.proclamation.page/app.proclamation.page';
import { NodePageComponent } from '../pages/app.node.page/app.node.page';
import { CommunityPageComponent } from '../pages/app.community.page/app.community.page';
// 组件
import {AppApplicationComponent} from '../components/app.application.component/app.application.component';
import {ButtonComponent} from '../components/app.button.component/app.button.component';
import {ListComponent} from '../components/app.list.component/app.list.component';
import {CorouselComponent} from '../components/app.carousel.component/app.carousel.component';
import {ModalComponent} from '../components/app.modal.component/app.modal.component';
import {HomeAdvantageComponent} from '../pages/app.home.page/app.home.component/app.home.advantage/app.home.advantage';
import {HomeTeamComponent} from '../pages/app.home.page/app.home.component/app.home.team/app.home.team';
import {HomeInvestmenInstitutionComponent} from '../pages/app.home.page/app.home.component/app.home.InvestmentInstitution/app.home.InvestmentInstitution';
import {HomeExchangeComponent} from '../pages/app.home.page/app.home.component/app.home.exchange/app.home.exchange';
import {HomeTokenAllocationComponent} from '../pages/app.home.page/app.home.component/app.home.tokenAllocaitoon/app.home.tokenAllocation';
import {HomeNewsComponent} from '../pages/app.home.page/app.home.component/app.home.news/app.home.news';
import {HomeVisionComponent} from '../pages/app.home.page/app.home.component/app.home.vision/app.home.vision';
import {HomeVisionGraphicComponent} from '../pages/app.home.page/app.home.component/app.home.vision/app.vision.graphic/app.vision.graphic'
import {HomeDevelopmentRoadmapComponent} from '../pages/app.home.page/app.home.component/app.home.developmentRoadmap/app.home.developmentRoadmap';
import {HomeInnovationAllianceComponent} from '../pages/app.home.page/app.home.component/app.home.InnovationAlliance/app.home.InnovationAlliance';
import {InnnovationAllianceComponent} from '../pages/app.home.page/app.home.component/app.home.InnovationAlliance/innovation.alliance.component/innovation.alliance.component';
import {NewNewsComponent} from '../pages/app.home.page/app.home.component/app.home.new.news/app.home.new.news';
import {NodelistComponent} from '../pages/app.node.page/node.component/node.nodelist/node.nodelist';
import {HomeCorouselComponent} from '../pages/app.home.page/app.home.component/app.home.carousel/app.home.carousel';
import {PaginatorComponent} from '../components/app.paginate.component/app.paginate.component';

const routes: Routes = [
    { path: '', component: AppHomepageComponent },
    { path: 'developer', component: AppDeveloporComponent},
    { path: 'application', component: AppApplicationPageComponent},
    { path: 'node', component: NodePageComponent},
    { path: 'community', component: CommunityPageComponent},
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
        NodePageComponent,
        CommunityPageComponent,
        // 组件
        AppApplicationComponent,
        ButtonComponent,
        ListComponent,
        CorouselComponent,
        ModalComponent,
        HomeAdvantageComponent,
        HomeTeamComponent,
        HomeInvestmenInstitutionComponent,
        HomeExchangeComponent,
        HomeTokenAllocationComponent,
        HomeNewsComponent,
        HomeVisionComponent,
        HomeVisionGraphicComponent,
        HomeDevelopmentRoadmapComponent,
        HomeInnovationAllianceComponent,
        InnnovationAllianceComponent,
        NewNewsComponent,
        NodelistComponent,
        HomeCorouselComponent,
        PaginatorComponent
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
