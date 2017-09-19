import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs/Observable';
import {CookieService} from 'ngx-cookie';

@Injectable()
export class LanguageService {

  constructor(private http: HttpClient, private translate: TranslateService, private _cookieService: CookieService) {
    this.http.get('assets/i18n/language-config.json').subscribe(data => {
        const browserCultureLang = this.getBrowserCultureLanguage();
        translate.addLangs(data['languages']);
        translate.setDefaultLang(data['defaultLanguage']);
        if (browserCultureLang === undefined) {
          translate.use(data['initLanguage']);
        } else {
          translate.use(browserCultureLang);
        }
        if (this._cookieService.get('SelectedLanguage') !== undefined) {
          translate.use(this._cookieService.get('SelectedLanguage'));
        }
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
    return this.translate.getBrowserCultureLang();
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
