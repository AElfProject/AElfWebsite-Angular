/**
 * @file app.nav.component
 * @author zhouminghui
 * @description 全网公用导航
*/

import {Component, AfterViewInit, OnInit, Output, EventEmitter, HostListener} from '@angular/core';
import { FontFamliyService } from '../../shared/font-famliy.service';
import { CookieService } from 'ngx-cookie';
import { LanguageService } from '../../shared/language.service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { WindowService } from '../../shared/window.service';

declare let $: any;

@Component({
    selector: 'app-nav',
    templateUrl: './app.nav.component.html',
    styleUrls: ['./app.nav.component.css']
})

export class AppNavComponent implements OnInit, AfterViewInit {
    public headerActiveCssClass = '';
    public deviceWidth = window.innerWidth || document.documentElement.clientWidth;
    public config: PerfectScrollbarConfigInterface = {};
    public currentLanguage = '';
    public languagesDic: any;
    public pathName: any;
    public languageList = ['', ''];
    // public menuList: any[] = ['/', '/developer', '/application', '/node', '/community', '/proclamation'];
    public menuList: any[] = ['/', '/developer', '/application', '/community', '/proclamation'];
    public mobileMenuHide = true;
    public hide: boolean;
    public linkHref = '/';

    constructor(private _languageService: LanguageService,
        private _cookieService: CookieService,
        public _fontFamlily: FontFamliyService,
        private _windowRef: WindowService
    ) {}

    ngOnInit() {
        this.hide = true;
        this._languageService
        .getLanguageConfig()
        .subscribe(data => {
            this.languagesDic = data['languagesDic1'];
            this.languageList = data['languageOptions'];
            this.currentLanguage =
                data['languagesDic2'][
                this._languageService.getWebPageCurrentLanguage()
                ];
            this._fontFamlily.changeFontFamily(
                this.currentLanguage
            );
            this._cookieService.put('SelectedLanguage', this.languagesDic[this.currentLanguage]);
        });
        this.pathName = location.pathname;
        this.menuList.map((item, index) => {
            if (this.pathName === item) {
                $('.clearfix li').eq(index).addClass('active').siblings().removeClass('active');
            }
        });

        if (this.deviceWidth > 1280) {
            this.mobileMenuHide = false;
        }

        if (this.pathName === '/') {
            this.linkHref = 'javascript:void(0);';
        }
    }




    ngAfterViewInit() {
        const perfectScrollbarContainer = $('.perfect-scrollbar-container');
        perfectScrollbarContainer.find('.ps__scrollbar-y-rail').css({ 'border-radius': '6px' });
        perfectScrollbarContainer.find('.ps__scrollbar-y-rail').css('cssText', 'width: 7px !important');
        perfectScrollbarContainer.find('.ps__scrollbar-y-rail').css({ 'background-color': 'rgba(255, 255, 255, 0.1)' });
        perfectScrollbarContainer.find('.ps__scrollbar-y-rail').css({ 'background-color': 'rgba(255, 255, 255, 0.1)' });
        perfectScrollbarContainer.find('.ps__scrollbar-y-rail').css({ 'opacity': 0.6 });
    }

    OnChange(languageSelection: string) {
        console.log('---------switch _languageService----------' + languageSelection);
        this._languageService.switchLanguage(this.languagesDic[languageSelection]);
        this.currentLanguage = languageSelection;
        this._fontFamlily.changeFontFamily(this.currentLanguage);
        this._cookieService.put('SelectedLanguage', this.languagesDic[languageSelection]);
    }

    showMenu() {
        if (this.deviceWidth > 1280) {
            if (this.pathName === '/') {
                this.hide = false;
                this.linkHref = 'javascript:void(0);';
            } else {
                this.linkHref = '/';
            }
        }
    }

    hideMenu() {
        this.hide = true;
    }

    mobileMenuClick() {
        this.mobileMenuHide = !this.mobileMenuHide;
    }

    @HostListener('window:resize') onresize() {
        this.deviceWidth = window.innerWidth || document.documentElement.clientWidth;
        if (this.deviceWidth > 1280) {
            this.mobileMenuHide = false;
        } else {
            this.mobileMenuHide = true;
        }
    }

    // nav bar change color when the scroll event happens.
    scrollTop(event) {
        // console.log('Scroll Event', window.pageYOffset );
        // console.log('class name: ', $('#dropdown-pagination-menu').attr('class') );
        if (this._windowRef.nativeWindow.pageYOffset !== 0 && !($('#dropdown-pagination-menu').hasClass('active'))) {
            this.headerActiveCssClass = 'active-header';
        } else {
            this.headerActiveCssClass = '';
        }
        // console.log('headerActiveCssClass: ', this.headerActiveCssClass);
    }
    // add or delete active class for html header element when click menu button.
    menuClick() {
        $(window).scrollTop(0);
        this.pathName = location.pathname;
        if (this.pathName !== '/' && this.deviceWidth < 1280) {
            this.mobileMenuHide = true;
        }

    //    const pathIndex = this.menuList.indexOf(this.pathName, 0);

        this.menuList.map((item, index) => {
            if (this.pathName === item) {
                if (this.pathName === '/') {
                    this.hide = !this.hide;
                } else {
                    this.linkHref = '/';
                }
                $('.clearfix li').eq(index).addClass('active').siblings().removeClass('active');
            }
        });

        // console.log(pathIndex);
    }

    bindActive(event) {
        $(event).addClass('active').siblings().removeClass('active');
    }
}
