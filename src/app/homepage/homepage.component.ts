import { AfterViewInit, Component, HostListener, OnInit, } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { LanguageService } from '../shared/language.service';
import { SwiperService } from '../shared/swiper.service';
import { ProductionNodesService } from '../shared/production-nodes.service';
import { FontFamliyService } from '../shared/font-famliy.service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { WindowService } from '../shared/window.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ConfigHiddenService } from '../shared/config-hidden.service'

import { Router } from '@angular/router';

declare let $: any;
declare var Swiper:any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit, AfterViewInit {
  public headerActiveCssClass = '';
  public config: PerfectScrollbarConfigInterface = {};
  public currentLanguage = '';
  public languagesDic: any;
  public languagesDic2: any;
  public languageList = ['', ''];
  public VideoSrc: any;
  public swiperList = [{
    "title": "",
    "desc": "",
    "button": "",
    "buttonText": "",
    "leftImg": {
      "url": null
    }
  }];
  public productionNodesList = [];
  private getSwiperRetryCount = 0;
  private getProductionNodesRetryCount = 0;
  public hiddenElementList= {};
  public mainnetRoadmap = [
    {
      node: "monitoring",
      details:['launch-monitoring-content-1','launch-monitoring-content-2','launch-monitoring-content-3']
    },
    {
      node: "swap",
      details: ['launch-swap-content-1','launch-swap-content-2','launch-swap-content-3']
    },
    {
      node:'election',
      details: ['launch-election-content-1','launch-election-content-2']
    },
    {
      node:'improvement',
      details: ['launch-improvement-content-1','launch-improvement-content-2','launch-improvement-content-3']
    },
    {
      node:'stabilization',
      details: ['launch-stabilization-content-1']
    },
  ];
  constructor(
    private _languageService: LanguageService,
    private _swiperSercie: SwiperService,
    private _translateService: TranslateService,
    private _productionNodesService: ProductionNodesService,
    private _cookieService: CookieService,
    public _fontFamlily: FontFamliyService,
    private _windowRef: WindowService,
    private sanitizer: DomSanitizer,
    public router: Router,
    private _configHiddenService: ConfigHiddenService
    ) {
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

    this.getSwiper();
    this.getProductionNodes();
    this._translateService.onLangChange.subscribe(data => {
      this.OnChange(this.languagesDic2[data.lang] || 'English');
    });
    this.getPageHiddenElement(this.currentLanguage);
  }

  ngAfterViewInit() {
    const perfectScrollbarContainer = $('.perfect-scrollbar-container');
    perfectScrollbarContainer.find('.ps__scrollbar-y-rail').css({ 'border-radius': '6px' });
    perfectScrollbarContainer.find('.ps__scrollbar-y-rail').css('cssText', 'width: 7px !important');
    perfectScrollbarContainer.find('.ps__scrollbar-y-rail').css({ 'background-color': 'rgba(255, 255, 255, 0.1)' });
    perfectScrollbarContainer.find('.ps__scrollbar-y-rail').css({ 'background-color': 'rgba(255, 255, 255, 0.1)' });
    perfectScrollbarContainer.find('.ps__scrollbar-y-rail').css({ 'opacity': 0.6 });

    this.closeLoading();
  }

  closeLoading() {
    if (this._windowRef.nativeWindow.loadingClose) {
      this._windowRef.nativeWindow.loadingClose();
    } else {
      setTimeout(() => {
        this.closeLoading();
      }, 1000)
    }
  }

  getSwiper(language?: string) {
    this._swiperSercie.getSwipers(language || this.currentLanguage, 'main').subscribe(data => {
      if (data.length <= 0 && this.getSwiperRetryCount === 0) {
        this.getSwiperRetryCount++;
        this.getSwiper('English');
        return;
      }
      this.getSwiperRetryCount = 0;

      this.swiperList = data;
      setTimeout(() => {
        new Swiper('.swiper-container', {
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          autoplay: {
            delay: 3000,//1秒切换一次
          },
        })
      }, 0);
    });
  }

  getPageHiddenElement(lang:string){
    this._configHiddenService.getConfigHidden(lang, 'homepage').
    subscribe(data=>{
      if (data.length < 1) {
        return
      }
      this.hiddenElementList = data.reduce((origin, value) => {
        origin[value.filed] = value.hidden;
       return origin;
      },{});
    })
  }

  getProductionNodes(language?: string) {
    this._productionNodesService.getProductionNodes(language || this.currentLanguage, true).subscribe(data => {
      if (data.length <= 0 && this.getProductionNodesRetryCount === 0) {
        this.getProductionNodesRetryCount++;
        this.getProductionNodes('English');
        return;
      }
      this.getProductionNodesRetryCount = 0;

      this.productionNodesList = data;
    });
  }

  toggleNotice(id) {
    const $notice = document.getElementById(id);
    const display = $notice.style.display;

    const $container = $('.aelf-notice-text');
    $container.css({ 'display': 'none' });

    const displayNew = display === 'block' ? 'none' : 'block';
    $notice.style.display = displayNew;
  }
  OnChange(languageSelection: string) {
    this._languageService.switchLanguage(this.languagesDic[languageSelection]);
    this.currentLanguage = languageSelection;
    this._fontFamlily.changeFontFamily(this.currentLanguage);
    this._cookieService.put('SelectedLanguage', this.languagesDic[languageSelection]);
    this.getSwiper();
    this.getProductionNodes();
    this.getPageHiddenElement(this.currentLanguage);
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
