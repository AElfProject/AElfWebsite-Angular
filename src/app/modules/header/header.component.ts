import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { LanguageService } from '../../shared/language.service';
import { FontFamliyService } from '../../shared/font-famliy.service';
import { PapersService } from '../../shared/papers.service';
import { HeaderTabsService } from '../../shared/header-tabs.service';
import { Router } from '@angular/router';

declare let $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public languageList = ['', ''];
  public languagesDic: any;
  public currentLanguage = '';
  public currentEconomicPaper = '';
  private economicPapers = {};
  public currentWhitePaper = '';
  public currentLandscape = '';
  private whitePapers = {};
  public pathname = '';
  public hiddenTabs = '';
  constructor(
    private _languageService: LanguageService,
    private _headerTabsService: HeaderTabsService,
    public _fontFamlily: FontFamliyService,
    public router: Router,
    private _cookieService: CookieService,
    private _papersService: PapersService,
  ) { }

  ngOnInit() {
    this.getHiddenTabs();
    this.setMenu();
    const data = this._languageService
      .getLanguageConfig();
      // .subscribe(data => {
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
            $(window).scrollTop(0);
          });

        this.getEconomicPapers();
        this.getWhitepapers();
        this.setLandscape();
      // });
  }

  setMenu() {
    this.pathname = window.location.pathname;
  }

  getEconomicPapers() {
    this._papersService.getPapers('economic').subscribe(data => {
      data.forEach((paper: any) => {
        this.economicPapers[paper.lang] = paper;
      });
      this.setEconomicPapers();
    });
  }
  setEconomicPapers() {
    const currentLanguagePaper = this.economicPapers[this.currentLanguage];
    const EnglishPaper = this.economicPapers['English'] || { url: '' };
    this.currentEconomicPaper = currentLanguagePaper ? currentLanguagePaper.url : EnglishPaper.url;
  }

  setLandscape() {
    this.currentLandscape = this.currentLanguage === 'English'
      ? 'https://docs.qq.com/slide/DUG90T0RPWWhQR1JD' : 'https://docs.qq.com/slide/DUFJGcHZGdXhvb3pp';
  }

  getWhitepapers() {
    this._papersService.getPapers('whitepaper').subscribe(data => {
      data.forEach((paper: any) => {
        this.whitePapers[paper.lang] = paper;
      });
      this.setWhitepapers();
    });
  }
  setWhitepapers() {
    const currentWhitePaper = this.whitePapers[this.currentLanguage];
    const EnglishPaper = this.whitePapers['English'] || { url: '' };
    this.currentWhitePaper = currentWhitePaper ? currentWhitePaper.url : EnglishPaper.url;
  }

  getHiddenTabs() {
    this._headerTabsService.getHiddenTabs().subscribe(data => {
      console.log('data: ', data[0]);
      if (data && data[0]) {
        this.hiddenTabs = data[0].tabToHidden
      }
    });
  }

  OnChange(languageSelection: string) {
    this._languageService.switchLanguage(this.languagesDic[languageSelection]);
    this.currentLanguage = languageSelection;
    this._fontFamlily.changeFontFamily(this.currentLanguage);
    this._cookieService.put('SelectedLanguage', this.languagesDic[languageSelection]);
    this.setEconomicPapers();
    this.setWhitepapers();
    this.setLandscape();
  }
}
