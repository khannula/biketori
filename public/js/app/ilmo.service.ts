/**
 * Created by Kari on 26.4.2016.
 */

import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {ILMOITUKSET} from './mock-ilmot.ts';
import {Ilmoo}           from './ilmo.ts';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class IlmoService {

    constructor (private http: Http) {}

    //private _heroesUrl = 'app/heroes';  // URL to web api
    private _heroesUrl = 'http://localhost:3000/ilmoitukset';  // URL to web api

    getIlmoituksetHttp (): Observable<Ilmo[]> {
        return this.http.get(this._heroesUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        //let body = res.json();
        //return body.data || { };
        return res.json();
    }

    private handleError (error: any) {
        // In a real world app, we might send the error to remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    getIlmoitukset() {
        // synchronous version
        //return ILMOITUKSET;

        return Promise.resolve(ILMOITUKSET);
    }

}