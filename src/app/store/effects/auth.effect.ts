import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import * as authActions from '../actions/auth.action';

import { switchMap, map, catchError } from 'rxjs/operators';
import { AuthService } from '../../@core/data';

import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions, private authService: AuthService) { }

    @Effect()
    check$ = this.actions$.ofType(authActions.CHECK)
        .pipe(
            switchMap((action: authActions.Check) => {
                return this.authService.check().pipe(
                    map(user => new authActions.CheckSuccess(user)),
                    catchError((error: Error) => {
                        return of(new authActions.CheckFail(error.stack));
                    })
                )
            })
        );
} 