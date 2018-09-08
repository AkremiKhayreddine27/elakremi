
import { Property } from '../../@core/data/models';
import * as fromPropertiesActions from '../actions/properties.action';
import { Pagination, FilterConf, SortConf } from '../helpers';
import { EntityState, EntityAdapter, Dictionary, createEntityAdapter } from '@ngrx/entity';

export interface PropertiesState extends EntityState<Property> {
    selectedProperty: Property,
    loaded: boolean,
    loading: boolean,
    pagination: Pagination,
    filters: FilterConf,
    sort: SortConf[],
    error: any,
}

export const adapter: EntityAdapter<Property> = createEntityAdapter<Property>({
    sortComparer: (a, b) => {
        return a['createdAt'] - b['createdAt'];
    }
});

export const initialState: PropertiesState = adapter.getInitialState({
    selectedProperty: null,
    loaded: false,
    loading: false,
    pagination: { page: 1, perPage: 10 },
    filters: { filters: [], andOperator: false },
    sort: [],
    error: {},
})

export function propertiesReducer(
    state: PropertiesState = initialState,
    action: fromPropertiesActions.PropertiesAction): PropertiesState {
    switch (action.type) {
        case fromPropertiesActions.LOAD_PROPERTIES: {
            return {
                ...state,
                loaded: false,
                loading: true,
                filters: action.filters,
                pagination: action.pagination,
                sort: action.sort,
            }
        }
        case fromPropertiesActions.LOAD_PROPERTIES_FAIL: {
            return {
                ...state,
                loaded: false,
                loading: false,
                error: action.payload,
            }
        }
        case fromPropertiesActions.LOAD_PROPERTIES_SUCCESS: {
            return adapter.addAll(action.payload, {
                ...state,
                loaded: true,
                loading: false,
                error: null,
            });
        }
        case fromPropertiesActions.SELECT_PROPERTY: {
            return {
                ...state,
            }
        }
        case fromPropertiesActions.LOAD_SELECTED_PROPERTY: {
            return {
                ...state,
            }
        }
        case fromPropertiesActions.LOAD_SELECTED_PROPERTY_FAIL: {
            return {
                ...state,
                error: action.payload,
            }
        }
        case fromPropertiesActions.LOAD_SELECTED_PROPERTY_SUCCESS: {
            return {
                ...state,
                selectedProperty: action.payload,
                error: null,
            }
        }
    }
    return state;
}

export const getPropertiesEntities = (state: PropertiesState) => { return state.entities }
export const getSelectedProperty = (state: PropertiesState) => { return state.selectedProperty }
export const getPropertiesLoading = (state: PropertiesState) => { return state.loading }
export const getPropertiesLoaded = (state: PropertiesState) => { return state.loaded }
export const getPropertiesPagination = (state: PropertiesState) => { return state.pagination }
export const getPropertiesFilters = (state: PropertiesState) => { return state.filters }
export const getPropertiesError = (state: PropertiesState) => { return state.error }
