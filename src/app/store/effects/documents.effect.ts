import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import * as documentsActions from '../actions/documents.action';
import { filter, paginate, sort } from '../helpers';

import { switchMap, map, catchError } from 'rxjs/operators';
import { DocumentsService } from '../../@core/data/services/documents.service';

import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DocumentsEffects {

    constructor(private actions$: Actions, private documentsService: DocumentsService) { }

    @Effect()
    loadDocument$ = this.actions$.ofType(documentsActions.LOAD_DOCUMENTS)
        .pipe(
            switchMap((action: documentsActions.LoadDocuments) => {
                return of(this.documentsService.all()).pipe(
                    map(documents =>  new documentsActions.LoadDocumentsSuccess(documents) ),
                    catchError((error: Error) => {
                        return of(new documentsActions.LoadDocumentsFail(error.stack));
                    })
                )
            })
        );
}