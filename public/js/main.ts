/**
 * Created by Kari on 9.4.2016.
 */

import {AppComponent} from './app/app.component.ts';
import {bootstrap} from 'angular2/platform/browser';
import { ROUTER_PROVIDERS } from 'angular2/router';
// Add all operators to Observable. Needed for HTTP
import 'rxjs/Rx';
import { HTTP_PROVIDERS } from 'angular2/http';

bootstrap(AppComponent, [
    ROUTER_PROVIDERS, HTTP_PROVIDERS
]);
