/**
 * Created by Kari on 2.5.2016.
 */
import {Component,  OnInit}  from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {Ilmo}   from './ilmo.ts';
import {IlmoService}   from './ilmo.service.ts';

@Component({
    template: '' +
    '<h2>HEROES</h2>' +
    '<div *ngIf="hero">' +
    '<h3>"{{hero.name}}"</h3>'
    /*<div>
        <label>Id: </label>{{hero.id}}</div>
    <div>
        <label>Name: </label>
    <input [(ngModel)]="hero.name" placeholder="name"/>
    </div>
    <p>
        <button (click)="gotoHeroes()">Back</button>
    </p>
    </div>*/
`,
})

export class IlmoDetailComponent implements OnInit  {
    ilmo: Ilmo;
    constructor(
        private _router:Router,
        private _routeParams:RouteParams,
        private _service:IlmoService){}
    ngOnInit() {
        //let id = this._routeParams.get('id');
        //this._service.getHero(id).then(hero => this.hero = hero);
    }
    gotoIlmoitukset() {
        // Comment: Like <a [routerLink]="['Heroes']">Heroes</a>
        //this._router.navigate(['Ilmoitukset']);
    }
}