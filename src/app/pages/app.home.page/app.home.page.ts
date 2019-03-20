/**
 * @file app.home.page
 * @author zhouminghui
*/

import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { LanguageService } from '../../shared/language.service';
import { FontFamliyService } from '../../shared/font-famliy.service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { WindowService } from '../../shared/window.service';
import { DomSanitizer } from '@angular/platform-browser';

declare let $: any;

@Component({
  selector: 'app-home',
  templateUrl: './app.home.page.html',
  styleUrls: ['./app.home.page.css']
})

export class AppHomepageComponent implements OnInit, AfterViewInit {
    public headerActiveCssClass = '';
    public config: PerfectScrollbarConfigInterface = {};

    public currentLanguage = '';
    public languagesDic: any;
    public languageList = ['', ''];
    public VideoSrc: any;
    constructor(
        public _fontFamlily: FontFamliyService,
        private sanitizer: DomSanitizer
    ) {}

    ngOnInit() {
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
