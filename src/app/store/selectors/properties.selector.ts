import { createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromProperties from '../reducers/properties.reducer';
import { Property } from '../../@core/data/models';
import { Pagination, FilterConf, sort, filter, paginate } from '../helpers';
import { Dictionary } from '@ngrx/entity';


export const getPropertiesState = createSelector(
    fromFeature.getLocatusState,
    (state: fromFeature.LocatusState) => state.properties
);

export const getPropertiesEntities = createSelector(
    getPropertiesState,
    fromProperties.getPropertiesEntities
);

export const getPropertiesCount = createSelector(
    getPropertiesState,
    (state) => {
        return filter(state.filters, Object.keys(state.entities).map(id => state.entities[id])).length;
    }
);

export const getPaginatedSortedFiltredProperties = createSelector(
    getPropertiesState,
    (state) => {
        return paginate(state.pagination, sort(state.sort, filter(state.filters, Object.keys(state.entities).map(id => state.entities[id]))));
    }
);

export const getAllProperties = createSelector(
    getPropertiesState,
    (state) => {
        return Object.keys(state.entities).map(id => state.entities[id]);
    }
);

export const getSelectedProperty = createSelector(
    getPropertiesState,
    fromProperties.getSelectedProperty
);

export const getPropertiesLoaded = createSelector(
    getPropertiesState,
    fromProperties.getPropertiesLoaded
);

export const getPropertiesLoading = createSelector(
    getPropertiesState,
    fromProperties.getPropertiesLoading
);

export const getPropertiesFilters = createSelector(
    getPropertiesState,
    fromProperties.getPropertiesFilters
);

export const getPropertiesPagination = createSelector(
    getPropertiesState,
    fromProperties.getPropertiesPagination
);

export const getPropertiesError = createSelector(
    getPropertiesState,
    fromProperties.getPropertiesError
);