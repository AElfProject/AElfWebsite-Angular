import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie';
import {LanguageService} from './shared/language.service';
import {FontFamliyService} from './shared/font-famliy.service';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {WindowService} from './shared/window.service';
declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  public headerActiveCssClass = '';
  public config: PerfectScrollbarConfigInterface = {};

  public currentLanguage = '';
  public languagesDic: any;
  public languageList = ['', ''];
  constructor( private _languageService: LanguageService,
               private _cookieService: CookieService,
               public _fontFamlily: FontFamliyService,
               private _windowRef: WindowService) {
  }
  ngOnInit() {
    this._languageService.getLanguageConfig().subscribe(data => {
      this.languagesDic = data['languagesDic1'];
      this.languageList = data['languageOptions'];
      this.currentLanguage = data['languagesDic2'][this._languageService.getWebPageCurrentLanguage()];
      this._fontFamlily.changeFontFamily(this.currentLanguage);
    });
  }
  ngAfterViewInit() {
    const perfectScrollbarContainer = $('.perfect-scrollbar-container');
    perfectScrollbarContainer.find('.ps__scrollbar-y-rail').css({'border-radius': '6px'});
    perfectScrollbarContainer.find('.ps__scrollbar-y-rail').css('cssText', 'width: 7px !important');
    perfectScrollbarContainer.find('.ps__scrollbar-y-rail').css({'background-color': 'rgba(255, 255, 255, 0.1)'});
    perfectScrollbarContainer.find('.ps__scrollbar-y-rail').css({'background-color': 'rgba(255, 255, 255, 0.1)'});
    perfectScrollbarContainer.find('.ps__scrollbar-y-rail').css({'opacity': 0.6});
  }
  toggleNotice(id) {
    const $notice = document.getElementById(id);
    const display = $notice.style.display;
    const displayNew  = display === 'block' ? 'none' : 'block';
    $notice.style.display = displayNew;
  }
  OnChange(languageSelection: string) {
    console.log('---------switch _languageService----------' + languageSelection);
    this._languageService.switchLanguage(this.languagesDic[languageSelection]);
    this.currentLanguage = languageSelection;
    this._fontFamlily.changeFontFamily(this.currentLanguage);
    this._cookieService.put('SelectedLanguage', this.languagesDic[languageSelection]);
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
}
