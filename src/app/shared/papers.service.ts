import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PapersService {
  // en-US, zh-CN
  constructor(private http: HttpClient) { }

  getPapers(type: string): Observable<any> {
    return this.http.get(`/api/papers?_limit=20&open=true&type=${type}`);
  }
}
