/**
 * @fiel app.home.developmentRoadmap
 * @author zhouminghui
 * @description 开发路线图
*/

import {Component, AfterViewChecked, OnInit} from '@angular/core';
import { FontFamliyService } from '../../../../shared/font-famliy.service';
import { CookieService } from 'ngx-cookie';
import { LanguageService } from '../../../../shared/language.service';
@Component({
    selector: 'app-home-development-roadmap',
    templateUrl: './app.home.developmentRoadmap.html',
    styleUrls: ['./app.home.developmentRoadmap.css']
})

export class HomeDevelopmentRoadmapComponent implements AfterViewChecked, OnInit {
    public currentLanguage: any;
    public languagesDic: any;

    constructor(
        private _languageService: LanguageService,
        private _cookieService: CookieService,
        public _fontFamlily: FontFamliyService
    ) {}

    ngOnInit(): void {
        this._languageService
        .getLanguageConfig()
        .subscribe(data => {
            this.currentLanguage =
                data['languagesDic2'][
                this._languageService.getWebPageCurrentLanguage()
                ];
            if (this.currentLanguage === '中文') {
                this.currentLanguage = 'zh-CN';
            } else {
                this.currentLanguage = 'en-US';
            }
        });
    }

    ngAfterViewChecked() {
        // ERROR Error: ExpressionChangedAfterItHasBeenCheckedError: xxxxxxxxx
        // 这里需要注意的是，变更检测和验证摘要是同步执行的，这意味着如果我们异步更新属性
        // 当验证循环正在运行中时，属性值不会变化更新，应用也就不会抛出错误了。
        // https://www.cnblogs.com/xudengwei/p/9214959.html
        if (this._cookieService.get('SelectedLanguage')) {
            if (this.currentLanguage !== this._cookieService.get('SelectedLanguage')) {
                setTimeout(() => {
                    if (this._cookieService.get('SelectedLanguage') === 'zh-CN') {
                        this.currentLanguage = 'zh-CN';
                    } else {
                        this.currentLanguage = 'en-US';
                    }
                });
            }
        }
    }
}
