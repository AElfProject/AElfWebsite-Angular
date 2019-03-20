/**
 * @file app.button.component
 * @author zhouminghui
*/

import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './app.button.component.html',
    styleUrls: ['./app.button.component.css']
})

export class ButtonComponent {
    @Input() text: string;
    @Input() linkurl: string;
}
