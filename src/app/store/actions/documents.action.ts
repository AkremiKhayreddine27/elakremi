import { Action } from '@ngrx/store';

import { Document } from '../../@core/data/models';
import { Pagination, FilterConf, SortConf } from '../helpers';

export const LOAD_DOCUMENTS = '[Documents] Load Documents';
export const LOAD_DOCUMENTS_FAIL = '[Documents] Load Documents Fail';
export const LOAD_DOCUMENTS_SUCCESS = '[Documents] Load Documents Success';


export class LoadDocuments implements Action {
    readonly type = LOAD_DOCUMENTS;
    constructor(public filters: FilterConf = null, public sort: SortConf[] = null, public pagination: Pagination = null) { }
}

export class LoadDocumentsFail implements Action {
    readonly type = LOAD_DOCUMENTS_FAIL;
    constructor(public payload: any) { }
}

export class LoadDocumentsSuccess implements Action {
    readonly type = LOAD_DOCUMENTS_SUCCESS;
    constructor(public payload: Document[]) { }
}

export type DocumentsAction = LoadDocuments | LoadDocumentsFail | LoadDocumentsSuccess;

