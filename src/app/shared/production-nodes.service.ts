import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductionNodesService {
  // en-US, zh-CN
  constructor(private http: HttpClient) { }

  getProductionNodes(currentLang: string, isStart: boolean): Observable<any> {
    return this.http.get(`api/production-nodes?_limit=30&isStart=${isStart}&open=true&lang=${currentLang}&_sort=weight%3ADESC`);
  }
}
