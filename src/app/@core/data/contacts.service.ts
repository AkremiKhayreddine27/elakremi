import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import * as faker from 'faker';
let counter = 0;

@Injectable()
export class ContactsService {

    contacts = [
        {
            id: 1,
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            role: 'locataire',
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
        },
        {
            id: 2,
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            role: 'locataire',
            phone: faker.phone.phoneNumber(),
            picture: faker.image.avatar(),
            location: {
                longitude: 2.25743508352025,
                latitude: 48.82402879259719,
                city: 'Issy-les-Moulineaux',
                state: 'Ile-de-France',
                postcode: '92130',
                country: 'France',
                address: "KDS, Chemin de Bretagne",
            }
        },
        {
            id: 3,
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            role: 'locataire',
            phone: faker.phone.phoneNumber(),
            location: {
                address: "Groupe Scolaire Robert Doisneau, Rue Jean-Jacques Rousseau",
                longitude: 2.258831978106173,
                latitude: 48.82294452044182,
                country: 'France',
                city: 'Issy-les-Moulineaux',
                state: 'Ile-de-France',
                postcode: '92130',
            },
            picture: faker.image.avatar(),
        },
        {
            id: 4,
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            role: 'locataire',
            phone: faker.phone.phoneNumber(),
            location: {
                address: "Groupe Scolaire Robert Doisneau, Rue Jean-Jacques Rousseau",
                longitude: 2.258831978106173,
                latitude: 48.82294452044182,
                country: 'France',
                city: 'Issy-les-Moulineaux',
                state: 'Ile-de-France',
                postcode: '92130',
            },
            picture: faker.image.avatar(),
        },
        {
            id: 5,
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            role: 'locataire',
            phone: faker.phone.phoneNumber(),
            location: {
                country: 'France',
                city: 'Issy-les-Moulineaux',
                state: 'Ile-de-France',
                address: 'École Le Petit Train Vert, Rue Eugène Atget',
                longitude: 2.2610828884353396,
                latitude: 48.8245832810708,
                postcode: '92130',
                isValid: true
            },
            picture: faker.image.avatar(),
        },
        {
            id: 6,
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            role: 'propriétaire',
            phone: faker.phone.phoneNumber(),
            location: {
                country: 'France',
                city: 'Issy-les-Moulineaux',
                state: 'Ile-de-France',
                address: 'A2B6G9, Place Jacques Madaule',
                longitude: 2.260222434997559,
                latitude: 48.82406340421708,
                postcode: '92130',
                isValid: true
            },
            picture: faker.image.avatar(),
        },
        {
            id: 7,
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            role: 'prestataire de service',
            phone: faker.phone.phoneNumber(),
            location: {
                country: 'France',
                city: 'Issy-les-Moulineaux',
                state: 'Ile-de-France',
                address: '37, Rue du Passeur de Boulogne',
                longitude: 2.259896278119413,
                latitude: 48.82543372005282,
                postcode: '92130',
                isValid: true
            },
            picture: faker.image.avatar(),
        },
        {
            id: 8,
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            role: 'prestataire de service',
            phone: faker.phone.phoneNumber(),
            location: {
                country: 'France',
                city: 'Issy-les-Moulineaux',
                state: 'Ile-de-France',
                address: '37, Rue du Passeur de Boulogne',
                longitude: 2.259896278119413,
                latitude: 48.82543372005282,
                postcode: '92130',
                isValid: true
            },
            picture: faker.image.avatar(),
        },
        {
            id: 9,
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            role: 'prestataire de service',
            phone: faker.phone.phoneNumber(),
            location: {
                country: 'France',
                city: 'Issy-les-Moulineaux',
                state: 'Ile-de-France',
                address: '37, Rue du Passeur de Boulogne',
                longitude: 2.259896278119413,
                latitude: 48.82543372005282,
                postcode: '92130',
                isValid: true
            },
            picture: faker.image.avatar(),
        },
        {
            id: 10,
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            role: 'prestataire de service',
            phone: faker.phone.phoneNumber(),
            location: {
                country: 'France',
                city: 'Issy-les-Moulineaux',
                state: 'Ile-de-France',
                address: '37, Rue du Passeur de Boulogne',
                longitude: 2.259896278119413,
                latitude: 48.82543372005282,
                postcode: '92130',
                isValid: true
            },
            picture: faker.image.avatar(),
        },
        {
            id: 11,
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            role: 'prestataire de service',
            phone: faker.phone.phoneNumber(),
            location: {
                country: 'France',
                city: 'Issy-les-Moulineaux',
                state: 'Ile-de-France',
                address: '37, Rue du Passeur de Boulogne',
                longitude: 2.259896278119413,
                latitude: 48.82543372005282,
                postcode: '92130',
                isValid: true
            },
            picture: faker.image.avatar(),
        },
    ];

    contacts$ = Observable.from(this.contacts);

    contactAdded = new Subject();

    contactDeleted = new Subject();

    constructor() {
        // this.userArray = Object.values(this.users);
    }

    all(): Observable<any> {
        return this.contacts$;
    }

    getLodgers() {
        return this.contacts$.filter(contact => {
            return contact.role === 'locataire';
        });
    }

    getOwners() {
        return this.contacts$.filter(contact => {
            return contact.role === 'propriétaire';
        });
    }

    getServiceProviders() {
        return this.contacts$.filter(contact => {
            return contact.role === 'prestataire de service';
        });
    }

    add(contact) {
        this.contacts.push(contact);
        this.contactAdded.next(contact);
    }

    remove(contact) {
        this.contacts = this.contacts.filter(c => {
            return c.id !== contact.id;
        });
        this.contactDeleted.next(contact);
    }

    update(contact) {
        this.contacts.map(c => {
            if (contact.id === c.id) {
                c.firstname = contact.firstname;
                c.lastname = contact.lastname;
                c.phone = contact.phone;
                c.location = contact.location;
            }
        });
        this.contactAdded.next(this.contacts$);
    }
}
