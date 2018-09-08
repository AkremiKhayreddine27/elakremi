 
import { Document } from '../../@core/data/models';
import * as fromDocumentActions from '../actions/documents.action';
import { Pagination, FilterConf, SortConf } from '../helpers';
import { EntityState, EntityAdapter, Dictionary, createEntityAdapter } from '@ngrx/entity';

export interface DocumentState extends EntityState<Document> {
    loaded: boolean,
    loading: boolean,
    pagination: Pagination,
    filters: FilterConf,
    sort: SortConf[],
    error: any,
}

export const adapter: EntityAdapter<Document> = createEntityAdapter<Document>({
    sortComparer: (a, b) => {
        return a['createdAt'] - b['createdAt'];
    }
});

export const initialState: DocumentState = adapter.getInitialState({
    loaded: false,
    loading: false,
    pagination: { page: 1, perPage: 10 },
    filters: { filters: [], andOperator: false },
    sort: [],
    error: {},
})

export function documentReducer(
    state: DocumentState = initialState,
    action: fromDocumentActions.DocumentsAction): DocumentState {
    switch (action.type) {
        case fromDocumentActions.LOAD_DOCUMENTS: {
            return {
                ...state,
                loaded: false,
                loading: true,
                filters: action.filters,
                pagination: action.pagination,
                sort: action.sort,
            }
        }
        case fromDocumentActions.LOAD_DOCUMENTS_FAIL: {
            return {
                ...state,
                loaded: false,
                loading: false,
                error: action.payload,
            }
        }
        case fromDocumentActions.LOAD_DOCUMENTS_SUCCESS: {
            return adapter.addAll(action.payload, {
                ...state,
                loaded: true,
                loading: false
            });
        }
    }
    return state;
}

export const getDocumentsEntities = (state: DocumentState) => { return state.entities }
export const getDocumentsLoading = (state: DocumentState) => { return state.loading }
export const getDocumentsLoaded = (state: DocumentState) => { return state.loaded }
export const getDocumentsPagination = (state: DocumentState) => { return state.pagination }
export const getDocumentsFilters = (state: DocumentState) => { return state.filters }
