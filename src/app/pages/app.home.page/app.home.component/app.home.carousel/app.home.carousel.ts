/**
 * @file app.home.carousel.ts
 * @author zhouminghui
 * @description 这个没办法用组件。。
*/

import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-home-carousel',
    templateUrl: './app.home.carousel.html',
    styleUrls: ['./app.home.carousel.css']
})

export class HomeCorouselComponent implements OnInit {
    public timer: any;
    public screenHeight =  window.innerHeight || document.documentElement.clientHeight;
    public dataLen: any;
    public len: any;
    public boxWidth: any;
    public carouselWidth: any;
    public showpPagination = true;
    public _thisPaginationIndex = 0;
    // 防止疯狂连续点击
    public isMove: boolean;
    public itemContent: any;
    public moveStyle: any;
    public imglist: any[] = [];
    @Input() data: any;
    constructor() {}

    ngOnInit(): void {
        this.isMove = true;
        // 这么傻逼的方法是因为获取宽度不准确 所以用了百分比  正好可以适应不同宽高。。。。。。
        this.dataLen = this.data.length;
        // const last  = this.data[dataLen - 1];
        const first = this.data[0];
        const last  = [this.data[this.dataLen - 1]];
        this.imglist = [...last, ...this.data, ...first];
        console.log(this.imglist);
        this.len = this.imglist.length;
        this.carouselWidth = 100 / this.len + '%';
        this.boxWidth = this.len  + '00%';
        this.moveStyle = {
            'transform': 'translatex(-' +  this.carouselWidth + ')'
        };
        if (this.dataLen > 1) {
            this.autoPlay();
        } else {
            this.showpPagination = false;
        }
    }

    getListInfo(key) {
        if (key) {
            this.itemContent = this.data.filter(item => {
                return item.key === key;
            });
        }
    }

    paginationClick(index) {
        // planC
        console.log(index);
        if (this.isMove) {
            this._thisPaginationIndex = index;
            this.isMove = false;
            const leftWidth = (this._thisPaginationIndex + 1) * (100 / this.len);
                this.moveStyle = {
                    'transition-duration': '500ms',
                    'transition-timing-function': 'linear',
                    'transform': 'translatex(-' + leftWidth + '%)'
                };
                setTimeout(() => {
                    this.isMove = true;
                }, 600);
        }
    }

    autoPlay(): void {
        // planC
        if (this.dataLen > 1) {
            this.timer = setInterval(() => {
                this.playNext();
             }, 5000);
        }
    }

    stopPlay(): void {
        clearInterval(this.timer);
    }

    getStep(steps) {
        this._thisPaginationIndex += steps;
        console.log(this._thisPaginationIndex);
        if (this._thisPaginationIndex === this.dataLen - 1) {
            this._thisPaginationIndex = 0;
        }
        if (this._thisPaginationIndex === 0) {
            this._thisPaginationIndex = this.dataLen - 1;
        }
    }

    playNext(): any {
        if (this.isMove && this.dataLen > 1) {
            this.isMove = false;
            this._thisPaginationIndex += 1;
            if (this._thisPaginationIndex === this.data.length) {
                const leftWidth = (this._thisPaginationIndex + 1) * (100 / this.len);
                this._thisPaginationIndex = 0;
                this.moveStyle = {
                    'transition-duration': '500ms',
                    'transition-timing-function': 'linear',
                    'transform': 'translatex(-' + leftWidth + '%)'
                };
                setTimeout(() => {
                    this.moveStyle = {
                        'transform': 'translatex(-' +  this.carouselWidth + ')'
                    };
                    this.isMove = true;
                }, 600);
            } else {
                const leftWidth = (this._thisPaginationIndex + 1) * (100 / this.len);
                this.moveStyle = {
                    'transition-duration': '500ms',
                    'transition-timing-function': 'linear',
                    'transform': 'translatex(-' + leftWidth + '%)'
                };
                setTimeout(() => {
                    this.isMove = true;
                }, 600);
            }
        }
    }

    playPre(): void {
        if (this.isMove && this.dataLen > 1) {
            this.isMove = false;
            if (this._thisPaginationIndex === 0) {
                this._thisPaginationIndex = (this.dataLen - 1);
                // 这里要用总长度来计算恢复的位置
                const leftWidth = (this.len - 2) * (100 / this.len);
                console.log(leftWidth);
                this.moveStyle = {
                    'transition-duration': '500ms',
                    'transition-timing-function': 'linear',
                    'transform': 'translatex(0%)'
                };
                setTimeout(() => {
                    this.moveStyle = {
                        'transform': 'translatex(-' +  leftWidth + '%)'
                    };
                    this.isMove = true;
                }, 600);
            } else {
                this._thisPaginationIndex -= 1;
                // 展示的总是要比下标位置多一个位置 因为为了无缝复制出了两个元素
                const leftWidth = (this._thisPaginationIndex + 1) * (100 / this.len);
                console.log(leftWidth);
                this.moveStyle = {
                    'transition-duration': '500ms',
                    'transition-timing-function': 'linear',
                    'transform': 'translatex(-' +  leftWidth + '%)'
                };
                setTimeout(() => {
                    this.isMove = true;
                }, 600);
            }
        }
    }
}
