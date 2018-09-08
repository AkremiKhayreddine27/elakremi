import { Action } from '@ngrx/store';

import { Reservation, Payment } from '../../@core/data/models';
import { Pagination, FilterConf, SortConf } from '../helpers';

export const LOAD_RESERVATIONS = '[Reservations] Load Reservations';
export const LOAD_RESERVATIONS_FAIL = '[Reservations] Load Reservations Fail';
export const LOAD_RESERVATIONS_SUCCESS = '[Reservations] Load Reservations Success';
export const SELECT_RESERVATION = '[Reservations] Select Reservation';
export const LOAD_SELECTED_RESERVATION = '[Reservations] Load Selected Reservation';
export const LOAD_SELECTED_RESERVATION_FAIL = '[Reservations] Load Selected Reservation Fail';
export const LOAD_SELECTED_RESERVATION_SUCCESS = '[Reservations] Load Selected Reservation Success';
export const CREATE_RESERVATION = '[Reservations] Create Reservation';
export const CREATE_RESERVATION_SUCCESS = '[Reservations] Create Reservation Success';
export const CREATE_RESERVATION_FAIL = '[Reservations] Create Reservation Fail';
export const UPDATE_RESERVATION = '[Reservations] Update Reservation';
export const UPDATE_RESERVATION_SUCCESS = '[Reservations] Update Reservation Success';
export const UPDATE_RESERVATION_FAIL = '[Reservations] Update Reservation Fail';
export const DELETE_RESERVATION = '[Reservations] Delete Reservation';
export const DELETE_RESERVATION_SUCCESS = '[Reservations] Delete Reservation Success';
export const DELETE_RESERVATION_FAIL = '[Reservations] Delete Reservation Fail';
export const CALCULATE_RESERVATION_BALANCE = '[Reservations] Calculate Reservation Balance';
export const CALCULATE_RESERVATION_ADJUSTED = '[Reservations] Calculate Reservation Adjusted';

export class LoadReservations implements Action {
    readonly type = LOAD_RESERVATIONS;
    constructor(public filters: FilterConf = null, public sort: SortConf[] = null, public pagination: Pagination = null) { }

}

export class LoadReservationsFail implements Action {
    readonly type = LOAD_RESERVATIONS_FAIL;
    constructor(public payload: any) { }
}

export class LoadReservationsSuccess implements Action {
    readonly type = LOAD_RESERVATIONS_SUCCESS;
    constructor(public payload: Reservation[]) { }
}

export class SelectReservation implements Action {
    readonly type = SELECT_RESERVATION;
    constructor(public payload: number) { }
}

export class LoadSelectedReservation implements Action {
    readonly type = LOAD_SELECTED_RESERVATION;
}

export class LoadSelectedReservationFail implements Action {
    readonly type = LOAD_SELECTED_RESERVATION_FAIL;
    constructor(public payload: any) { }
}

export class LoadSelectedReservationSuccess implements Action {
    readonly type = LOAD_SELECTED_RESERVATION_SUCCESS;
    constructor(public payload: Reservation) { }
}

export class CreateReservation implements Action {
    readonly type = CREATE_RESERVATION;
    constructor(public payload: Reservation) { }
}

export class CreateReservationSuccess implements Action {
    readonly type = CREATE_RESERVATION_SUCCESS;
    constructor(public payload: Reservation) { }
}

export class CreateReservationFail implements Action {
    readonly type = CREATE_RESERVATION_FAIL;
    constructor(public payload: any) { }
}

export class UpdateReservation implements Action {
    readonly type = UPDATE_RESERVATION;
    constructor(
        public id: number,
        public changes: Partial<Reservation>,
    ) { }
}

export class UpdateReservationSuccess implements Action {
    readonly type = UPDATE_RESERVATION_SUCCESS;
    constructor(
        public id: number,
        public changes: Partial<Reservation>,
    ) { }
}

export class UpdateReservationFail implements Action {
    readonly type = UPDATE_RESERVATION_FAIL;
    constructor(public payload: any) { }
}

export class DeleteReservation implements Action {
    readonly type = DELETE_RESERVATION;
    constructor(public id: number) { }
}

export class DeleteReservationSuccess implements Action {
    readonly type = DELETE_RESERVATION_SUCCESS;
    constructor(public id: number) { }
}

export class DeleteReservationFail implements Action {
    readonly type = DELETE_RESERVATION_FAIL;
    constructor(public payload: any) { }
}

export class CalculateReservationBalance implements Action {
    readonly type = CALCULATE_RESERVATION_BALANCE;
    constructor(public id: number) { }
}

export class CalculateReservationAdjusted implements Action {
    readonly type = CALCULATE_RESERVATION_ADJUSTED;
    constructor(public id: number) { }
}

export type ReservationsAction =
    LoadReservations |
    LoadReservationsFail |
    LoadReservationsSuccess |
    SelectReservation |
    LoadSelectedReservation |
    LoadSelectedReservationFail |
    LoadSelectedReservationSuccess |
    CreateReservation |
    CreateReservationSuccess |
    CreateReservationFail |
    UpdateReservation |
    UpdateReservationSuccess |
    UpdateReservationFail |
    DeleteReservation |
    DeleteReservationSuccess |
    DeleteReservationFail |
    CalculateReservationBalance |
    CalculateReservationAdjusted;