/**
 * @file app.community.page.ts
 * @author zhouminghui
 * @description 社区页面
*/

import {Component, AfterViewChecked, OnInit} from '@angular/core';
import { FontFamliyService } from '../../shared/font-famliy.service';
import { CookieService } from 'ngx-cookie';
import { LanguageService } from '../../shared/language.service';

declare let $: any;

@Component({
    selector: 'app-community',
    templateUrl: './app.community.page.html',
    styleUrls: ['./app.community.page.css']
})

export class CommunityPageComponent implements AfterViewChecked, OnInit {
    public currentLanguage: any;
    public languagesDic: any;
    constructor(
        private _languageService: LanguageService,
        private _cookieService: CookieService,
        public _fontFamlily: FontFamliyService
    ) {}


    ngOnInit() {
        this.currentLanguage = navigator.language;
        if (this.currentLanguage === 'zh-CN') {
            $('.co-wechat').addClass('active').siblings().removeClass('active');
        } else {
            $('.co-twitter').addClass('active').siblings().removeClass('active');
        }
    }

    removeClass(e) {
        $('.co').removeClass('active');
        if (e) {
            $('.qrcode').show();
        } else {
            $('.qrcode').hide();
        }
    }

    hideQrcode() {
        $('.qrcode').hide();
    }

    ngAfterViewChecked() {
        // ERROR Error: ExpressionChangedAfterItHasBeenCheckedError: xxxxxxxxx
        // 这里需要注意的是，变更检测和验证摘要是同步执行的，这意味着如果我们异步更新属性
        // 当验证循环正在运行中时，属性值不会变化更新，应用也就不会抛出错误了。
        // https://www.cnblogs.com/xudengwei/p/9214959.html
        if (this._cookieService.get('SelectedLanguage')) {
            if (this.currentLanguage !== this._cookieService.get('SelectedLanguage')) {
                this.currentLanguage = this._cookieService.get('SelectedLanguage');
                setTimeout(() => {
                    if (this._cookieService.get('SelectedLanguage') === 'zh-CN') {
                        $('.co-wechat').addClass('active').siblings().removeClass('active');
                    } else {
                        $('.co-twitter').addClass('active').siblings().removeClass('active');
                    }
                });
            }
        }
    }
}
