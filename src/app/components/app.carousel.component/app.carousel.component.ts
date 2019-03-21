/**
 * @file app.carousel.component.ts
 * @author zhouminghui
 * @description 二级页轮播图模块
 * TODO: 首页的轮播图需要考虑考虑  当前的轮播逻辑还是有问题的 待其他组件完成后修改
*/

import {Component, OnInit, AfterContentInit, HostListener} from '@angular/core';
import {carouselAnimate} from '../../utils/carouselAnimate';

declare let $: any;

@Component({
    selector: 'app-carousel',
    templateUrl: './app.carousel.component.html',
    styleUrls: ['./app.carousel.component.css'],
    animations: [carouselAnimate]
})

export class CorouselComponent implements OnInit, AfterContentInit {
    public imglist: any[] = [];
    public timer: any;
    public state: any = 'stay';
    public carouselWidth: any;
    public boxWidth: any;
    // 阻止正在动画中点击造成 animations.done 的提前结束 也用于阻止用户连续点击
    public isMove: boolean;
    constructor() {}

    ngOnInit(): void {
        this.isMove = false;
        // TODO: 这里要看如何让组件也可以写到轮播渲染中 ? 给个判断 是接口还是  首页
        this.imglist = [
            {
                src: '',
                alt: '图片1'
            },
            {
                src: '',
                alt: '图片2'
            },
            {
                src: '',
                alt: '图片3'
            },
            {
                src: '',
                alt: '图片4'
            },
        ];
        this.carouselWidth = $('.carousel-box').width();
        // 有几张图片就是百分之几百的宽度 保证图片可以在一行放下，讲道理  百分之几百在宽 100% 也等于 父类的宽度
        // 有些鸡贼的方法，但是很有效！
        this.boxWidth = this.imglist.length + '00%';
        this.autoPlay();
    }

    ngAfterContentInit(): void {

    }

    // TODO: 一会记得回来写小点点
    clickPoint() {

    }

    @HostListener('window:resize') onresize() {
        this.carouselWidth = $('.carousel-box').width();
    }

    autoPlay(): void {
        const corusel = this;
        this.timer = setInterval(() => {
            // console.log('start');
            if (this.isMove) {
                this.isMove = false;
                corusel.state = 'moveLeft';
            }
        }, 5000);
    }

    stopPlay(): void {
        clearInterval(this.timer);
    }

    afterPlay(): void {
        if (this.state === 'moveLeft') {
            // console.log('endLeft');
            this.state = 'stay';
            this.imglist.push(this.imglist[0]);
            this.imglist.shift();
            this.isMove = true;
        } else if (this.state === 'moveRight') {
            // console.log('endRight');
            this.state = 'stay';
            this.isMove = true;
        } else {
            // console.log('endStay');
            // 这就是嘛也没发生的情况
            this.isMove = true;
        }
    }

    playPre(): void {
        if (this.isMove) {
            // console.log('pre');
            this.isMove = false;
            const last = this.imglist.length - 1;
            this.imglist.unshift(this.imglist[last]);
            this.imglist.pop();
            this.state = 'stayR';
            // angular 状态无法同时传送两种状态，所以分开两次传送状态 animate 的状态延迟200ms传送
            // 这样就可以尽享丝滑享受了。。。
            setTimeout(() => {
                this.state = 'moveRight';
            }, 200);
        }
    }

    playNext(): void {
        if (this.isMove) {
            // console.log('next');
            this.isMove = false;
            this.state = 'moveLeft';
        }
    }
}
