/**
 * @file innovation.alliance.component.ts
 * @author zhouminghui
 * @description 创新联盟组件
*/

import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-innovation-alliance-component',
    templateUrl: './innovation.alliance.component.html',
    styleUrls: ['./innovation.alliance.component.css']
})

export class InnnovationAllianceComponent implements OnInit {
    @Input() imgurl: string;
    @Input() title: string;
    @Input() url: string;

    ngOnInit() {

    }

    getNewWindow() {
        if (this.url) {
            window.open(this.url);
        }
    }
}
