import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CookieService} from 'ngx-cookie';
import {LanguageService} from './shared/language.service';
import {FontFamliyService} from './shared/font-famliy.service';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  currentLanguage = '';
  languagesDic: any;
  languageList = [];
  ffArial = '';
  ffCg = '';
  ffCgb = '';
  ffDbb = '';
  ffHnlt = '';
  ffMy = '';
  ffSs = '';
  ffTnri = '';
  constructor( private language: LanguageService, private _cookieService: CookieService, private _fontFamlily: FontFamliyService) {
  }

  OnChange(languageSelection: string) {
    console.log('---------switch language----------' + languageSelection);
    this.language.switchLanguage(this.languagesDic[languageSelection]);
    this.currentLanguage = languageSelection;
    this.ffArial = this._fontFamlily.getFontFamily(this.currentLanguage, 'ff-arial');
    this.ffCg = this._fontFamlily.getFontFamily(this.currentLanguage, 'ff-cg');
    this.ffCgb = this._fontFamlily.getFontFamily(this.currentLanguage, 'ff-cgb');
    this.ffDbb = this._fontFamlily.getFontFamily(this.currentLanguage, 'ff-dbb');
    this.ffHnlt = this._fontFamlily.getFontFamily(this.currentLanguage, 'ff-hnlt');
    this.ffMy = this._fontFamlily.getFontFamily(this.currentLanguage, 'ff-my');
    this.ffSs = this._fontFamlily.getFontFamily(this.currentLanguage, 'ff-ss');
    this.ffTnri = this._fontFamlily.getFontFamily(this.currentLanguage, 'ff-tnri');
    this._cookieService.put('SelectedLanguage', this.languagesDic[languageSelection]);
  }
  ngOnInit() {
    this.language.getLanguageConfig().subscribe(data => {
      this.languagesDic = data['languagesDic'];
      this.languageList = data['languageOptions'];
      this.currentLanguage = data['languagesDic2'][this.language.getBrowserCultureLanguage()];

      if (this._cookieService.get('SelectedLanguage') !== undefined) {
        this.currentLanguage = data['languagesDic2'][this._cookieService.get('SelectedLanguage')];
      }
      this.ffArial = this._fontFamlily.getFontFamily(this.currentLanguage, 'ff-arial');
      this.ffCg = this._fontFamlily.getFontFamily(this.currentLanguage, 'ff-cg');
      this.ffCgb = this._fontFamlily.getFontFamily(this.currentLanguage, 'ff-cgb');
      this.ffDbb = this._fontFamlily.getFontFamily(this.currentLanguage, 'ff-dbb');
      this.ffHnlt = this._fontFamlily.getFontFamily(this.currentLanguage, 'ff-hnlt');
      this.ffMy = this._fontFamlily.getFontFamily(this.currentLanguage, 'ff-my');
      this.ffSs = this._fontFamlily.getFontFamily(this.currentLanguage, 'ff-ss');
      this.ffTnri = this._fontFamlily.getFontFamily(this.currentLanguage, 'ff-tnri');
    });
  }
}
