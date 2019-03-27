/**
 * @file app.button.component
 * @author zhouminghui
 * @description 小按钮。。 不多说了
*/

import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './app.button.component.html',
    styleUrls: ['./app.button.component.css']
})

export class ButtonComponent implements OnInit {
    @Input() text: string;
    @Input() linkurl: string;

    ngOnInit() {
        this.linkurl = this.linkurl ? this.linkurl : 'javascript:void(0);';
    }

}
