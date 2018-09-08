import { Injectable } from '@angular/core';
import * as faker from 'faker';
import * as dateFns from 'date-fns';
import { PaymentService } from './payment.service';
import { DocumentsService } from './documents.service';
import { TariffsService } from './tariffs.service';
import { Reservation, SelectItem, User, Payment, Property } from '../models';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { PropertyService } from './property.service';
import { DataService } from './data.abstract';
import { ContactsService } from './contacts.service';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
 
@Injectable()
export class ReservationsService extends DataService {

    public statuses: SelectItem[] = [
        { id: 1, value: 'validée', cssClass: 'badge-success' },
        { id: 2, value: 'provisoire', cssClass: 'badge-warning' },
        { id: 3, value: 'annulée', cssClass: 'badge-danger' },
        { id: 4, value: 'terminée', cssClass: 'badge-info' }
    ];

    public platforms: SelectItem[] = [
        { id: 1, value: 'Airbnb' },
        { id: 2, value: 'Abritel' },
        { id: 3, value: 'Autre' },
        { id: 4, value: 'EasyLocatus' }
    ];

    constructor(
        private paymentService: PaymentService,
        private documentsService: DocumentsService,
        private tariffsService: TariffsService,
        private contactService: ContactsService,
        public afAuth: AngularFireAuth,
        public db: AngularFirestore
    ) {
        super(afAuth, db);
    }

    getStatuses(): Observable<SelectItem[]> {
        return of(this.statuses).pipe(delay(500));
    }

    getStatus(id: number): SelectItem {
        return this.statuses.find(status => {
            return status.id === id;
        });
    }

    getPlatforms(): Observable<SelectItem[]> {
        return of(this.platforms).pipe(delay(500));
    }

    getPlatform(id: number): SelectItem {
        return this.platforms.find(status => {
            return status.id === id;
        });
    }

    generateReservations(nbr: number, tariff: any, owner: User, property: Property): Reservation[] {
        let reservations: Reservation[] = [];
        let deadline = dateFns.addDays(new Date(), 35);
        let start = dateFns.addDays(new Date(), 28);
        let end = dateFns.addDays(start, 14);
        for (let n = 0; n < nbr; n++) {
            const id = faker.random.number();
            deadline = dateFns.subDays(deadline, 14);
            start = dateFns.subDays(start, 14);
            end = dateFns.subDays(end, 14);
            let status: SelectItem = faker.random.arrayElement(this.statuses.filter(s => { return s.value !== 'terminée' }));
            if (dateFns.isBefore(start, new Date()) && dateFns.isBefore(end, new Date())) {
                status = this.statuses.find(s => {
                    return s.value === 'terminée';
                });
            }
            const amount = dateFns.differenceInDays(end, start) * tariff;
            let balance = 0;
            let adjusted = 0;
            let reservation: Reservation = {
                id: id,
                kind: 'Réservation',
                title: faker.lorem.sentence(),
                description: faker.lorem.paragraph(),
                status: { id: status.id, value: status.value, cssClass: status.cssClass },
                start: start,
                end: end,
                reservationDate: new Date(),
                deadlineDate: deadline,
                createdAt: new Date(),
                updatedAt: new Date(),
                price: {
                    value: amount,
                    currency: {
                        symbol: '€',
                        code: 'EUR'
                    }
                },
                adjusted: {
                    value: adjusted,
                    currency: {
                        symbol: '€',
                        code: 'EUR'
                    }
                },
                balance: {
                    value: balance,
                    currency: {
                        symbol: '€',
                        code: 'EUR'
                    }
                },
                deposit: 20,
                bail: {
                    value: this.tariffsService.findFirstBy('property.id', property.id).bail,
                    currency: {
                        symbol: '€',
                        code: 'EUR'
                    }
                },
                nbrAdultes: faker.random.number(10),
                nbrChildren: faker.random.number(10),
                nbrPets: faker.random.number(10),
                lodger: this.contactService.generate({ role: 2 }),
                property: { ...property },
                platform: faker.random.arrayElement(this.platforms)
            };
            this.documentsService.generateDocuments(1, 2, reservation, '/pages/reservations/' + reservation.id + '/edit');
            let payments = this.paymentService.createSojournPayments(reservation);
            reservation.balance.value = this.calculateBalance(payments);
            reservation.adjusted.value = this.calculateAdjusted(payments);
            reservation.nbrNight = dateFns.differenceInDays(reservation.end, reservation.start) + ' nuitées';
            reservations.push(reservation);
        }
        return reservations;
    }

    calculateBalance(payments: Payment[]): number {
        let balance = 0;
        payments.map(payment => {
            if (payment.type.isOutgo) {
                balance = balance - payment.price.value;
            } else {
                balance = balance + payment.price.value;
            }
        });
        return balance;
    }

    calculateAdjusted(payments: Payment[]): number {
        let balance = 0;
        payments.map(payment => {
            if (payment.type.isOutgo && payment.status.id === 1) {
                balance = balance - payment.price.value;
            } else if (payment.type.isIncome && payment.status.id === 1) {
                balance = balance + payment.price.value;
            }
        });
        return balance;
    }

    getTotalNbrNights(propertyId, start: Date = dateFns.startOfYear(new Date()), end: Date = new Date()): number {
        let nbrNights = 0;
        this.findBy('property.id', propertyId).map((reservation: Reservation) => {
            if (dateFns.isWithinRange(reservation.start, start, end)) {
                nbrNights = nbrNights + dateFns.differenceInDays(reservation.end, reservation.start);
            }
        });
        return nbrNights;
    }

    getTotalNbrNightsByPlatforms(propertyId, start: Date = dateFns.startOfYear(new Date()), end: Date = new Date()): any {
        return this.platforms.map(platform => {
            platform.nbrNights = 0;
            this.findBy('property.id', propertyId).map((reservation: Reservation) => {
                if (dateFns.isWithinRange(reservation.start, start, end)) {
                    if (platform.id === reservation.platform.id) {
                        platform.nbrNights = platform.nbrNights + dateFns.differenceInDays(reservation.end, reservation.start);
                    }
                }
            });
            return platform;
        });
    }

    getRevenuesByPlatforms(propertyId, start: Date = dateFns.startOfYear(new Date()), end: Date = new Date()): any {
        return this.platforms.map(platform => {
            platform.revenues = 0;
            this.findBy('property.id', propertyId).map((reservation: Reservation) => {
                if (dateFns.isWithinRange(reservation.start, start, end)) {
                    if (platform.id === reservation.platform.id) {
                        platform.revenues = platform.revenues + reservation.adjusted.value;
                    }
                }
            });
            return platform;
        });
    }

    initFilters(propertyService: PropertyService) {
        let properties = of(propertyService.properties.map(property => {
            return { id: property.id, value: property.title };
        })).pipe(delay(500));
        let property = { id: propertyService.currentProperty.id, value: propertyService.currentProperty.title };
        const statuses = this.getStatuses();
        return [
            {
                name: 'property',
                type: 'select',
                field: 'property',
                element: property,
                elements: properties,
                placeholder: 'Choisir un bien',
                callback: function (cell: any, search: any) {
                    if (cell.id.toString() === search) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            {
                name: 'status',
                type: 'select',
                field: 'status',
                placeholder: 'Choisir un statut',
                elements: statuses,
                callback: function (cell: any, search: any) {
                    if (cell.id.toString() === search) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            {
                name: 'platform',
                type: 'select',
                field: 'platform',
                placeholder: 'Choisir une platform',
                elements: this.getPlatforms(),
                callback: function (cell: any, search: any) {
                    if (cell.id.toString() === search) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            { type: 'datepicker' }
        ];
    }

    initSort(source) {
        let direction = 'desc';
        source.setSort([
            {
                field: 'start',
                direction: direction,
                compare: function (direction: any, a: any, b: any) {

                    let f = a.value || a.value === 0 ? a.value : a;
                    let s = b.value || b.value === 0 ? b.value : b;

                    let first = typeof f === 'string' ? f.toLowerCase() : f;
                    let second = typeof s === 'string' ? s.toLowerCase() : s;

                    if (first < second) {
                        return -1 * direction;
                    }
                    if (first > second) {
                        return direction;
                    }
                    return 0;
                }
            }
        ]);
    }

    getRevenuesByMonth(reservations, start: Date = dateFns.startOfYear(new Date()), end: Date = new Date()) {
        let months = [];
        for (let date = start; dateFns.isBefore(date, end); date = dateFns.addMonths(date, 1)) {
            let month = { name: dateFns.format(date, 'MMM'), revenues: 0 };
            reservations
                .filter((reservation: Reservation) => {
                    return dateFns.isWithinRange(reservation.start, dateFns.startOfMonth(date), dateFns.endOfMonth(date))
                })
                .map((reservation: Reservation) => {
                    month.revenues = month.revenues + reservation.adjusted.value;
                });
            months.push(month);
        }
        return months;
    }

    getExpensesByMonth(reservations, start: Date = dateFns.startOfYear(new Date()), end: Date = new Date()) {
        let months = [];
        for (let date = start; dateFns.isBefore(date, end); date = dateFns.addMonths(date, 1)) {
            let month = { name: dateFns.format(date, 'MMM'), revenues: 0 };
            reservations
                .filter((reservation: Reservation) => {
                    return dateFns.isWithinRange(reservation.start, dateFns.startOfMonth(date), dateFns.endOfMonth(date))
                })
                .map((reservation: Reservation) => {
                    this.paymentService.findBy('nomenclature.id', reservation.id)
                        .filter((payment: Payment) => {
                            return payment.type.isOutgo;
                        })
                        .map((payment: Payment) => {
                            month.revenues = month.revenues + payment.price.value;
                        });
                });
            months.push(month);
        }
        return months;
    }

    getRevenuesByYear(propertyId, start: Date = dateFns.subYears(new Date(), 1), end: Date = new Date()) {
        let years = [];
        let reservations = this.findBy('property.id', propertyId);
        for (let date = start; dateFns.isBefore(date, end) || dateFns.isEqual(date, end); date = dateFns.addYears(date, 1)) {
            let revenues = 0;
            this.getRevenuesByMonth(reservations, dateFns.startOfYear(date), dateFns.endOfYear(date)).map(month => {
                revenues = revenues + month.revenues;
            });
            let year = {
                title: dateFns.format(date, 'YYYY'),
                active: date.getFullYear() === new Date().getFullYear(),
                months: this.getRevenuesByMonth(reservations, dateFns.startOfYear(date), dateFns.endOfYear(date)),
                revenues: revenues
            }
            years.push(year);
        }
        return years;
    }

    getExpensesByYear(propertyId, start: Date = dateFns.subYears(new Date(), 1), end: Date = new Date()) {
        let years = [];
        let reservations = this.findBy('property.id', propertyId);
        for (let date = start; dateFns.isBefore(date, end) || dateFns.isEqual(date, end); date = dateFns.addYears(date, 1)) {
            let revenues = 0;
            this.getExpensesByMonth(reservations, dateFns.startOfYear(date), dateFns.endOfYear(date)).map(month => {
                revenues = revenues + month.revenues;
            });
            let year = {
                title: dateFns.format(date, 'YYYY'),
                active: date.getFullYear() === new Date().getFullYear(),
                months: this.getExpensesByMonth(reservations, dateFns.startOfYear(date), dateFns.endOfYear(date)),
                revenues: revenues
            }
            years.push(year);
        }
        return years;
    }
}