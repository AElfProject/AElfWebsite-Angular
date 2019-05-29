/**
 * @file app.list.component.ts
 * @author zhouminghui
 * @description 一个可复用的列表组件
*/

import {Component, AfterContentInit, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-list',
    templateUrl: './app.list.component.html',
    styleUrls: ['./app.list.component.css']
})

export class ListComponent implements AfterContentInit, OnInit {
    @Input() datalist: any;
    @Output() childEvent = new EventEmitter<any>();
    public itemContent: any;
    // 像react一样 渲染之后填充数据

    ngOnInit(): void {

    }
    ngAfterContentInit(): void {

    }

    // 显示公告浮层
    getListInfo(key: string) {
        this.itemContent = this.datalist.filter(item => {
            return item.key === key;
        });
        this.childEvent.emit(this.itemContent);
    }

}
