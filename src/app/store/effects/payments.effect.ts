import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Payment } from '../../@core/data/models';
import * as paymentsActions from '../actions/payments.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import { PaymentService } from '@core/data/services/payment.service';

import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PaymentsEffects {
    constructor(private actions$: Actions, private paymentsService: PaymentService) { }

    @Effect()
    loadPayments$ = this.actions$.ofType(paymentsActions.LOAD_PAYMENTS)
        .pipe(
            switchMap(() => {
                return of(this.paymentsService.all()).pipe(
                    map(payments => new paymentsActions.LoadPaymentsSuccess(payments)),
                    catchError(error => of(new paymentsActions.LoadPaymentsFail(error)))
                )
            })
        );

    @Effect()
    createPayment$ = this.actions$.ofType(paymentsActions.CREATE_PAYMENT)
        .pipe(
            switchMap((action: paymentsActions.CreatePayment) => {
                return of(this.paymentsService.store(action.payload)).pipe(
                    map(() => new paymentsActions.CreatePaymentSuccess(action.payload)),
                    catchError(error => of(new paymentsActions.CreatePaymentFail(error)))
                )
            })
        );

    @Effect()
    updatePayment$ = this.actions$.ofType(paymentsActions.UPDATE_PAYMENT)
        .pipe(
            switchMap((action: paymentsActions.UpdatePayment) => {
                return of(this.paymentsService.update(action.id, action.changes)).pipe(
                    map(() => new paymentsActions.UpdatePaymentSuccess(action.id, action.changes)),
                    catchError(error => of(new paymentsActions.UpdatePaymentFail(error)))
                )
            })
        );

    @Effect()
    deletedPayment$ = this.actions$.ofType(paymentsActions.DELETE_PAYMENT)
        .pipe(
            switchMap((action: paymentsActions.DeletePayment) => {
                return of(this.paymentsService.delete(action.id)).pipe(
                    map(() => new paymentsActions.DeletePaymentSuccess(action.id)),
                    catchError(error => of(new paymentsActions.DeletePaymentFail(error)))
                )
            })
        );

    @Effect()
    createSoujournPayments$ = this.actions$.ofType(paymentsActions.CREATE_SOUJOURN_PAYMENTS)
        .pipe(
            switchMap((action: paymentsActions.CreateSoujournPayments) => {
                return of(this.paymentsService.createSojournPayments(action.parent, true)).pipe(
                    map((payments) => new paymentsActions.LoadPaymentsSuccess(payments)),
                    catchError(error => of(new paymentsActions.LoadPaymentsFail(error)))
                )
            })
        );

    @Effect()
    updateSoujournPayments$ = this.actions$.ofType(paymentsActions.UPDATE_SOUJOURN_PAYMENTS)
        .pipe(
            switchMap((action: paymentsActions.UpdateSoujournPayments) => {

                let actions: paymentsActions.PaymentsAction[] = [];

                const deposit = (action.changes.price.value * action.changes.deposit) / 100;
                const bail = action.changes.bail.value;

                let payments: Payment[] = this.paymentsService.findByAndBy(
                    {
                        'nomenclature.id': action.old.id,
                        'nomenclature.type': 'Réservation'
                    }
                );

                let depositPayment: Payment = payments.find(payment => {
                    return payment.type.id === 1;
                });
                let bailPayment: Payment = payments.find(payment => {
                    return payment.type.id === 3;
                });
                let soldePayment: Payment = payments.find(payment => {
                    return payment.type.id === 2;
                });
                let refundPayment: Payment = payments.find(payment => {
                    return payment.type.id === 9;
                });
                const total = action.changes.price.value - deposit;
                if (soldePayment) {
                    soldePayment = { ...soldePayment };
                    soldePayment.price.value = total;
                    actions.push(new paymentsActions.UpdatePayment(soldePayment.id, soldePayment));
                }

                if (depositPayment && deposit == 0 && action.old.deposit != 0) {
                    actions.push(new paymentsActions.DeletePayment(depositPayment.id));
                }
                if (deposit != 0 && action.old.deposit == 0) {
                    depositPayment = this.paymentsService.createDepositPayment(deposit, action.changes, this.paymentsService.getStatus(2), false);
                    actions.push(new paymentsActions.CreatePayment(depositPayment));
                }

                if (bailPayment && bail == 0 && action.old.bail.value != 0) {
                    actions.push(new paymentsActions.DeletePayment(bailPayment.id));
                    if (refundPayment) {
                        actions.push(new paymentsActions.DeletePayment(refundPayment.id));
                    }
                }
                if (bail != 0 && action.old.bail.value == 0) {
                    bailPayment = this.paymentsService.createBailPayment(bail, action.changes, this.paymentsService.getStatus(2), false);
                    const refundPayment = this.paymentsService.createRefundPayment(bail, action.changes, this.paymentsService.getStatus(2), false);
                    actions.push(new paymentsActions.CreatePayment(bailPayment));
                    actions.push(new paymentsActions.CreatePayment(refundPayment));
                }

                return of(actions);
            }),
            switchMap((actions: paymentsActions.PaymentsAction[]) => actions)
        );
}