import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LanguageService {
  constructor(private http: HttpClient, private translate: TranslateService) {
    this.http.get('assets/i18n/language-config.json').subscribe(data => {
        translate.addLangs(data['languages']);
        translate.setDefaultLang(data['defaultLanguage']);
        translate.use(data['initLanguage']);
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

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
