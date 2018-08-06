import { Injectable } from '@angular/core';
import * as faker from 'faker';
import { Payment, User, SelectItem, Reservation, Service } from './models';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { DataService } from './data.abstract';
import * as dateFns from 'date-fns';

@Injectable()
export class PaymentService extends DataService {

    public types: SelectItem[] = [
        {
            id: 1,
            value: 'Acompte Séjour',
            isIncome: true,
            isOutgo: false,
            reservation: true,
            service: false,
        },
        {
            id: 2,
            value: 'Solde Séjour',
            isIncome: true,
            isOutgo: false,
            reservation: true,
            service: false,
        },
        {
            id: 3,
            value: 'Caution',
            isIncome: true,
            isOutgo: false,
            reservation: true,
            service: false,
        },
        {
            id: 4,
            value: 'Frais Séjour',
            isIncome: true,
            isOutgo: false,
            reservation: true,
            service: false,
        },
        {
            id: 5,
            value: 'Remboursement',
            isIncome: true,
            isOutgo: false,
            reservation: true,
            service: true,
        },
        {
            id: 6,
            value: 'Taxe Séjour',
            isIncome: false,
            isOutgo: true,
            reservation: true,
            service: false,
        },
        {
            id: 7,
            value: 'Remise Séjour',
            isIncome: false,
            isOutgo: true,
            reservation: true,
            service: false,
        },
        {
            id: 8,
            value: 'Frais Service',
            isIncome: false,
            isOutgo: true,
            reservation: true,
            service: false,
        },
        {
            id: 9,
            value: 'Remboursement',
            isIncome: false,
            isOutgo: true,
            reservation: true,
            service: true,
        },
        {
            id: 10,
            value: 'Charge déductible',
            isIncome: false,
            isOutgo: true,
            reservation: false,
            service: true,
        },
        {
            id: 11,
            value: 'Charge non déductible',
            isIncome: false,
            isOutgo: true,
            reservation: false,
            service: true,
        },
        {
            id: 12,
            value: 'Autre dépense',
            isIncome: false,
            isOutgo: true,
            reservation: true,
            service: true,
        },
        {
            id: 13,
            value: 'Régularisation de charges',
            isIncome: true,
            isOutgo: false,
            reservation: false,
            service: true,
        },
        {
            id: 14,
            value: 'Autre revenue',
            isIncome: true,
            isOutgo: false,
            reservation: true,
            service: true,
        },
    ];

    public statuses: SelectItem[] = [
        {
            id: 1,
            value: 'Reglé',
            cssClass: 'badge-success',
        },
        {
            id: 2,
            value: 'En attente',
            cssClass: 'badge-primary',
        },
        {
            id: 3,
            value: 'En retard',
            cssClass: 'badge-danger',
        },
        {
            id: 4,
            value: 'Annulé',
            cssClass: 'badge-danger',
        },
        {
            id: 5,
            value: 'En litige',
            cssClass: 'badge-warning',
        },
    ];

    public methods: SelectItem[] = [
        {
            id: 1,
            value: 'Carte de crédit',
        },
        {
            id: 2,
            value: 'Espèces',
        },
        {
            id: 3,
            value: 'Chèque',
        },
        {
            id: 4,
            value: 'Prélèvement',
        },
        {
            id: 5,
            value: 'Virement',
        }
    ];

    constructor() {
        super();
    }

    getStatuses(): Observable<SelectItem[]> {
        return of(this.statuses).pipe(delay(500));
    }

    getStatus(id: number): SelectItem {
        return this.statuses.find(status => {
            return status.id === id;
        });
    }

    getTypes(): Observable<SelectItem[]> {
        return of(this.types).pipe(delay(500));
    }

    getMethods(): Observable<SelectItem[]> {
        return of(this.methods).pipe(delay(500));
    }


    getType(id: number): SelectItem {
        return this.types.find(type => {
            return type.id === id;
        });
    }

    createServicePayments(service: Service): Payment[] {
        let payments: Payment[];
        switch (service.frequency.id) {
            case 1:
                payments = [];
                break;
            case 2:
                payments = this.createTimetablePayments(service.deadline, service.end, 1, service);
                break;
            case 3:
                payments = this.createTimetablePayments(service.deadline, service.end, 2, service);
                break;
            case 4:
                payments = this.createTimetablePayments(service.deadline, service.end, 3, service);
                break;
            case 5:
                payments = this.createTimetablePayments(service.deadline, service.end, 6, service);
                break;
            case 6:
                payments = this.createTimetablePayments(service.deadline, service.end, 12, service);
                break;
        }
        return payments;
    }

    createTimetablePayments(start: Date, end: Date, frequency: number, nomenclature: Service): Payment[] {
        const payments: Payment[] = [];
        for (let date = start; dateFns.isBefore(date, end); date = dateFns.addMonths(date, frequency)) {
            const payment = this.generate({ type: this.getType(8), status: this.getStatus(2), nomenclature: nomenclature, nomenclatureType: 'Service', price: nomenclature.price.value, deadlineDate: date });
            payments.push(payment);
        }
        return payments;
    }

    createSojournPayments(reservation: Reservation, forNew: boolean = false): Payment[] {
        const payments: Payment[] = [];
        let price = (reservation.price.value * reservation.deposit) / 100;
        const status = forNew ? this.statuses[1] : this.statuses[0];
        if (reservation.deposit > 0) {
            payments.push(this.createDepositPayment(price, reservation, status));
        }
        price = reservation.price.value - price;
        payments.push(this.createSoldePayment(price, reservation, status));
        if (reservation.bail.value > 0) {
            payments.push(this.createBailPayment(reservation.bail.value, reservation, status));
            payments.push(this.createRefundPayment(reservation.bail.value, reservation, status));
        }
        return payments;
    }

    createSoldePayment(price: number, reservation: Reservation, status: SelectItem) {
        return this.generate({ type: this.getType(2), nomenclatureType: 'Réservation', status: status, nomenclature: reservation, price: price });
    }

    createDepositPayment(price: number, reservation: Reservation, status: SelectItem) {
        return this.generate({ type: this.getType(1), nomenclatureType: 'Réservation', status: status, nomenclature: reservation, price: price });
    }

    createBailPayment(price: number, reservation: Reservation, status: SelectItem) {
        return this.generate({ type: this.getType(3), nomenclatureType: 'Réservation', status: status, nomenclature: reservation, price: price });
    }

    createRefundPayment(price: number, reservation: Reservation, status: SelectItem) {
        return this.generate({ type: this.getType(9), nomenclatureType: 'Réservation', status: status, nomenclature: reservation, price: price });
    }

    generate(args) {
        const payment: Payment = {
            id: faker.random.number(),
            description: faker.lorem.paragraph(),
            price: {
                value: args.price,
                currency: {
                    symbol: '€',
                    code: 'EUR'
                }
            },
            tva: faker.random.number(20),
            status: args.status,
            method: faker.random.arrayElement(this.methods),
            type: args.type,
            paymentDate: args.status.id === 1 ? dateFns.isAfter(args.nomenclature.start, new Date()) ? new Date() : args.nomenclature.start : null,
            deadlineDate: args.deadlineDate ? args.deadlineDate : args.nomenclature.start,
            payer: args.type.isOutgo ? args.nomenclature.property.owner : args.nomenclature.lodger ? args.nomenclature.lodger : args.nomenclature.provider,
            payee: args.type.isIncome ? args.nomenclature.property.owner : args.nomenclature.lodger ? args.nomenclature.lodger : args.nomenclature.provider,
            nomenclature: { type: args.nomenclatureType, id: args.nomenclature.id },
            propertyId: args.nomenclature.property.id
        };
        this.data.push(payment);
        return payment;
    }

    createPayments(nbr: number, reservation: Reservation): Payment[] {
        const payments: Payment[] = [];
        for (let n = 3; n < nbr + 3; n++) {
            const price = Number.parseInt(faker.finance.amount());
            payments.push(this.generate({ type: this.types[n], status: faker.random.arrayElement(this.statuses), nomenclature: reservation, price: price }));
        }
        return payments;
    }

    getNomenclatures(data: any[], type = null) {
        const nomenclatures: any[] = [];
        if (type === 'Réservation' || !type) {
            data.map(reservation => {
                nomenclatures.push({ id: reservation.id, type: 'Réservation' });
            });
        }
        if (type === 'Service' || !type) {
            data.map((service: any) => {
                nomenclatures.push({ id: service.id, type: 'Service' });
            });
        }
        return nomenclatures;
    }

    getNomenclature(data: any[], id) {
        return data.find((item: any) => {
            return item.id === id;
        });
    }

    getPayers(toPay: any, mode): Observable<User[]> {
        const payers: User[] = [mode === 'Dépense' ? toPay.property.owner : toPay.lodger ? toPay.lodger : toPay.provider];
        return of(payers).pipe(delay(500));
    }

    getFiltredType(type, nomenclature = null): SelectItem[] {
        let types = [];
        if (nomenclature && nomenclature.type === 'Réservation') {
            types = this.types.filter(t => {
                return t.reservation;
            });
        } else if (nomenclature && nomenclature.type === 'Service') {
            types = this.types.filter(t => {
                return t.service;
            });
        } else {
            types = this.types;
        }
        if (type === 'Dépense') {
            return types.filter(t => {
                return t.isOutgo;
            });
        } else {
            return types.filter(t => {
                return t.isIncome;
            });
        }
    }

    calculateRevenues(payment: Payment): number {
        let revenue = 0;
        if (payment.type.isIncome) {
            if (payment.status.id === 1) {
                revenue = revenue + payment.price.value;
            }

        }
        return revenue;
    }

    calculateExpenses(payment: Payment): number {
        let expenses = 0;
        if (payment.type.isOutgo) {
            if (payment.status.id === 1) {
                expenses = expenses + payment.price.value;
            }
        }
        return expenses;
    }

}
