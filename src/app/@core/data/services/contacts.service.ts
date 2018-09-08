import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import * as faker from 'faker';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';
import { DataService } from './data.abstract';
import { SelectItem } from '../models';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class ContactsService extends DataService {

    public roles: SelectItem[] = [
        { id: 1, value: 'propriétaire' },
        { id: 2, value: 'locataire' },
        { id: 3, value: 'prestataire de service' },
    ];

    getRoles(): Observable<SelectItem[]> {
        return of(this.roles).pipe(delay(500));
    }

    getRole(id: number): SelectItem {
        return this.roles.find(type => {
            return type.id === id;
        });
    }

    constructor(public afAuth: AngularFireAuth,
        public db: AngularFirestore) {
        super(afAuth, db);
    }

    generate(args) {
        let contact = {
            uid: faker.random.number(),
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            role: this.getRole(args.role),
            phone: faker.phone.phoneNumber(),
            location: {
                country: 'France',
                city: 'Issy-les-Moulineaux',
                state: 'Ile-de-France',
                address: 'Info Municipale, Chemin de Bretagne',
                longitude: 2.2582740783036575,
                latitude: 48.82377450294101,
                postcode: '92130',
                isValid: true
            }
        };
        this.data.push(contact);
        return contact;
    }
}
