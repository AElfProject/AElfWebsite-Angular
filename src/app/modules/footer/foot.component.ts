import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../shared/language.service';
import { FontFamliyService } from '../../shared/font-famliy.service';
import { PapersService } from '../../shared/papers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './foot.component.html',
  styleUrls: ['./foot.component.css']
})
export class Footer implements OnInit {

  public languageList = ['', ''];
  public languagesDic: any;
  public languagesDic2: any;
  public currentLanguage = '';
  public currentEconomicPaper = '';
  private economicPapers = {};
  public currentWhitePaper = '';
  private whitePapers = {};
  constructor(
    private _languageService: LanguageService,
    public _fontFamlily: FontFamliyService,
    public router: Router,
    private _papersService: PapersService,
    private _translateService: TranslateService,
  ) { }

  ngOnInit() {
    console.log('nginit')
    this._languageService
      .getLanguageConfig()
      .subscribe(data => {
        this.languagesDic = data["languagesDic1"];
        this.languagesDic2 = data['languagesDic2']
        this.languageList = data["languageOptions"];
        this.currentLanguage =
          this.languagesDic2[
            this._languageService.getWebPageCurrentLanguage()
          ];
        this._fontFamlily.changeFontFamily(
          this.currentLanguage
        );

        this.getEconomicPapers();
        this.getWhitepapers();
      });

      this._translateService.onLangChange.subscribe(data => {
        this.handleLangChange(this.languagesDic2[data.lang] || 'English');
      });
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

  handleLangChange(data) {
    this.currentLanguage = data;
    this.setEconomicPapers();
    this.setWhitepapers();
  }
}
