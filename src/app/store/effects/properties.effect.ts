import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import * as propertiesActions from '../actions/properties.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import { PropertyService } from '../../@core/data/services/property.service';

import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PropertiesEffects {
    constructor(private actions$: Actions, private propertiesService: PropertyService) { }

    @Effect()
    loadProperties$ = this.actions$.ofType(propertiesActions.LOAD_PROPERTIES)
        .pipe(
            switchMap(() => {
                return of(this.propertiesService.all()).pipe(
                    map(properties => new propertiesActions.LoadPropertiesSuccess(properties)),
                    catchError(error => of(new propertiesActions.LoadPropertiesFail(error)))
                )
            })
        );

    @Effect()
    getSelectedProperty$ = this.actions$.ofType(propertiesActions.LOAD_SELECTED_PROPERTY)
        .pipe(
            switchMap(() => {
                return of(this.propertiesService.getCurrentProperty()).pipe(
                    map(property => new propertiesActions.LoadSelectedPropertySuccess(property)),
                    catchError(error => of(new propertiesActions.LoadSelectedPropertyFail(error)))
                )
            })
        );

    @Effect()
    selectProperty$ = this.actions$.ofType(propertiesActions.SELECT_PROPERTY)
        .pipe(
            switchMap((action: propertiesActions.SelectProperty) => {
                return this.propertiesService.setCurrentProperty(action.payload)
                .pipe(
                    map((property) => new propertiesActions.LoadSelectedProperty()),
                    catchError(error => of(new propertiesActions.LoadSelectedPropertyFail(error)))
                );
            })
        );
}