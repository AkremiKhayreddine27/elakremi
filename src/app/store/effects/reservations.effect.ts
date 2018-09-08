import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import * as reservationsActions from '../actions/reservations.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ReservationsService, PaymentService } from '../../@core/data';
import { Reservation, Payment } from '../../@core/data/models';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReservationsEffects {
    constructor(
        private actions$: Actions,
        private reservationsService: ReservationsService,
        private paymentService: PaymentService
    ) { }

    @Effect()
    loadReservations$ = this.actions$.ofType(reservationsActions.LOAD_RESERVATIONS)
        .pipe(
            switchMap(() => {
                return of(this.reservationsService.all()).pipe(
                    map(reservations => new reservationsActions.LoadReservationsSuccess(reservations)),
                    catchError(error => of(new reservationsActions.LoadReservationsFail(error)))
                )
            })
        );

    @Effect()
    selectReservation$ = this.actions$.ofType(reservationsActions.SELECT_RESERVATION)
        .pipe(
            switchMap((action: reservationsActions.SelectReservation) => {
                return of(this.reservationsService.find(action.payload))
                    .pipe(
                        map((reservation) => new reservationsActions.LoadSelectedReservationSuccess(reservation)),
                        catchError(error => of(new reservationsActions.LoadSelectedReservationFail(error)))
                    );
            })
        );

    @Effect()
    createReservation$ = this.actions$.ofType(reservationsActions.CREATE_RESERVATION)
        .pipe(
            switchMap((action: reservationsActions.CreateReservation) => {
                return of(this.reservationsService.store(action.payload)).pipe(
                    map(() => new reservationsActions.CreateReservationSuccess(action.payload)),
                    catchError(error => of(new reservationsActions.CreateReservationFail(error)))
                )
            })
        );

    @Effect()
    updateReservation$ = this.actions$.ofType(reservationsActions.UPDATE_RESERVATION)
        .pipe(
            switchMap((action: reservationsActions.UpdateReservation) => {
                return of(this.reservationsService.update(action.id, action.changes)).pipe(
                    map(() => new reservationsActions.UpdateReservationSuccess(action.id, action.changes)),
                    catchError(error => of(new reservationsActions.UpdateReservationFail(error)))
                )
            })
        );

    @Effect()
    deleteReservation$ = this.actions$.ofType(reservationsActions.DELETE_RESERVATION)
        .pipe(
            switchMap((action: reservationsActions.DeleteReservation) => {
                return of(this.reservationsService.delete(action.id)).pipe(
                    map(() => new reservationsActions.DeleteReservationSuccess(action.id)),
                    catchError(error => of(new reservationsActions.DeleteReservationFail(error)))
                )
            })
        );

    @Effect()
    calculateReservationBalance$ = this.actions$.ofType(reservationsActions.CALCULATE_RESERVATION_BALANCE)
        .pipe(
            switchMap((action: reservationsActions.CalculateReservationBalance) => {
                let reservation = this.reservationsService.find(action.id);
                const payments = this.paymentService.findByAndBy({ 'nomenclature.id': action.id, 'nomenclature.type': 'Réservation' });
                return of(this.reservationsService.calculateBalance(payments))
                    .pipe(
                        map((balance) => {
                            reservation.balance.value = balance;
                            return new reservationsActions.UpdateReservation(action.id, reservation);
                        }),
                        catchError(error => of(new reservationsActions.UpdateReservationFail(error)))
                    );
            })
        );

    @Effect()
    calculateReservationAdjusted$ = this.actions$.ofType(reservationsActions.CALCULATE_RESERVATION_ADJUSTED)
        .pipe(
            switchMap((action: reservationsActions.CalculateReservationAdjusted) => {
                let reservation: Reservation = this.reservationsService.find(action.id);
                const payments: Payment[] = this.paymentService.findByAndBy({ 'nomenclature.id': action.id, 'nomenclature.type': 'Réservation' });
                return of(this.reservationsService.calculateAdjusted(payments))
                    .pipe(
                        map((adjusted) => {
                            reservation.adjusted.value = adjusted;
                            return new reservationsActions.UpdateReservation(action.id, reservation);
                        }),
                        catchError(error => of(new reservationsActions.UpdateReservationFail(error)))
                    );
            })
        );
}