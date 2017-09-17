import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {CookieService} from 'ngx-cookie';
import {LanguageService} from './shared/language.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public currentLanguage = 'English';
  languagesDic: any;
  constructor( private language: LanguageService, private _cookieService: CookieService ) {
  }
  ngOnInit() {
    this.language.getLanguageConfig().subscribe(data => {
      this.languagesDic = data['languagesDic'];
      this.currentLanguage = data['languagesDic2'][this.language.getBrowserCultureLanguage()];
      if (this._cookieService.get('SelectedLanguage') !== undefined) {
        this.currentLanguage = data['languagesDic2'][this._cookieService.get('SelectedLanguage')];
        // console.log('---------Header Component----------' + data['languagesDic2'][this._cookieService.get('SelectedLanguage')]);
        // this.language.switchLanguage(this._cookieService.get('SelectedLanguage'));
      }
    });
  }
  changeLanguage(language: string) {
    console.log('---------Header Component----------' + this.language);
    this.currentLanguage = language;
  }
}
