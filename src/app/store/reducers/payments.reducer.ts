
import { Payment } from '../../@core/data/models';
import * as fromPaymentsActions from '../actions/payments.action';
import { Pagination, FilterConf, SortConf } from '../helpers';
import { EntityState, EntityAdapter, Dictionary, createEntityAdapter } from '@ngrx/entity';

export interface PaymentsState extends EntityState<Payment> {
    selectedPayment: Payment,
    loaded: boolean,
    loading: boolean,
    pagination: Pagination,
    filters: FilterConf,
    sort: SortConf[],
    error: any,
}

export const adapter: EntityAdapter<Payment> = createEntityAdapter<Payment>({
    sortComparer: (a, b) => {
        return a['createdAt'] - b['createdAt'];
    }
});

export const initialState: PaymentsState = adapter.getInitialState({
    selectedPayment: null,
    loaded: false,
    loading: false,
    pagination: { page: 1, perPage: 10 },
    filters: { filters: [], andOperator: false },
    sort: [],
    error: {},
})

export function paymentsReducer(
    state: PaymentsState = initialState,
    action: fromPaymentsActions.PaymentsAction): PaymentsState {
    switch (action.type) {
        case fromPaymentsActions.LOAD_PAYMENTS: {
            return {
                ...state,
                loaded: false,
                loading: true,
                filters: action.filters,
                pagination: action.pagination,
                sort: action.sort,
            }
        }
        case fromPaymentsActions.LOAD_PAYMENTS_FAIL: {
            return {
                ...state,
                loaded: false,
                loading: false,
                error: action.payload,
            }
        }
        case fromPaymentsActions.LOAD_PAYMENTS_SUCCESS: {
            return adapter.addMany(action.payload, {
                ...state,
                loaded: true,
                loading: false,
                error: null,
            });
        }
        case fromPaymentsActions.SELECT_PAYMENT: {
            return {
                ...state,
            }
        }
        case fromPaymentsActions.LOAD_SELECTED_PAYMENT: {
            return {
                ...state,
            }
        }
        case fromPaymentsActions.LOAD_SELECTED_PAYMENT_FAIL: {
            return {
                ...state,
                error: action.payload,
            }
        }
        case fromPaymentsActions.LOAD_SELECTED_PAYMENT_SUCCESS: {
            return {
                ...state,
                selectedPayment: action.payload,
                error: null,
            }
        }
        case fromPaymentsActions.CREATE_PAYMENT: {
            return {
                ...state,
            }
        }
        case fromPaymentsActions.CREATE_PAYMENT_SUCCESS: {
            return adapter.addOne(action.payload, { ...state });
        }
        case fromPaymentsActions.CREATE_PAYMENT_FAIL: {
            return {
                ...state,
                error: action.payload,
            }
        }
        case fromPaymentsActions.UPDATE_PAYMENT: {
            return {
                ...state,
            }
        }
        case fromPaymentsActions.UPDATE_PAYMENT_SUCCESS: {
            return adapter.updateOne(
                {
                    id: action.id,
                    changes: action.changes
                },
                { ...state }
            );
        }
        case fromPaymentsActions.UPDATE_PAYMENT_FAIL: {
            return {
                ...state,
                error: action.payload,
            }
        }
        case fromPaymentsActions.DELETE_PAYMENT: {
            return {
                ...state,
            }
        }
        case fromPaymentsActions.DELETE_PAYMENT_SUCCESS: {
            return adapter.removeOne(action.id, { ...state });
        }
        case fromPaymentsActions.DELETE_PAYMENT_FAIL: {
            return {
                ...state,
                error: action.payload,
            }
        }
        case fromPaymentsActions.CREATE_SOUJOURN_PAYMENTS: {
            return {
                ...state,
            }
        }
        case fromPaymentsActions.UPDATE_SOUJOURN_PAYMENTS: {
            return {
                ...state,
            }
        }
    }
    return state;
}

export const getPaymentsEntities = (state: PaymentsState) => { return state.entities }
export const getSelectedPayment = (state: PaymentsState) => { return state.selectedPayment }
export const getPaymentsLoading = (state: PaymentsState) => { return state.loading }
export const getPaymentsLoaded = (state: PaymentsState) => { return state.loaded }
export const getPaymentsPagination = (state: PaymentsState) => { return state.pagination }
export const getPaymentsFilters = (state: PaymentsState) => { return state.filters }
export const getPaymentsError = (state: PaymentsState) => { return state.error }
