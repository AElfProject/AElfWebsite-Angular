/**
 * @file app.proclamation.page.ts
 * @author zhouminghui
 * @description 公告页
*/

import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-proclamation',
    templateUrl: './app.proclamation.page.html',
    styleUrls: ['./app.proclamation.page.css']
})

export class ProclamationPageComponent implements OnInit {
    public datalist: any[] = [];
    public itemData: any;
    public showModal = false;

    ngOnInit() {
        this.datalist = [
            {
                key: '0',
                title: '这是公告的题目，点击之后弹出浮动页面现实文本内容',
                date: '2019/01.01',
                content: '<p>这是标题</p><p>2019-01-01</p>'
            },
            {
                key: '1',
                title: '这是公告的题目，点击之后弹出浮动页面现实文本内容',
                date: '2019/01.02',
                content: '<p>这是标题</p><p>2019-01-02</p>'
            },
            {
                key: '2',
                title: '这是公告的题目，点击之后弹出浮动页面现实文本内容',
                date: '2019/01.03',
                content: '<p>这是标题</p><p>2019-01-03</p>'
            },
            {
                key: '3',
                title: '这是公告的题目，点击之后弹出浮动页面现实文本内容',
                date: '2019/01.04',
                content: '<p>这是标题</p><p>2019-01-04</p>'
            },
            {
                key: '4',
                title: '这是公告的题目，点击之后弹出浮动页面现实文本内容',
                date: '2019/01.05',
                content: '<p>这是标题</p><p>2019-01-05</p>'
            },
            {
                key: '5',
                title: '这是公告的题目，点击之后弹出浮动页面现实文本内容',
                date: '2019/01.06',
                content: '<p>这是标题</p><p>2019-01-06</p>'
            }
        ];
    }

    getChildEvent(item: object) {
        console.log(item);
        this.itemData = item;
        this.showModal = !this.showModal;
    }

    closeModal(isShow: boolean) {
        this.showModal = isShow;
    }
}
