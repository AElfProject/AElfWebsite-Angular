import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DevCaseService {
  // en-US, zh-CN
  constructor(private http: HttpClient) { }

  getDevCase(currentLang: string): Observable<any> {
    return this.http.get(`/api/dev-cases?_limit=20&_sort=id%3ADESC&lang=${currentLang}&open=true`);
  }
}
