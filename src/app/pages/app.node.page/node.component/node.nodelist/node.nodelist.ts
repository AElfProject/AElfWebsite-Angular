/**
 * @file node.nodelist.ts
 * @author zhouminghui
 * @description 节点列表
*/

import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-nodelist',
    templateUrl: './node.nodelist.html',
    styleUrls: ['./node.nodelist.css']
})

export class NodelistComponent {
    @Input() linkurl: string;
    @Input() campaigner: string;
    @Input() describe: string;
    @Input() number: string;
    @Input() nodename: string;
}
