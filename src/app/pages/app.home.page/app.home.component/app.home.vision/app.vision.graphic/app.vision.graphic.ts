/**
 * @file app.vision.graphic.ts
 * @author zhouminnghui
 * @description 首页 左图右文
*/

import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-vision-graphic',
    templateUrl: './app.vision.graphic.html',
    styleUrls: ['./app.vision.graphic.css']
})

export class HomeVisionGraphicComponent {
    @Input() imgurl: string;
    @Input() title: string;
    @Input() brief: string;
}
