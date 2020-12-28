import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class MainnetStageService {

constructor(private http: HttpClient) { }
  getMainnetStage(page:string, currentLang?: string): Observable<any> {
    const baseUrl = `/api/mainnet-stages?_limit=20&open=true&page=${page}&_sort=id%3ADESC`;

    return this.http.get(currentLang ? baseUrl + `&lang=${currentLang}` : baseUrl);
  }
}
