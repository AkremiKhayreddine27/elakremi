import { createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromDocuments from '../reducers/documents.reducer';
import { Document } from '../../@core/data/models';
import { Pagination, FilterConf, sort, filter, paginate } from '../helpers';
import { Dictionary } from '@ngrx/entity';


export const getDocumentsState = createSelector(
    fromFeature.getLocatusState,
    (state: fromFeature.LocatusState) => state.documents
);

export const getDocumentsEntities = createSelector(
    getDocumentsState,
    fromDocuments.getDocumentsEntities
);

export const getDocumentsCount = createSelector(
    getDocumentsState,
    (state) => {
        return filter(state.filters, Object.keys(state.entities).map(id => state.entities[id])).length;
    }
);

export const getAllDocuments = createSelector(
    getDocumentsState,
    (state) => {
        return paginate(state.pagination, sort(state.sort, filter(state.filters, Object.keys(state.entities).map(id => state.entities[id]))));
    }
);

export const getDocumentsLoaded = createSelector(
    getDocumentsState,
    fromDocuments.getDocumentsLoaded
);

export const getDocumentsLoading = createSelector(
    getDocumentsState,
    fromDocuments.getDocumentsLoading
);

export const getDocumentsFilters = createSelector(
    getDocumentsState,
    fromDocuments.getDocumentsFilters
);

export const getDocumentsPagination = createSelector(
    getDocumentsState,
    fromDocuments.getDocumentsPagination
);