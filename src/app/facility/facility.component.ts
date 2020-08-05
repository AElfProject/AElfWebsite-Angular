import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { LanguageService } from '../shared/language.service';
import { TranslateService } from '@ngx-translate/core';
import { FontFamliyService } from '../shared/font-famliy.service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { WindowService } from '../shared/window.service';
import { PapersService } from '../shared/papers.service';
import { ConnectInfoService } from '../shared/connectInfo.service';
import { DomSanitizer } from '@angular/platform-browser';

import { Router } from '@angular/router';

declare let $: any;

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.css']
})
export class FacilityComponent implements OnInit, AfterViewInit {
  public headerActiveCssClass = '';
  public config: PerfectScrollbarConfigInterface = {};
  public currentLanguage = '';
  public languagesDic: any;
  public languagesDic2: any;
  public languageList = ['', ''];
  private onePage = {};
  public currentOnePage = '';
  public VideoSrc: any;
  public connectInfo = {
    qq: '',
    wechat: '',
    telegram: ''
  };
  constructor(private _languageService: LanguageService,
              private _cookieService: CookieService,
              public _fontFamlily: FontFamliyService,
              private _translateService: TranslateService,
              private _papersService: PapersService,
              private _windowRef: WindowService,
              private _connectInfoService: ConnectInfoService,
              private sanitizer: DomSanitizer,
              public router: Router) {
  }

  ngOnInit() {
    const languageConfig = this._languageService.getLanguageConfig()
    this.languagesDic = languageConfig["languagesDic1"];
    this.languagesDic2 = languageConfig["languagesDic2"];
    this.languageList = languageConfig["languageOptions"];
    this.currentLanguage =
      languageConfig["languagesDic2"][
        this._languageService.getWebPageCurrentLanguage()
        ];
    this._fontFamlily.changeFontFamily(
      this.currentLanguage
    );
    this.router.events
      .subscribe((event) => {
        $(window).scrollTop(0);
      });

      this._translateService.onLangChange.subscribe(data => {
        this.OnChange(this.languagesDic2[data.lang] || 'English');
      });

    this.getOnePages();

    this._connectInfoService
      .getConnectInfo()
      .subscribe(data => this.connectInfo = data[0]);
  }
  ngAfterViewInit() {
    const perfectScrollbarContainer = $('.perfect-scrollbar-container');
    perfectScrollbarContainer.find('.ps__scrollbar-y-rail').css({ 'border-radius': '6px' });
    perfectScrollbarContainer.find('.ps__scrollbar-y-rail').css('cssText', 'width: 7px !important');
    perfectScrollbarContainer.find('.ps__scrollbar-y-rail').css({ 'background-color': 'rgba(255, 255, 255, 0.1)' });
    perfectScrollbarContainer.find('.ps__scrollbar-y-rail').css({ 'background-color': 'rgba(255, 255, 255, 0.1)' });
    perfectScrollbarContainer.find('.ps__scrollbar-y-rail').css({ 'opacity': 0.6 });

    setTimeout(() => {
      this._windowRef.nativeWindow.loadingClose();
    }, 500)
  }
  toggleNotice(id) {
    const $notice = document.getElementById(id);
    const display = $notice.style.display;

    const $container = $('.aelf-notice-text');
    $container.css({ 'display': 'none' });

    const displayNew = display === 'block' ? 'none' : 'block';
    $notice.style.display = displayNew;
  }

  getOnePages() {
    this._papersService.getPapers('onepage').subscribe(data => {
      data.forEach((paper: any) => {
        this.onePage[paper.lang] = paper;
      });
      this.setOnePages();
    });
  }
  setOnePages() {
    const currentOnePage = this.onePage[this.currentLanguage];
    const EnglishPaper = this.onePage['English'] || { url: '' };
    this.currentOnePage = currentOnePage ? currentOnePage.url : EnglishPaper.url;
  }

  OnChange(languageSelection: string) {
    this._languageService.switchLanguage(this.languagesDic[languageSelection]);
    this.currentLanguage = languageSelection;
    this._fontFamlily.changeFontFamily(this.currentLanguage);
    this._cookieService.put('SelectedLanguage', this.languagesDic[languageSelection]);
    this.setOnePages();
  }

  // nav bar change color when the scroll event happens.
  @HostListener('window:scroll', ['$event'])
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
    if (this.headerActiveCssClass !== '' && !($('#dropdown-pagination-menu').hasClass('active'))) {
      this.headerActiveCssClass = '';
    } else if (this.headerActiveCssClass === '' && $('#dropdown-pagination-menu').hasClass('active') && (this._windowRef.nativeWindow.pageYOffset !== 0)) {
      this.headerActiveCssClass = 'active-header';
    }
  }

  // @HostListener('window:resize') onresize() {
  //   const vedioHeight = $('.vedio-size').find('.ptl22-box').css('height');
  //   setTimeout(() => {
  //     $('#player').css('height', vedioHeight);
  //   }, 200);
  // }

}
$('body').on('click', '.lang-menu span', function(e){
  e.stopPropagation();
  $('.lang-menu').addClass('active2');
});

$('body').on('click', '.tool-menu span', function(e){
  e.stopPropagation();
  $('.tool-menu').addClass('active2');
});

$('body').on('click', '.meenu-btn1,.meenu-btn2,.meenu-btn3', function(e){
  e.stopPropagation();
  $('.meenu-btn').removeClass('active2');
  $(this).addClass('active2');
});

$('body').bind('click', function(){
  $('.meenu-btn').removeClass('active2');
});
