/**
 * @file app.application.component.js
 * @author zhouminghui
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
