/**
 * Created by Kari on 10.4.2016.
 */

import {Component, OnInit} from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import {IlmoService} from './ilmo.service.ts';


@Component({
    template: '<h1>Myynti-ilmoitukset</h1>' +
    '<ul class="heroes">' +
        '<li *ngFor="#ilmoitus of ilmoitukset">' +
            '{{ ilmoitus.brand }}' + ', ' + '{{ ilmoitus.text }}' +
        '</li>' +
    '</ul>' +
    '<div class="error" *ngIf="errorMessage">{{errorMessage}}</div>',

    directives: [ROUTER_DIRECTIVES]
})

export class IlmoListComponent implements OnInit {
    errorMessage: string;
    ilmoitukset: Ilmo[];

    constructor(private _ilmoService: IlmoService) { }

    getIlmoitukset() {
        // syncronous version
        //this.ilmoitukset = this._ilmoService.getIlmoitukset();

        // uses promise
        this._ilmoService.getIlmoitukset().then(ilmoitukset => this.ilmoitukset = ilmoitukset);
    }

    getIlmoituksetHttp() {
        this._ilmoService.getIlmoituksetHttp()
            .subscribe(
                ilmoitukset => this.ilmoitukset = ilmoitukset,
                error =>  this.errorMessage = <any>error);
    }


    ngOnInit() {
        //this.getIlmoitukset();
        this.getIlmoituksetHttp();
    }

}