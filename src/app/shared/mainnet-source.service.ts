import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class MainnetSourceService {
  constructor(private http: HttpClient) {}
  getMainnetSource(type:"tdvv-explorer" | "explorer"): Observable<any> {
    // return this.http.get(`https://explorer.aelf.io/api/chain-info`);
    return this.http.get(`/${type}/api/chain-info`);
  }

  getTPMSource(endTime: number, type:"tdvv-explorer" | "explorer"): Observable<any> {
    const startTime = endTime  - 5 * 60 * 1000;
    // return this.http.get(
    //   `https://explorer.aelf.io/api/tps/all?start=${startTime}&end=${endTime}&interval=60000`
    // );
    return this.http.get(
      `/${type}/api/tps/all?start=${startTime}&end=${endTime}&interval=60000`
    );
  }

  getMainnetEcosystem(currentLang: string):Observable<any>{
    return this.http.get(`/api/mainnets?_limit=20&open=true&lang=${currentLang}&_sort=order`)
  }
}

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import { Http } from '@angular/http';

// @Injectable()
// export class ConnectInfoService {
//   // en-US, zh-CN
//   constructor(private http: HttpClient) { }

//   getConnectInfo(): Observable<any> {
//     return this.http.get(`/api/connect-infos?_limit=20&open=true`);
//   }
// }
