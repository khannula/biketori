/**
 * Created by Kari on 9.4.2016.
 */

import {bootstrap} from 'angular2/platform/browser';
import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import {IlmoListComponent}   from './ilmolist.component.ts';
import {OstoListComponent}   from './ostolist.component.ts';
import {IlmoDetailComponent}   from './ilmo-detail.component.ts';
// ver1 ei impotattu täällä
import {IlmoService} from './ilmo.service.ts';

@Component({
    selector: 'biketori-app',
    template: '<h1>Biketori</h1>' +
    '<nav>' +
    //<a [routerLink]="['/myydaan']">Myydään</a>' +
        '<a (click)="showSell()">Myydään</a>' +
        '<a (click)="showBuy()">Ostetaan</a>' +
        //'<a [routerLink]="[IlmoList, Ostolist]">Ostetaan...</a>' +
    '</nav>' +
    '<router-outlet></router-outlet>',

    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS, IlmoService]
})

@RouteConfig([
    {path:'/myydaan', name: 'MyyList', component: IlmoListComponent},
    {path:'/ostetaan', name: 'OstoList', component: OstoListComponent}
    // EI kelpaa tuo alla, herjaa router instantion kaikkea...
    //{path:'/myydaan/:id', name: 'MyyDetail', component: IlmoDetailComponent}
])

export class AppComponent {

    constructor(public _router: Router) {

    }
    showSell() {
        console.log('showSell()');
        this._router.navigate(['MyyList']);
    }

    showBuy() {
        console.log('showBuy()');
        this._router.navigate(['OstoList']);
    }

}
bootstrap(AppComponent);

