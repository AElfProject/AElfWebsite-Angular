import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SwiperService {
  // en-US, zh-CN
  constructor(private http: HttpClient) { }

  getSwipers(currentLang: string, type: string): Observable<any> {
    return this.http.get(`api/swipers?_limit=3&open=true&type=${type}&open=true&lang=${currentLang}&_sort=id%3ADESC`);
  }
}
