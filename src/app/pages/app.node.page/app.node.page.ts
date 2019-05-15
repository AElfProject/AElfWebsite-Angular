/**
 * @file app.node.page.ts
 * @author zhouminghui
 * @description 节点竞选页面 浮层单独写了 为了国际化维护方便。。。
*/

import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-node',
    templateUrl: './app.node.page.html',
    styleUrls: ['./app.node.page.css']
})

export class NodePageComponent implements OnInit {
    public showModal = 'hide';
    public itemData: any[] = [];
    public modalHeight = window.innerHeight || document.documentElement.clientHeight;

    ngOnInit(): void {

    }

    getModalShow() {
        this.showModal = 'show';
    }

    closeModal() {
        this.showModal = 'hide';
    }

    buttonClick(title) {
        console.log(title);
        if (title === 'Node Election') {
            this.getModalShow();
        }
    }
}
