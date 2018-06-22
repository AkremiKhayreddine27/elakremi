import { Injectable } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs/Subject';
import * as faker from 'faker';
import { DateService } from './date.service';

export interface Payment {
    id: number,
    type: {
        label: string,
        value: string,
        isIncome: boolean,
        isOutgo: boolean
    },
    description: string,
    paymentDate: any,
    deadlineDate: any,
    amount: number,
    tva: string,
    status: string,
    method: string,
    payer: {
        firstname: string,
        lastname: string
    }
}

@Injectable()
export class PaymentService {

    refresh: Subject<any> = new Subject();

    source: LocalDataSource = new LocalDataSource();

    public types: any[] = [
        {
            label: 'Acompte',
            value: 'Acompte',
            isIncome: true,
            isOutgo: false
        },
        {
            label: 'Caution',
            value: 'Caution',
            isIncome: true,
            isOutgo: false
        },
        {
            label: 'Frais séjour',
            value: 'Frais séjour',
            isIncome: false,
            isOutgo: true
        },
        {
            label: 'Taxe séjour',
            value: 'Taxe séjour',
            isIncome: true,
            isOutgo: false
        },
        {
            label: 'Séjour',
            value: 'Séjour',
            isIncome: true,
            isOutgo: false
        },
        {
            label: 'Frais de service',
            value: 'Frais de service',
            isIncome: false,
            isOutgo: true
        },
        {
            label: 'Frais de retard',
            value: 'Frais de retard',
            isIncome: false,
            isOutgo: true
        },
        {
            label: 'Remise',
            value: 'Remise',
            isIncome: false,
            isOutgo: true
        },
        {
            label: 'Remboursement',
            value: 'Remboursement',
            isIncome: true,
            isOutgo: false
        },
        {
            label: 'Régulation de charge',
            value: 'Régulation de charge',
            isIncome: true,
            isOutgo: false
        },
        {
            label: 'Autre revenu',
            value: 'Autre revenu',
            isIncome: true,
            isOutgo: false
        },
        {
            label: 'Service',
            value: 'Service',
            isIncome: false,
            isOutgo: true
        },
        {
            label: 'Autre dépense',
            value: 'Autre dépense',
            isIncome: false,
            isOutgo: true
        }
    ];

    public defaultType = { label: 'Choisir un Type', value: 'Choisir un Type' };

    public statuses = [
        {
            label: 'payé',
            value: 'payé'
        },
        {
            label: 'à payer',
            value: 'à payer'
        },
        {
            label: 'partiel',
            value: 'partiel'
        },
        {
            label: 'en retard',
            value: 'en retard'
        }
    ];

    public defaultStatus = { label: 'Choisir une statut', value: 'Choisir une statut' };

    public methods = [
        {
            label: 'Carte de crédit',
            value: 'Carte de crédit'
        },
        {
            label: 'Espèces',
            value: 'Espèces'
        },
        {
            label: 'Chèque',
            value: 'Chèque'
        },
        {
            label: 'Prélèvement',
            value: 'Prélèvement'
        },
        {
            label: 'Virement',
            value: 'Virement'
        }
    ];

    public defaultMethod = { label: 'Choisir le mode de paiement', value: 'Choisir le mode de paiement' };

    public tvas = [
        {
            label: '3%',
            value: '3%'
        },
        {
            label: '4%',
            value: '4%'
        },
        {
            label: '5%',
            value: '5%'
        },
        {
            label: '6%',
            value: '6%'
        }
    ];

    public defaultTva = this.tvas[0];

    public defaultPayer = {
        label: 'Choisir le payeur',
        value: 'Choisir le payeur'
    };

    public payment: Payment = {
        id: faker.random.number(),
        type: null,
        description: null,
        paymentDate: null,
        deadlineDate: null,
        amount: null,
        tva: null,
        status: null,
        method: null,
        payer: null
    }

    constructor(private dateService: DateService) {

    }

    public setPayment(payment: Payment) {
        let newPayment = { ...payment };
        newPayment.paymentDate = this.dateService.convertDate(newPayment.paymentDate);
        newPayment.deadlineDate = this.dateService.convertDate(newPayment.deadlineDate);
        return newPayment;
    }

    getPayers(toPay: any) {
        let payers = [];
        let contact = toPay.lodger ? toPay.lodger : toPay.provider;
        let contactType = toPay.lodger ? 'Locataire' : 'Prestataire de service';
        payers.push({ label: contact.firstname + ' ' + contact.lastname + ' ( ' + contactType + ' )', value: contact.firstname + ' ' + contact.lastname + ' ( ' + contactType + ' )', slug: contact });
        payers.push({ label: toPay.property.owner.firstname + ' ' + toPay.property.owner.lastname + ' ( Propriétaire )', value: toPay.property.owner.firstname + ' ' + toPay.property.owner.lastname + ' ( Propriétaire )', slug: toPay.property.owner });
        return payers;
    }

    getDefaultPayer(toPay: any, payment: Payment) {
        let payer = {};
        let contact = toPay.lodger ? toPay.lodger : toPay.provider;
        let contactType = toPay.lodger ? 'Locataire' : 'Prestataire de service';
        if (payment.payer) {
            if (contact.firstname === payment.payer.firstname && contact.lastname === payment.payer.lastname) {
                payer = {
                    label: contact.firstname + ' ' + contact.lastname + ' ( ' + contactType + ' )',
                    value: contact.firstname + ' ' + contact.lastname + ' ( ' + contactType + ' )'
                };
            } else {
                payer = {
                    label: toPay.property.owner.firstname + ' ' + toPay.property.owner.lastname + ' ( Propriétaire )',
                    value: toPay.property.owner.firstname + ' ' + toPay.property.owner.lastname + ' ( Propriétaire )',
                };
            }
        } else {
            payer = this.defaultPayer;
        }

        return payer;
    }

    getFiltredType(type, payment: Payment) {
        if (payment.type) {
            if (payment.type.isOutgo) {
                return this.types.filter(type => {
                    return type.isOutgo;
                });
            } else {
                return this.types.filter(type => {
                    return type.isIncome;
                });
            }
        } else {
            if (type === 'Dépense') {
                return this.types.filter(type => {
                    return type.isOutgo;
                });
            } else {
                return this.types.filter(type => {
                    return type.isIncome;
                });
            }
        }
    }

    add(payment: Payment, toPay) {
        payment.id = faker.random.number();
        toPay.payments.push(payment);
    }

    update(id, payment, toPay) {
        toPay.payments = toPay.payments.map(p => {
            if (p.id === id) {
                payment.id = id;
                p = payment;
            }
            return p;
        });
        this.refresh.next(toPay.payments);
    }

    remove(payment, toPay) {
        toPay.payments = toPay.payments.filter(p => {
            return p.id !== payment.id;
        });
        this.refresh.next(toPay.payments);
    }
}