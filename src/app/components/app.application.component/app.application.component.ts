/**
 * @file app.application.component.js
 * @author zhouminghui
 * @description 可自定义 左图右文 或者 右图左文 样式的图文模块
*/

import {Component, OnInit, Input, NgModule} from '@angular/core';
import {ButtonComponent} from '../app.button.component/app.button.component';

@Component({
    selector: 'app-application',
    templateUrl: './app.application.component.html',
    styleUrls: ['./app.application.component.css']
})

@NgModule({
    declarations: [ButtonComponent]
})

export class AppApplicationComponent implements OnInit {

    @Input() type: string;
    @Input() title: string;
    @Input() brief: string;
    @Input() imgurl: string;
    @Input() showbtn: boolean;

    constructor() {}
    ngOnInit() {
        console.log(typeof this.showbtn);
        console.log('application 组件渲染开始!');
    }
}
