import { Injectable } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Property } from './models/property';
import { Subject } from 'rxjs/Subject';
import { PropertyService } from './property.service';

@Injectable()
export class FinancesService {

    refresh: Subject<any> = new Subject();

    source: LocalDataSource = new LocalDataSource();

    finances = {
        outgoings: [],
        earnings: [],
        outgoingsValue: 0,
        potentialOutgoingsValue: 0,
        earningsValue: 0,
        potentialEarningsValue: 0
    };

    constructor(private propertyService: PropertyService) { }

    getPropertyFinances(property: Property) {
        this.finances = {
            outgoings: [],
            earnings: [],
            outgoingsValue: 0,
            potentialOutgoingsValue: 0,
            earningsValue: 0,
            potentialEarningsValue: 0
        };
        property.reservations.map(reservation => {
            reservation.payments.map(payment => {
                if (payment.type.isIncome) {
                    if (payment.status === 'partiel' || payment.status === 'payé') {
                        this.finances.earningsValue = this.finances.earningsValue + payment.amount;
                    }
                    this.finances.potentialEarningsValue = this.finances.potentialEarningsValue + payment.amount;
                } else if (payment.type.isOutgo) {
                    if (payment.status === 'partiel' || payment.status === 'payé') {
                        this.finances.outgoingsValue = this.finances.outgoingsValue + payment.amount;
                    }
                    this.finances.potentialOutgoingsValue = this.finances.potentialOutgoingsValue + payment.amount;
                }
            });
        });
        property.services.map(service => {
            service.payments.map(payment => {
                if (payment.type.isIncome) {
                    if (payment.status === 'partiel' || payment.status === 'payé') {
                        this.finances.earningsValue = this.finances.earningsValue + payment.amount;
                    }
                    this.finances.potentialEarningsValue = this.finances.potentialEarningsValue + payment.amount;
                } else if (payment.type.isOutgo) {
                    if (payment.status === 'partiel' || payment.status === 'payé') {
                        this.finances.outgoingsValue = this.finances.outgoingsValue + payment.amount;
                    }
                    this.finances.potentialOutgoingsValue = this.finances.potentialOutgoingsValue + payment.amount;
                }
            });
        });
        return this.finances;
    }

    getPropertyPayments(property: Property) {
        let payments = [];
        property.reservations.map(reservation => {
            reservation.payments.map(payment => {
                payments.push(payment);
            });
        });
        property.services.map(service => {
            service.payments.map(payment => {
                payments.push(payment);
            });
        });
        return payments;
    }

    getOutgoNonPayedPayments(property: Property) {
        let amount = 0;
        property.reservations.map(reservation => {
            reservation.payments.map(payment => {
                if (payment.type.isOutgo) {
                    if (payment.status === 'à payer' || payment.status === 'payé') {
                        amount = amount + payment.amount;
                    }
                }
            });
        });
        property.services.map(service => {
            service.payments.map(payment => {
                if (payment.type.isOutgo) {
                    if (payment.status === 'à payer' || payment.status === 'en retard') {
                        amount = amount + payment.amount;
                    }
                }
            });
        });
        return amount;
    }

    getOutgoPayedPayments(property: Property) {
        let amount = 0;
        property.reservations.map(reservation => {
            reservation.payments.map(payment => {
                if (payment.type.isOutgo) {
                    if (payment.status === 'partiel' || payment.status === 'payé') {
                        amount = amount + payment.amount;
                    }
                }
            });
        });
        property.services.map(service => {
            service.payments.map(payment => {
                if (payment.type.isOutgo) {
                    if (payment.status === 'partiel' || payment.status === 'payé') {
                        amount = amount + payment.amount;
                    }
                }
            });
        });
        return amount;
    }

    getIncomePayedPayments(property: Property) {
        let amount = 0;
        property.reservations.map(reservation => {
            reservation.payments.map(payment => {
                if (payment.type.isIncome) {
                    if (payment.status === 'partiel' || payment.status === 'payé') {
                        amount = amount + payment.amount;
                    }
                }
            });
        });
        property.services.map(service => {
            service.payments.map(payment => {
                if (payment.type.isIncome) {
                    if (payment.status === 'partiel' || payment.status === 'payé') {
                        amount = amount + payment.amount;
                    }
                }
            });
        });
        return amount;
    }

    getIncomeNonPayedPayments(property: Property) {
        let amount = 0;
        property.reservations.map(reservation => {
            reservation.payments.map(payment => {
                if (payment.type.isIncome) {
                    if (payment.status === 'à payer' || payment.status === 'payé') {
                        amount = amount + payment.amount;
                    }
                }
            });
        });
        property.services.map(service => {
            service.payments.map(payment => {
                if (payment.type.isIncome) {
                    if (payment.status === 'à payer' || payment.status === 'en retard') {
                        amount = amount + payment.amount;
                    }
                }
            });
        });
        return amount;
    }
}