/**
 * @file app.vision.component.ts
 * @author zhouminghui
 * @description 愿景模块
*/

import {Component, NgModule} from '@angular/core';
import {HomeVisionGraphicComponent} from './app.vision.graphic/app.vision.graphic';

@Component ({
    selector: 'app-home-vision',
    templateUrl: './app.home.vision.html',
    styleUrls: ['./app.home.vision.css']
})

@NgModule({
    declarations: [HomeVisionGraphicComponent]
})

export class HomeVisionComponent {

}

