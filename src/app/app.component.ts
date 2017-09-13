import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {CookieService} from 'ngx-cookie';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor( private tranlate: TranslateService, private _cookieService: CookieService ) {
  }
}
