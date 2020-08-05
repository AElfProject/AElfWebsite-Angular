import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs/Observable';
import {CookieService} from 'ngx-cookie';
import {WindowService} from './window.service';
import languageConfig from '../../assets/i18n/language-config';

@Injectable()
export class LanguageService {
  // en-US, zh-CN
  private webPageCurrentLanguage = '';
  constructor(private http: HttpClient,
              private translate: TranslateService,
              private _cookieService: CookieService,
              private _windowRef: WindowService) {
    this.translate.addLangs(languageConfig['languages']);
    // set the default translated file
    this.translate.setDefaultLang(languageConfig['defaultLanguage']);
    // set language from browser language, init language and cookie language.--start
    let pendingLanguage = '';
    const browserCultureLang = this.getBrowserCultureLanguage();
    console.log('browserCultureLang', browserCultureLang);
    const initLanguage = languageConfig['initLanguage'];
    const cookieLanguage = this._cookieService.get('SelectedLanguage');
    if (cookieLanguage !== undefined) {
      pendingLanguage = cookieLanguage;
    } else if (browserCultureLang !== undefined) {
      // if the language of browser is not in languageConfig['initLanguage'], use the initLanguage.
      if (this.findLauguage(browserCultureLang, languageConfig['languages'])) {
        pendingLanguage = browserCultureLang;
      } else {
        pendingLanguage = initLanguage;
      }
    } else {
      pendingLanguage = initLanguage;
    }
    this.translate.use(pendingLanguage);
    this.webPageCurrentLanguage = pendingLanguage;
  }

  getLanguageConfig(): object {
    return languageConfig;
  }

  getBrowserCultureLanguage(): string {
    return this._windowRef.nativeWindow.navigator.language;
  }

  getWebPageCurrentLanguage(): string {
    while (this.webPageCurrentLanguage === '') {}
    return this.webPageCurrentLanguage;
  }

  switchLanguage(language: string) {
    this.webPageCurrentLanguage = language;
    this.translate.use(language);
  }
  private findLauguage(language: string, languages: Array<string>): boolean {
    for (const item of languages) {
      if (language === item) {
        return true;
      }
    }
    return false;
  }
}
