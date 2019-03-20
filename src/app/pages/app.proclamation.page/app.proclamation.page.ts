/**
 * @file app.proclamation.page.ts
 * @author zhouminghui
*/

import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-proclamation',
    templateUrl: './app.proclamation.page.html',
    styleUrls: ['./app.proclamation.page.css']
})

export class ProclamationPageComponent implements OnInit {

    ngOnInit() {
        console.log('公告页');
    }
}
