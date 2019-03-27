/**
 * @file app.home.page
 * @author zhouminghui
 * @description 首页
 * TODO: 如果有时间可以继续拆分 首页太臃肿 维护很难
*/

import { AfterViewInit, Component, HostListener, OnInit, NgModule } from '@angular/core';
import { FontFamliyService } from '../../shared/font-famliy.service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { DomSanitizer } from '@angular/platform-browser';
import { HomeAdvantageComponent } from '../app.home.page/app.home.component/app.home.advantage/app.home.advantage';

declare let $: any;

@Component({
  selector: 'app-home',
  templateUrl: './app.home.page.html',
  styleUrls: ['./app.home.page.css']
})

@NgModule({
    declarations: [HomeAdvantageComponent]
})

export class AppHomepageComponent implements OnInit, AfterViewInit {
    public headerActiveCssClass = '';
    public config: PerfectScrollbarConfigInterface = {};
    public languagesDic: any;
    public VideoSrc: any;
    public carouselData: any[] = [];
    constructor(
        public _fontFamlily: FontFamliyService,
        private sanitizer: DomSanitizer
    ) {}

    ngOnInit() {
        const canvas = '<div class="cont">' +
        '            <div class="earth">' +
        '                <div class="webgl bg-img" style="background-image:url(assets/images/section-1-bg.png);"></div>'+
        '                <div class="earth-canvas">' +
        '                    <div id="particles2"></div>' +
        '                </div>' +
        '            </div>' +
        '            <div class="txt color-white">' +
        '                <h2 class="fs-90 mb30">去中心化云计算区块链网络</h2>' +
        '            </div>' +
        '            <div [ngClass]="_fontFamlily.ffArial" class="scroll-down fs-14 color-white ta-c">' +
        '                <p class="mb10"><img src="assets/images/scroll-down.png" alt=""></p>' +
        '                <p class="fs-11">Scrolling mouse</p>' +
        '            </div>' +
        '        </div>';
        this.carouselData = [
            {
                key: '0',
                carousel: canvas,
                hot: true
            },
            {
                key: '1',
                carousel: '<div></div>',
                hot: true
            },
        ];
        this.setVideo();
    }

    ngAfterViewInit() {
        const perfectScrollbarContainer = $('.perfect-scrollbar-container');
        perfectScrollbarContainer.find('.ps__scrollbar-y-rail').css({ 'border-radius': '6px' });
        perfectScrollbarContainer.find('.ps__scrollbar-y-rail').css('cssText', 'width: 7px !important');
        perfectScrollbarContainer.find('.ps__scrollbar-y-rail').css({ 'background-color': 'rgba(255, 255, 255, 0.1)' });
        perfectScrollbarContainer.find('.ps__scrollbar-y-rail').css({ 'background-color': 'rgba(255, 255, 255, 0.1)' });
        perfectScrollbarContainer.find('.ps__scrollbar-y-rail').css({ 'opacity': 0.6 });

    }

    toggleNotice(id) {
        const $notice = document.getElementById(id);
        const display = $notice.style.display;

        const $container = $('.aelf-notice-text');
        $container.css({ 'display': 'none' });

        const displayNew = display === 'block' ? 'none' : 'block';
        $notice.style.display = displayNew;
    }

    setVideo() {
        let videoSrcTemp = 'https://www.youtube.com/embed/qbIP1TEX33Q';
        if (document.cookie.includes('zh-CN')) {
            videoSrcTemp = 'https://v.qq.com/iframe/player.html?vid=v08049tau4n';
            if (window.navigator.userAgent.toLowerCase().indexOf('chrome') === -1) {
                videoSrcTemp = 'https://dwz.cn/ZMnoq3eH';
            }
        }
        this.VideoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(videoSrcTemp);
        const vedioWidth = parseInt($('#player').css('width'), 10);
        const vedioHeight = (vedioWidth / 16) * 9;
        $('#player').css('height', vedioHeight + 'px');
        // this.VideoSrc = this.VideoSrc.bypassSecurityTrustResourceUrl(url);
    }

    @HostListener('window:scroll', ['$event'])
    @HostListener('window:resize') onresize() {
        const vedioHeight = $('.vedio-size').find('.ptl22-box').css('height');
        setTimeout(() => {
        $('#player').css('height', vedioHeight);
        }, 200);
    }
}
