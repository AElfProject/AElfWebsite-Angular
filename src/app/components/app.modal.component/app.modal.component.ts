/**
 * @file app.modal.component.ts
 * @author zhouminghui
 * @description 文本浮层，适应窗口大小 并能将文本通过 template 的形式传递进来
*/

import {Component, OnInit, HostListener, Input, EventEmitter, Output} from '@angular/core';
// import {pageSizeStyle} from '../../utils/pageSizeStyle';

@Component({
    selector: 'app-modal',
    templateUrl: './app.modal.component.html',
    styleUrls: ['./app.modal.component.css']
})

export class ModalComponent implements OnInit {
    public modalHeight = window.innerHeight || document.documentElement.clientHeight;
    @Input() itemData: any;
    @Output() childEvent = new EventEmitter<any>();
    public contHTML: any;
    constructor() {}

    ngOnInit(): void {
        console.log(this.itemData);
        this.contHTML = this.itemData ? this.itemData[0].content : '<div></div>';
    }

    @HostListener('window:resize') onresize() {
        this.modalHeight = window.innerHeight || document.documentElement.clientHeight;
    }

    closeModal() {
        this.childEvent.emit('hide');
    }

    


}
