import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
 
@Injectable()
export class ConnectInfoService {
  // en-US, zh-CN
  constructor(private http: HttpClient) { }

  getConnectInfo(): Observable<any> {
    return this.http.get(`/api/connect-infos?_limit=20&open=true`);
  }
}
