/**
 * @file app.application.component.js
 * @author zhouminghui
 * @description 可自定义 左图右文 或者 右图左文 样式的图文模块
*/

import {Component, OnInit, Input, NgModule, Output, EventEmitter} from '@angular/core';
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
    @Input() buttontext: string;
    @Input() imgWidth: string;
    @Input() linkurl: string;
    @Output() onClicked = new EventEmitter<boolean>();

    constructor() {}
    ngOnInit() {
        if (!this.buttontext) {
            this.buttontext = 'Learn more';
        }
    }

    onClick(title) {
        this.onClicked.emit(title);
    }
}
