import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs/Observable';
import {CookieService} from 'ngx-cookie';
import {WindowService} from './window.service';

@Injectable()
export class LanguageService {
  // en-US, zh-CN
  private webPageCurrentLanguage = '';
  constructor(private http: HttpClient,
              private translate: TranslateService,
              private _cookieService: CookieService,
              private _windowRef: WindowService) {
    this.http.get('assets/i18n/language-config.json').subscribe(data => {
        // add translated files(languages), the values of added array elements are the names of translated files.
        this.translate.addLangs(data['languages']);
        // set the default translated file
        this.translate.setDefaultLang(data['defaultLanguage']);
        // set language from browser language, init language and cookie language.--start
        let pendingLanguage = '';
        const browserCultureLang = this.getBrowserCultureLanguage();
        console.log('browserCultureLang', browserCultureLang);
        const initLanguage = data['initLanguage'];
        const cookieLanguage = this._cookieService.get('SelectedLanguage');
        if (cookieLanguage !== undefined) {
          pendingLanguage = cookieLanguage;
        } else if (browserCultureLang !== undefined) {
          // if the language of browser is not in data['initLanguage'], use the initLanguage.
          if (this.findLauguage(browserCultureLang, data['languages'])) {
            pendingLanguage = browserCultureLang;
          } else {
            pendingLanguage = initLanguage;
          }
        } else {
          pendingLanguage = initLanguage;
        }
        this.translate.use(pendingLanguage);
        this.webPageCurrentLanguage = pendingLanguage;
        // set language from browser language, init language and cookie language.--end
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      });
  }

  getLanguageConfig(): Observable<any> {
    return this.http.get('assets/i18n/language-config.json');
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
