
import { Reservation } from '../../@core/data/models';
import * as fromReservationsActions from '../actions/reservations.action';
import { Pagination, FilterConf, SortConf } from '../helpers';
import { EntityState, EntityAdapter, Dictionary, createEntityAdapter } from '@ngrx/entity';

export interface ReservationsState extends EntityState<Reservation> {
    selectedReservation: Reservation,
    loaded: boolean,
    loading: boolean,
    pagination: Pagination,
    filters: FilterConf,
    sort: SortConf[],
    error: any,
}

export const adapter: EntityAdapter<Reservation> = createEntityAdapter<Reservation>({
    sortComparer: (a, b) => {
        return a['createdAt'] - b['createdAt'];
    }
});

export const initialState: ReservationsState = adapter.getInitialState({
    selectedReservation: null,
    loaded: false,
    loading: false,
    pagination: { page: 1, perPage: 10 },
    filters: { filters: [], andOperator: false },
    sort: [],
    error: {},
})

export function reservationsReducer(
    state: ReservationsState = initialState,
    action: fromReservationsActions.ReservationsAction): ReservationsState {
    switch (action.type) {
        case fromReservationsActions.LOAD_RESERVATIONS: {
            return {
                ...state,
                loaded: false,
                loading: true,
                filters: action.filters,
                pagination: action.pagination,
                sort: action.sort,
            }
        }
        case fromReservationsActions.LOAD_RESERVATIONS_FAIL: {
            return {
                ...state,
                loaded: false,
                loading: false,
                error: action.payload,
            }
        }
        case fromReservationsActions.LOAD_RESERVATIONS_SUCCESS: {
            return adapter.addAll(action.payload, {
                ...state,
                loaded: true,
                loading: false,
                error: null,
            });
        }
        case fromReservationsActions.SELECT_RESERVATION: {
            return {
                ...state,
            }
        }
        case fromReservationsActions.LOAD_SELECTED_RESERVATION: {
            return {
                ...state,
            }
        }
        case fromReservationsActions.LOAD_SELECTED_RESERVATION_FAIL: {
            return {
                ...state,
                error: action.payload,
            }
        }
        case fromReservationsActions.LOAD_SELECTED_RESERVATION_SUCCESS: {
            return {
                ...state,
                selectedReservation: action.payload,
                error: null,
            }
        }
        case fromReservationsActions.CREATE_RESERVATION: {
            return {
                ...state,
            }
        }
        case fromReservationsActions.CREATE_RESERVATION_SUCCESS: {
            return adapter.addOne(action.payload, { ...state });
        }
        case fromReservationsActions.CREATE_RESERVATION_FAIL: {
            return {
                ...state,
                error: action.payload,
            }
        }
        case fromReservationsActions.UPDATE_RESERVATION: {
            return {
                ...state,
            }
        }
        case fromReservationsActions.UPDATE_RESERVATION_SUCCESS: {
            return adapter.updateOne(
                {
                    id: action.id,
                    changes: action.changes
                },
                { ...state }
            );
        }
        case fromReservationsActions.UPDATE_RESERVATION_FAIL: {
            return {
                ...state,
                error: action.payload,
            }
        }
        case fromReservationsActions.DELETE_RESERVATION: {
            return {
                ...state,
            }
        }
        case fromReservationsActions.DELETE_RESERVATION_SUCCESS: {
            return adapter.removeOne(action.id, { ...state });
        }
        case fromReservationsActions.DELETE_RESERVATION_FAIL: {
            return {
                ...state,
                error: action.payload,
            }
        }
        case fromReservationsActions.CALCULATE_RESERVATION_BALANCE: {
            return {
                ...state,
            }
        }
        case fromReservationsActions.CALCULATE_RESERVATION_ADJUSTED: {
            return {
                ...state,
            }
        }
    }
    return state;
}

export const getReservationsEntities = (state: ReservationsState) => { return state.entities }
export const getSelectedReservation = (state: ReservationsState) => { return state.selectedReservation }
export const getReservationsLoading = (state: ReservationsState) => { return state.loading }
export const getReservationsLoaded = (state: ReservationsState) => { return state.loaded }
export const getReservationsPagination = (state: ReservationsState) => { return state.pagination }
export const getReservationsFilters = (state: ReservationsState) => { return state.filters }
export const getReservationsError = (state: ReservationsState) => { return state.error }
