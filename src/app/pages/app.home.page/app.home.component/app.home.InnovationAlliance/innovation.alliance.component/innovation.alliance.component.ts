/**
 * @file innovation.alliance.component.ts
 * @author zhouminghui
 * @description 创新联盟组件
*/

import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-innovation-alliance-component',
    templateUrl: './innovation.alliance.component.html',
    styleUrls: ['./innovation.alliance.component.css']
})

export class InnnovationAllianceComponent {
    @Input() imgurl: string;
    @Input() title: string;
}
