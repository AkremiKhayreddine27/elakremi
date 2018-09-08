import { Action } from '@ngrx/store';

import { Payment, Reservation } from '../../@core/data/models';
import { Pagination, FilterConf, SortConf } from '../helpers';

export const LOAD_PAYMENTS = '[Payments] Load Payments';
export const LOAD_PAYMENTS_FAIL = '[Payments] Load Payments Fail';
export const LOAD_PAYMENTS_SUCCESS = '[Payments] Load Payments Success';
export const SELECT_PAYMENT = '[Payments] Select Payment';
export const LOAD_SELECTED_PAYMENT = '[Payments] Load Selected Payment';
export const LOAD_SELECTED_PAYMENT_FAIL = '[Payments] Load Selected Payment Fail';
export const LOAD_SELECTED_PAYMENT_SUCCESS = '[Payments] Load Selected Payment Success';
export const CREATE_PAYMENT = '[Payments] Create Payment';
export const CREATE_PAYMENT_SUCCESS = '[Payments] Create Payment Success';
export const CREATE_PAYMENT_FAIL = '[Payments] Create Payment Fail';
export const UPDATE_PAYMENT = '[Payments] Update Payment';
export const UPDATE_PAYMENT_SUCCESS = '[Payments] Update Payment Success';
export const UPDATE_PAYMENT_FAIL = '[Payments] Update Payment Fail';
export const DELETE_PAYMENT = '[Payments] Delete Payment';
export const DELETE_PAYMENT_SUCCESS = '[Payments] Delete Payment Success';
export const DELETE_PAYMENT_FAIL = '[Payments] Delete Payment Fail';
export const CREATE_SOUJOURN_PAYMENTS = '[Payments] Create Soujourn Payments';
export const UPDATE_SOUJOURN_PAYMENTS = '[Payments] Update Soujourn Payments';

export class LoadPayments implements Action {
    readonly type = LOAD_PAYMENTS;
    constructor(public filters: FilterConf = null, public sort: SortConf[] = null, public pagination: Pagination = null) { }

}

export class LoadPaymentsFail implements Action {
    readonly type = LOAD_PAYMENTS_FAIL;
    constructor(public payload: any) { }
}

export class LoadPaymentsSuccess implements Action {
    readonly type = LOAD_PAYMENTS_SUCCESS;
    constructor(public payload: Payment[]) { }
}

export class SelectPayment implements Action {
    readonly type = SELECT_PAYMENT;
    constructor(public payload: number) { }
}

export class LoadSelectedPayment implements Action {
    readonly type = LOAD_SELECTED_PAYMENT;
}

export class LoadSelectedPaymentFail implements Action {
    readonly type = LOAD_SELECTED_PAYMENT_FAIL;
    constructor(public payload: any) { }
}

export class LoadSelectedPaymentSuccess implements Action {
    readonly type = LOAD_SELECTED_PAYMENT_SUCCESS;
    constructor(public payload: Payment) { }
}

export class CreatePayment implements Action {
    readonly type = CREATE_PAYMENT;
    constructor(public payload: Payment) { }
}

export class CreatePaymentSuccess implements Action {
    readonly type = CREATE_PAYMENT_SUCCESS;
    constructor(public payload: Payment) { }
}

export class CreatePaymentFail implements Action {
    readonly type = CREATE_PAYMENT_FAIL;
    constructor(public payload: any) { }
}

export class UpdatePayment implements Action {
    readonly type = UPDATE_PAYMENT;
    constructor(
        public id: number,
        public changes: Partial<Payment>,
    ) { }
}

export class UpdatePaymentSuccess implements Action {
    readonly type = UPDATE_PAYMENT_SUCCESS;
    constructor(
        public id: number,
        public changes: Partial<Payment>,
    ) { }
}
 
export class UpdatePaymentFail implements Action {
    readonly type = UPDATE_PAYMENT_FAIL;
    constructor(public payload: any) { }
}

export class DeletePayment implements Action {
    readonly type = DELETE_PAYMENT;
    constructor(public id: number) { }
}

export class DeletePaymentSuccess implements Action {
    readonly type = DELETE_PAYMENT_SUCCESS;
    constructor(public id: number) { }
}

export class DeletePaymentFail implements Action {
    readonly type = DELETE_PAYMENT_FAIL;
    constructor(public payload: any) { }
}

export class CreateSoujournPayments implements Action {
    readonly type = CREATE_SOUJOURN_PAYMENTS;
    constructor(public parent: Reservation) { }
}

export class UpdateSoujournPayments implements Action {
    readonly type = UPDATE_SOUJOURN_PAYMENTS;
    constructor(public old: Reservation, public changes: Reservation) { }
}




export type PaymentsAction =
    LoadPayments |
    LoadPaymentsFail |
    LoadPaymentsSuccess |
    SelectPayment |
    LoadSelectedPayment |
    LoadSelectedPaymentFail |
    LoadSelectedPaymentSuccess |
    CreatePayment |
    CreatePaymentSuccess |
    CreatePaymentFail |
    UpdatePayment |
    UpdatePaymentSuccess |
    UpdatePaymentFail |
    DeletePayment |
    DeletePaymentSuccess |
    DeletePaymentFail |
    CreateSoujournPayments |
    UpdateSoujournPayments;