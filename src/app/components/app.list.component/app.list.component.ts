/**
 * @file app.list.component.ts
 * @author zhouminghui
*/

import {Component, AfterContentInit} from '@angular/core';

@Component({
    selector: 'app-list',
    templateUrl: './app.list.component.html',
    styleUrls: ['./app.list.component.css']
})

export class ListComponent implements AfterContentInit {

    public dataList = [];

    // 像react一样 渲染之后填充数据
    ngAfterContentInit(): void {
        this.dataList = [
            {
                title: '这是公告的题目，点击之后弹出浮动页面现实文本内容',
                date: '2019/01.01'
            },
            {
                title: '这是公告的题目，点击之后弹出浮动页面现实文本内容',
                date: '2019/01.02'
            },
            {
                title: '这是公告的题目，点击之后弹出浮动页面现实文本内容',
                date: '2019/01.03'
            },
            {
                title: '这是公告的题目，点击之后弹出浮动页面现实文本内容',
                date: '2019/01.04'
            },
            {
                title: '这是公告的题目，点击之后弹出浮动页面现实文本内容',
                date: '2019/01.05'
            },
            {
                title: '这是公告的题目，点击之后弹出浮动页面现实文本内容',
                date: '2019/01.06'
            }
        ];
    }

    // 显示公告浮层
    getListInfo(date: string) {
        console.log(date);
    }

}
