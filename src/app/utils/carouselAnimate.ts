/**
 * @file carouselAnimate.ts
 * @author zhouminghui
 * @description 轮播动画状态的 管理 & 定义设置  想修改动画的时间  应该也不会修改。。。
 * TIP: 状态不要用重复名字来定义 state 和 transition 2333333
 * 至于为什么用 100% 来做移动的距离 因为轮播要响应不同大小的屏幕呀
 * 这个。。哎 垃圾不用了
*/

import { trigger, state, animate, transition, style } from '@angular/animations';

export const carouselAnimate = trigger('carousel', [
    state('stay', style(
        {
            marginLeft: '0'
        }
    )),
    state('stayR', style(
        {
            marginLeft: '-100%'
        }
    )),
    transition('* => moveLeft', animate('2000ms linear', style({
        marginLeft: '-100%'
    }))),
    transition('* => moveRight', animate('2000ms linear', style({
        marginLeft: '0'
    })))
]);
