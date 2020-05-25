import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NewsService {
  // en-US, zh-CN
  constructor(private http: HttpClient) {}

  getHotNews(currentLang: string): Observable<any> {
    return this.http.get(`/api/hot-news?_limit=6&_sort=id%3ADESC&lang=${currentLang}&open=true`);
  }
}
