/**
 * @file app.button.component
 * @author zhouminghui
 * @description 小按钮。。 不多说了
*/

import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './app.button.component.html',
    styleUrls: ['./app.button.component.css']
})

export class ButtonComponent  {
    @Input() text: string;
    @Input() linkurl: any;

    onClick() {
        if (this.linkurl) {
            window.open(this.linkurl);
        }
    }
}
