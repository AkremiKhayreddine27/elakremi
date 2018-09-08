import { createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromPayments from './payments.selector';
import * as fromReservations from './reservations.selector';
import { Payment, Reservation, Property } from '../../@core/data/models';
import { Pagination, FilterConf, sort, filter, paginate } from '../helpers';
import { Dictionary } from '@ngrx/entity';
import * as dateFns from 'date-fns';

export const getStatsByYear = (start: Date = dateFns.startOfYear(new Date()), end: Date = new Date()) => createSelector(
    fromPayments.getPaymentsState,
    (state) => {
        let years = [];
        for (let date = start; dateFns.isBefore(date, end) || dateFns.isEqual(date, end); date = dateFns.addYears(date, 1)) {
            let revenues = 0;
            let expenses = 0;
            calculateStats(filter(state.filters, Object.keys(state.entities).map(id => state.entities[id])), start, end).map(month => {
                revenues = revenues + month.revenues;
                expenses = expenses + month.expenses;
            });
            const solde = revenues - expenses;
            let year = {
                name: dateFns.format(date, 'YYYY'),
                active: date.getFullYear() === new Date().getFullYear(),
                months: calculateStats(filter(state.filters, Object.keys(state.entities).map(id => state.entities[id])), start, end),
                revenues: revenues,
                expenses: expenses,
                solde
            }
            years.push(year);
        }
        return years;
    }
);

export const getStatsByMonth = (start: Date = dateFns.startOfYear(new Date()), end: Date = new Date()) => createSelector(
    fromPayments.getPaymentsState,
    (state) => {
        return calculateStats(filter(state.filters, Object.keys(state.entities).map(id => state.entities[id])), start, end);
    }
);

export const getRevenuesByPlatforms = (platforms) => createSelector(
    fromReservations.getReservationsState,
    (state) => {
        return [...platforms].map(platform => {
            let p = { ...platform };
            p.revenues = 0;
            filter(state.filters, Object.keys(state.entities).map(id => state.entities[id])).map((reservation: Reservation) => {
                if (p.id === reservation.platform.id) {
                    p.revenues = p.revenues + reservation.adjusted.value;
                }
            });
            return p;
        });
    }
)

export const getTotalNbrNightsByPlatforms = (platforms) => createSelector(
    fromReservations.getReservationsState,
    (state) => {
        return [...platforms].map(platform => {
            let p = { ...platform };
            p.nbrNights = 0;
            filter(state.filters, Object.keys(state.entities).map(id => state.entities[id])).map((reservation: Reservation) => {
                if (p.id === reservation.platform.id) {
                    p.nbrNights = p.nbrNights + dateFns.differenceInDays(reservation.end, reservation.start);
                }
            });
            return p;
        });
    }
)

export const getTotalNbrNights = createSelector(
    fromReservations.getReservationsState,
    (state) => {
        let nbrNights = 0;
        filter(state.filters, Object.keys(state.entities).map(id => state.entities[id])).map((reservation: Reservation) => {
            nbrNights = nbrNights + dateFns.differenceInDays(reservation.end, reservation.start);
        });
        return nbrNights;
    }
);

export const getFinances = createSelector(
    fromPayments.getPaymentsState,
    (state) => {
        let finances = {
            expenses: 0,
            potentialExpenses: 0,
            inDelayExpenses: 0,
            pendingExpenses: 0,
            revenue: 0,
            potentialRevenue: 0,
            inDelayRevenue: 0,
            pendingRevenue: 0
        };
        if (state && state.filters && state.filters.filters) {
            filter(state.filters, Object.keys(state.entities)
                .map(id => state.entities[id])).map(payment => {
                    finances = calculateIncome(finances, payment);
                    finances = calculateExpenses(finances, payment);
                });
        } else {
            Object.keys(state.entities)
                .map(id => state.entities[id])
                .map(payment => {
                    finances = calculateIncome(finances, payment);
                    finances = calculateExpenses(finances, payment);
                });
        }

        return finances;
    }
)

function calculateStats(payments, start, end) {
    let months = [];
    for (let date = start; dateFns.isBefore(date, end); date = dateFns.addMonths(date, 1)) {
        let month = { name: dateFns.format(date, 'MMM'), revenues: 0, expenses: 0, solde: 0 };
        payments.map((payment: Payment) => {
            if (dateFns.isWithinRange(payment.paymentDate, dateFns.startOfMonth(date), dateFns.endOfMonth(date)) && payment.type.isOutgo && payment.status.id === 1) {
                month.expenses = month.expenses + payment.price.value;
            } else if (dateFns.isWithinRange(payment.paymentDate, dateFns.startOfMonth(date), dateFns.endOfMonth(date)) && payment.type.isIncome && payment.status.id === 1) {
                month.revenues = month.revenues + payment.price.value;
            }
        });
        month.solde = month.revenues - month.expenses;
        months.push(month);
    }
    return months;
}

function calculateIncome(finances, payment) {
    if (payment.type.isIncome) {
        switch (payment.status.id) {
            case (1):
                finances.revenue = finances.revenue + payment.price.value;
                finances.potentialRevenue = finances.potentialRevenue + payment.price.value;
                break;
            case (2):
                finances.pendingRevenue = finances.pendingRevenue + payment.price.value;
                finances.potentialRevenue = finances.potentialRevenue + payment.price.value;
                break;
            case (3):
                finances.inDelayRevenue = finances.inDelayRevenue + payment.price.value;
                finances.potentialRevenue = finances.potentialRevenue + payment.price.value;
                break;
        }
    }
    return finances;
}

function calculateExpenses(finances, payment) {
    if (payment.type.isOutgo) {
        switch (payment.status.id) {
            case 1:
                finances.expenses = finances.expenses + payment.price.value;
                finances.potentialExpenses = finances.potentialExpenses + payment.price.value;
                break;
            case 2:
                finances.pendingExpenses = finances.pendingExpenses + payment.price.value;
                finances.potentialExpenses = finances.potentialExpenses + payment.price.value;
                break;
            case 3:
                finances.inDelayExpenses = finances.inDelayExpenses + payment.price.value;
                finances.potentialExpenses = finances.potentialExpenses + payment.price.value;
                break;
        }
    }
    return finances;
}