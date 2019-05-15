/**
 * @file app.component.ts
 * @author zhouminghui
 * @description 要写一些处理不同组件关系的逻辑。。。
*/

import {Component} from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    constructor() {
      setTheme('bs4');
    }
}
