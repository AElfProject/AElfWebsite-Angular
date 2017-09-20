import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CookieService} from 'ngx-cookie';
import {LanguageService} from './shared/language.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  currentLanguage = '';
  languagesDic: any;
  languageList = [];
  
  constructor( private language: LanguageService, private _cookieService: CookieService) {
  }

  OnChange(languageSelection: string) {
    console.log('---------switch language----------' + languageSelection);
    this.language.switchLanguage(this.languagesDic[languageSelection]);
    this.currentLanguage = languageSelection;
    this._cookieService.put('SelectedLanguage', this.languagesDic[languageSelection]);
  }
  ngOnInit() {
    this.language.getLanguageConfig().subscribe(data => {
      this.languagesDic = data['languagesDic'];
      this.languageList = data['languageOptions'];
      this.currentLanguage = data['languagesDic2'][this.language.getBrowserCultureLanguage()];
      if (this._cookieService.get('SelectedLanguage') !== undefined) {
        this.currentLanguage = data['languagesDic2'][this._cookieService.get('SelectedLanguage')];
        // console.log('---------Header Component----------' + data['languagesDic2'][this._cookieService.get('SelectedLanguage')]);
        // this.language.switchLanguage(this._cookieService.get('SelectedLanguage'));
      }
    });
  }
}
