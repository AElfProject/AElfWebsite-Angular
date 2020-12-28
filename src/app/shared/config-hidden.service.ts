import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ConfigHiddenService {

constructor(private http: HttpClient) { }
  getConfigHidden(language:string, page:string): Observable<any>{
    return this.http.get(`/api/config-hiddens?lang=${language}&page=${page}&hidden=true`)
  }
}
