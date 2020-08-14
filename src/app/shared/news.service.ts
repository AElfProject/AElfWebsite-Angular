import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NewsService {
  // en-US, zh-CN
  constructor(private http: HttpClient) {}

  // 4 => en-US  5 => zh-CN
  getHotNews(currentLangType: number): Observable<any> {
    return this.http.get(`/wp-json/wp/v2/posts?categories=${currentLangType}&page=1&per_page=6`);
  }
}
