/**
 * @file app.carousel.component.ts
 * @author zhouminghui
 * @description 二级页轮播图模块
 * TODO: 可以考虑日后通过某属性改变轮播形态。。。 更加通用多元化的轮播组件
*/

import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

declare let $: any;

@Component({
    selector: 'app-carousel',
    templateUrl: './app.carousel.component.html',
    styleUrls: ['./app.carousel.component.css']
})

// 果然还是要靠手撸代码 手撸代码欢乐多。。。
export class CorouselComponent implements OnInit {
    public timer: any;
    public dataLen: any;
    public moveDistance: any;
    public touchStartPoint: any;
    public touchEenPoint: any;
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
    @Output() childEvent = new EventEmitter<any>();

    constructor() {}

    ngOnInit(): void {
        this.isMove = true;
        // 这么傻逼的方法是因为获取宽度不准确 所以用了百分比  正好可以适应不同宽高。。。。。。
        this.dataLen = this.data.length;
        // const last  = this.data[dataLen - 1];
        const first = this.data[0];
        const last  = [this.data[this.dataLen - 1]];
        this.imglist = [...last, ...this.data, ...first];
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
            this.childEvent.emit(this.itemContent);
        }
    }

    paginationClick(index) {
        // planC
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

        // planA
        // if (step > this._thisPaginationIndex) {
        //     stepRound = step - this._thisPaginationIndex;
        //     this._thisPaginationIndex = step;
        //     this.data = [...this.data, ...this.data.slice(0, stepRound)];
        //     this.data.splice(0, stepRound);
        // } else {
        //     stepRound = this._thisPaginationIndex - step;
        //     this._thisPaginationIndex = step;
        //     this.data = [ ...this.data.slice(len - stepRound, len), ...this.data];
        //     this.data.splice(len, this.data.length);
        // }

        // 因为数据双向绑定,planeB有点问题
        // planB
        // if (step > this._thisPaginationIndex) {
        //     stepRound = step - this._thisPaginationIndex;
        //     this._thisPaginationIndex = step;
        //     $('.carousel-cont').animate({'margin-left': - stepRound + '00%'}, 2000, () => {
        //         this.data = [...this.data, ...this.data.slice(0, stepRound)];
        //         this.data.splice(0, stepRound);
        //         $('.carousel-cont').css({'margin-left': '0px'});
        //     });
        // } else {
        //     stepRound = this._thisPaginationIndex - step;
        //     console.log(stepRound);
        //     this._thisPaginationIndex = step;
        //     $('.carousel-cont').css({'margin-left': - stepRound + '00%'});
        //     this.data = [ ...this.data.slice(len - step, len), ...this.data];
        //     this.data.splice(len, this.data.length);
        //     console.log(this.data);
        //     // $('.carousel-cont').css({'margin-left': - stepRound + '00%'});
        //     // $('.carousel-cont').animate({'margin-left': '0px'}, 2000);
        // }
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

    touchStart(event) {
        this.stopPlay();
        this.touchStartPoint = event.touches[0].clientX;
    }

    touchMove(event) {
        this.touchEenPoint =  event.touches[0].clientX;
    }

    touchEnd() {
        if (Math.abs(this.touchStartPoint - this.touchEenPoint) > 50) {
            if (this.touchStartPoint > this.touchEenPoint) {
                this.playNext();
            } else {
                this.playPre();
            }
        }
        this.autoPlay();
    }
    // playPre(): void {
    //     if (this.isMove) {
    //         console.log('pre');
    //         this.isMove = false;
    //         const last = this.data.length - 1;
    //         this.data = [...this.data, ...this.data[last]];
    //         this.data.pop();
    //         this.state = 'stayR';
    //         // 状态无法同时传递，后者会覆盖前者，所以分开两次传送状态 animate 的状态延迟一小会
    //         // 这样就可以尽享丝滑享受了。。。
    //         setTimeout(() => {
    //             this.state = 'moveRight';
    //             this.getStep(-1);
    //         }, 20);
    //     }
    // }


    // playNext(): void {
    //     if (this.isMove) {
    //         console.log('next');
    //         this.isMove = false;
    //         const leftWidth = this._thisPaginationIndex * (100 / (this.len * 2));
    //         this.moveStyle = {
    //             'transition-duration': '500ms',
    //             'transition-timing-function': 'linear',
    //             'transform': 'translatex(-' + leftWidth + '%)'
    //         };
    //         setTimeout(() => {
    //             this.moveStyle = {
    //                 'transform': 'translatex(0%)'
    //             };
    //             this.isMove = true;
    //         }, 1000);
    //     }
    // }


}
