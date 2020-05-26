import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { LanguageService } from '../../shared/language.service';
import { FontFamliyService } from '../../shared/font-famliy.service';
import { Router } from '@angular/router';

declare let $: any;

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.css']
})
export class MobileHeaderComponent implements OnInit {

  public languageList = ['', ''];
  public languagesDic: any;
  public currentLanguage = '';
  public pathname = '';
  constructor(
    private _languageService: LanguageService,
    public _fontFamlily: FontFamliyService,
    public router: Router,
    private _cookieService: CookieService,
  ) { }

  ngOnInit() {
    this.setMenu();
    this._languageService
      .getLanguageConfig()
      .subscribe(data => {
        this.languagesDic = data["languagesDic1"];
        this.languageList = data["languageOptions"];
        this.currentLanguage =
          data["languagesDic2"][
          this._languageService.getWebPageCurrentLanguage()
          ];
        this._fontFamlily.changeFontFamily(
          this.currentLanguage
        );
        this.router.events
          .subscribe((event) => {
            this.setMenu();
            menuToggle();
            $(window).scrollTop(0);
          });
      });
  }

  setMenu() {
    this.pathname = window.location.pathname;
  }

  OnChange(languageSelection: string) {
    this._languageService.switchLanguage(this.languagesDic[languageSelection]);
    this.currentLanguage = languageSelection;
    this._fontFamlily.changeFontFamily(this.currentLanguage);
    this._cookieService.put('SelectedLanguage', this.languagesDic[languageSelection]);
  }
}

function menuToggle() {
  const $this = $('.mobile-menu');
  let is_open = $this.hasClass('menu-open');
  if (is_open) {
    $this.removeClass('menu-open')
    $('.mobile-nav').hide();
  } else {
    $this.addClass('menu-open')
    $('.mobile-nav').show();
  }
}
