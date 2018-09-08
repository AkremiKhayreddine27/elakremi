import { createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromPayments from '../reducers/payments.reducer';
import { Payment } from '../../@core/data/models';
import { Pagination, FilterConf, sort, filter, paginate } from '../helpers';
import { Dictionary } from '@ngrx/entity';

export const getPaymentsState = createSelector(
    fromFeature.getLocatusState,
    (state: fromFeature.LocatusState) => state.payments
);

export const getPaymentsEntities = createSelector(
    getPaymentsState,
    fromPayments.getPaymentsEntities
);

export const getPaymentsCount = createSelector(
    getPaymentsState,
    (state) => {
        return filter(state.filters, Object.keys(state.entities).map(id => state.entities[id])).length;
    }
);

export const getPaginatedSortedFiltredPayments = createSelector(
    getPaymentsState,
    (state) => {
        return paginate(state.pagination, sort(state.sort, filter(state.filters, Object.keys(state.entities).map(id => state.entities[id]))));
    }
);

export const getPaymentsByNomenclature = (id: number, type: string) => createSelector(
    getPaymentsState,
    (state) => {
        const filters = {
            filters: [
                {
                    field: 'nomenclature',
                    search: id.toString(),
                    filter(cell: any, search: any) {
                        return cell.id.toString() === search && cell.type === type;
                    }
                }
            ], andOperator: true
        };
        const sortConf = [{
            field: 'deadlineDate',
            direction: 'desc',
        }]
        return sort(sortConf, filter(filters, Object.keys(state.entities).map(id => state.entities[id])));
    }
)

export const getAllPayments = createSelector(
    getPaymentsState,
    (state) => {
        return Object.keys(state.entities).map(id => state.entities[id]);
    }
);

export const getSelectedPayment = createSelector(
    getPaymentsState,
    fromPayments.getSelectedPayment
);

export const getPaymentsLoaded = createSelector(
    getPaymentsState,
    fromPayments.getPaymentsLoaded
);

export const getPaymentsLoading = createSelector(
    getPaymentsState,
    fromPayments.getPaymentsLoading
);

export const getPaymentsFilters = createSelector(
    getPaymentsState,
    fromPayments.getPaymentsFilters
);

export const getPaymentsPagination = createSelector(
    getPaymentsState,
    fromPayments.getPaymentsPagination
);

export const getPaymentsError = createSelector(
    getPaymentsState,
    fromPayments.getPaymentsError
);