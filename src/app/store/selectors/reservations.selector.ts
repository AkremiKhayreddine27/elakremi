import { createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromReservations from '../reducers/reservations.reducer';
import { Reservation } from '../../@core/data/models';
import { Pagination, FilterConf, sort, filter, paginate } from '../helpers';
import { Dictionary } from '@ngrx/entity';


export const getReservationsState = createSelector(
    fromFeature.getLocatusState,
    (state: fromFeature.LocatusState) => state.reservations
);

export const getReservationsEntities = createSelector(
    getReservationsState,
    fromReservations.getReservationsEntities
);

export const getReservationsCount = createSelector(
    getReservationsState,
    (state) => {
        return filter(state.filters, Object.keys(state.entities).map(id => state.entities[id])).length;
    }
);

export const getPaginatedSortedFiltredReservations = createSelector(
    getReservationsState,
    (state) => {
        return paginate(state.pagination, sort(state.sort, filter(state.filters, Object.keys(state.entities).map(id => state.entities[id]))));
    }
);

export const getAllReservations = createSelector(
    getReservationsState,
    (state) => {
        return Object.keys(state.entities).map(id => state.entities[id]);
    }
);

export const getSelectedReservation = createSelector(
    getReservationsState,
    fromReservations.getSelectedReservation
);

export const getReservationsLoaded = createSelector(
    getReservationsState,
    fromReservations.getReservationsLoaded
);

export const getReservationsLoading = createSelector(
    getReservationsState,
    fromReservations.getReservationsLoading
);

export const getReservationsFilters = createSelector(
    getReservationsState,
    fromReservations.getReservationsFilters
);

export const getReservationsPagination = createSelector(
    getReservationsState,
    fromReservations.getReservationsPagination
);

export const getReservationsError = createSelector(
    getReservationsState,
    fromReservations.getReservationsError
);