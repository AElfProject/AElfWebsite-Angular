import {AfterViewChecked, Component, EventEmitter, OnInit, Output} from '@angular/core';
import { LanguageService } from '../language.service';
import * as $ from 'jquery';
import {CookieService} from 'ngx-cookie';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewChecked, OnInit {
  currentLanguage = '';
  languagesDic: any;
  languageList = [];
  @Output() onLanguageChange = new EventEmitter<string>();
  constructor( private language: LanguageService, private _cookieService: CookieService) {
  }

  OnChange(languageSelection: string) {
    console.log('---------switch language----------' + languageSelection);
    this.language.switchLanguage(this.languagesDic[languageSelection]);
    this.currentLanguage = languageSelection;
    this.onLanguageChange.emit(languageSelection);
    this._cookieService.put('SelectedLanguage', this.languagesDic[languageSelection]);
  }
  ngOnInit() {
    this.language.getLanguageConfig().subscribe(data => {
      this.languagesDic = data['languagesDic'];
      this.languageList = data['languageOptions'];
      this.currentLanguage = data['languagesDic2'][this.language.getBrowserCultureLanguage()];
      if (this._cookieService.get('SelectedLanguage') !== undefined) {
          this.currentLanguage = data['languagesDic2'][this._cookieService.get('SelectedLanguage')];
          // console.log('---------Header Component----------' + data['languagesDic2'][this._cookieService.get('SelectedLanguage')]);
          // this.language.switchLanguage(this._cookieService.get('SelectedLanguage'));
      }
    });
  }
  ngAfterViewChecked() {
  }
}
