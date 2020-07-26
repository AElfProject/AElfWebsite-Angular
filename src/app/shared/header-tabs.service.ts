import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HeaderTabsService {
  // en-US, zh-CN
  constructor(private http: HttpClient) { }

  getHiddenTabs(): Observable<any> {
    return this.http.get(`api/header-tab-hiddens?_limit=1&open=true`);
  }
}
