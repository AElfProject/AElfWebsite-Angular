import { AfterViewChecked, Component } from '@angular/core';
import { LanguageService } from '../language.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewChecked {
  constructor( private language: LanguageService ) {
  }

  OnChange(languageSelection: string) {
    this.language.switchLanguage(languageSelection);
  }
  ngAfterViewChecked() {
  }
}
