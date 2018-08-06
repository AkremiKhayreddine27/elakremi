import { Injectable } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Property } from './models/property';
import { Subject } from 'rxjs/Subject';
import { PropertyService } from './property.service';
import { NotificationService } from './notification.service';
import * as dateFns from 'date-fns';
import { Payment } from './models/payment';
import { PaymentService } from './payment.service';

@Injectable()
export class FinancesService {

    refresh: Subject<any> = new Subject();
    refreshPayments: Subject<any> = new Subject();

    source: LocalDataSource = new LocalDataSource();

    finances = {
        expenses: 0,
        potentialExpenses: 0,
        inDelayExpenses: 0,
        pendingExpenses: 0,
        revenue: 0,
        potentialRevenue: 0,
        inDelayRevenue: 0,
        pendingRevenue: 0
    };

    constructor(
        public paymentService: PaymentService,
        public propertyService: PropertyService,
        public notificationService: NotificationService) { }

    getPropertyFinances(property: Property, start: Date = dateFns.startOfYear(new Date()), end: Date = new Date()): any {
        this.finances = {
            expenses: 0,
            potentialExpenses: 0,
            inDelayExpenses: 0,
            pendingExpenses: 0,
            revenue: 0,
            potentialRevenue: 0,
            inDelayRevenue: 0,
            pendingRevenue: 0
        };
        this.paymentService.findBy('propertyId', property.id).filter((payment: Payment) => {
            return dateFns.isWithinRange(payment.paymentDate, start, end);
        }).map(payment => {
            this.calculateIncome(payment);
        });
        this.paymentService.findBy('propertyId', property.id).filter((payment: Payment) => {
            return dateFns.isWithinRange(payment.deadlineDate, start, end);
        }).map(payment => {
            this.calculateExpenses(payment);
        });
        this.refresh.next(this.finances);
        return this.finances;
    }

    calculateIncome(payment) {
        if (payment.type.isIncome) {
            switch (payment.status.id) {
                case (1):
                    this.finances.revenue = this.finances.revenue + payment.price.value;
                    this.finances.potentialRevenue = this.finances.potentialRevenue + payment.price.value;
                    break;
                case (2):
                    this.finances.pendingRevenue = this.finances.pendingRevenue + payment.price.value;
                    this.finances.potentialRevenue = this.finances.potentialRevenue + payment.price.value;
                    break;
                case (3):
                    this.finances.inDelayRevenue = this.finances.inDelayRevenue + payment.price.value;
                    this.finances.potentialRevenue = this.finances.potentialRevenue + payment.price.value;
                    break;
            }
        }
    }

    calculateExpenses(payment) {
        if (payment.type.isOutgo) {
            switch (payment.status.id) {
                case 1:
                    this.finances.expenses = this.finances.expenses + payment.price.value;
                    this.finances.potentialExpenses = this.finances.potentialExpenses + payment.price.value;
                    break;
                case 2:
                    this.finances.pendingExpenses = this.finances.pendingExpenses + payment.price.value;
                    this.finances.potentialExpenses = this.finances.potentialExpenses + payment.price.value;
                    break;
                case 3:
                    this.finances.inDelayExpenses = this.finances.inDelayExpenses + payment.price.value;
                    this.finances.potentialExpenses = this.finances.potentialExpenses + payment.price.value;
                    break;
            }
        }
    }

    getPropertyPayments(property: Property, start: Date = dateFns.startOfYear(new Date()), end: Date = new Date()): LocalDataSource {
        let payments = this.paymentService.findBy('propertyId', property.id).filter(payment => {
            return dateFns.isWithinRange(payment.deadlineDate, start, end);
        }).sort((a, b) => {
            return b.deadlineDate - a.deadlineDate;
        });
        this.source.load(payments);
        this.refreshPayments.next(this.source);
        return this.source;
    }

    getRevenuesByMonth(property, start: Date = dateFns.startOfYear(new Date()), end: Date = new Date()) {
        let months = [];
        for (let date = start; dateFns.isBefore(date, end); date = dateFns.addMonths(date, 1)) {
            let month = { name: dateFns.format(date, 'MMM'), revenues: 0 };
            this.paymentService.findBy('propertyId', property.id)
                .filter((payment: Payment) => {
                    return dateFns.isWithinRange(payment.paymentDate, dateFns.startOfMonth(date), dateFns.endOfMonth(date)) && payment.type.isIncome && payment.status.id === 1;
                })
                .map((payment: Payment) => {
                    month.revenues = month.revenues + payment.price.value;
                });
            months.push(month);
        }
        return months;
    }

    getExpensesByMonth(property, start: Date = dateFns.startOfYear(new Date()), end: Date = new Date()) {
        let months = [];
        for (let date = start; dateFns.isBefore(date, end); date = dateFns.addMonths(date, 1)) {
            let month = { name: dateFns.format(date, 'MMM'), revenues: 0 };
            this.paymentService.findBy('propertyId', property.id)
                .filter((payment: Payment) => {
                    return dateFns.isWithinRange(payment.paymentDate, dateFns.startOfMonth(date), dateFns.endOfMonth(date)) && payment.type.isOutgo && payment.status.id === 1;
                })
                .map((payment: Payment) => {
                    month.revenues = month.revenues + payment.price.value;
                });
            months.push(month);
        }
        return months;
    }

    getRevenuesByYear(property, start: Date = dateFns.subYears(new Date(), 1), end: Date = new Date()) {
        let years = [];
        for (let date = start; dateFns.isBefore(date, end) || dateFns.isEqual(date, end); date = dateFns.addYears(date, 1)) {
            let revenues = 0;
            this.getRevenuesByMonth(property, dateFns.startOfYear(date), dateFns.endOfYear(date)).map(month => {
                revenues = revenues + month.revenues;
            });
            let year = {
                title: dateFns.format(date, 'YYYY'),
                active: date.getFullYear() === new Date().getFullYear(),
                months: this.getRevenuesByMonth(property, dateFns.startOfYear(date), dateFns.endOfYear(date)),
                revenues: revenues
            }
            years.push(year);
        }
        return years;
    }

    getExpensesByYear(property, start: Date = dateFns.subYears(new Date(), 1), end: Date = new Date()) {
        let years = [];
        for (let date = start; dateFns.isBefore(date, end) || dateFns.isEqual(date, end); date = dateFns.addYears(date, 1)) {
            let revenues = 0;
            this.getExpensesByMonth(property, dateFns.startOfYear(date), dateFns.endOfYear(date)).map(month => {
                revenues = revenues + month.revenues;
            });
            let year = {
                title: dateFns.format(date, 'YYYY'),
                active: date.getFullYear() === new Date().getFullYear(),
                months: this.getExpensesByMonth(property, dateFns.startOfYear(date), dateFns.endOfYear(date)),
                revenues: revenues
            }
            years.push(year);
        }
        return years;
    }
}