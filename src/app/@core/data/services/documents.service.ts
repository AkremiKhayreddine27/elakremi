import { Injectable } from '@angular/core';
import { Property, SelectItem, Document } from '../models';
import { PropertyService } from './property.service';
import * as faker from 'faker';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';
import { DataService } from './data.abstract';

import { Observable } from 'rxjs/Observable';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class DocumentsService extends DataService {

    public types: any[] = [
        {
            id: 1,
            value: 'facture',
        },
        {
            id: 2,
            value: 'contrat',
        },
        {
            id: 3,
            value: 'paiement',
        },
        {
            id: 4,
            value: 'autre',
        },
    ];

    public categoryTypes: any[] = [
        {
            id: 1,
            value: 'Bien',
            cssClass: 'badge-success',
        },
        {
            id: 2,
            value: 'Réservation',
            cssClass: 'badge-danger',
        },
        {
            id: 3,
            value: 'Service',
            cssClass: 'badge-info',
        },
    ];

    constructor(
        public afAuth: AngularFireAuth,
        public db: AngularFirestore) {
        super(afAuth, db);
    }

    getTypes(): Observable<SelectItem[]> {
        return of(this.types).pipe(delay(500));
    }

    getCategoryTypes(): Observable<SelectItem[]> {
        return of(this.categoryTypes).pipe(delay(500));
    }

    getCategoryType(id: number) {
        return this.categoryTypes.find(type => {
            return type.id === id;
        });
    }

    generateDocuments(nbr: number, nomenclatureType, nomenclature, link) {
        for (let n = 0; n < nbr; n++) {
            let document: Document = {
                kind: 'Document',
                id: faker.random.number(),
                title: faker.lorem.words(3),
                description: faker.lorem.paragraph(),
                type: faker.random.arrayElement(this.types),
                createdAt: faker.date.past(),
                file: { name: faker.system.fileName(), size: 20, type: 'application/pdf' },
                nomenclatureType: this.getCategoryType(nomenclatureType),
                nomenclature,
                nomenclatureLink: link,
                propertyId: nomenclatureType === 1 ? nomenclature.id : nomenclature.property.id
            };
            this.store(document);
        }
    }

    initFilters(propertyService: PropertyService) {
        let properties = of(propertyService.all().map(property => {
            return { id: property.id, value: property.title };
        })).pipe(delay(500));
        let property = { id: propertyService.currentProperty.id, value: propertyService.currentProperty.title };
        const nomenclatures = this.getCategoryTypes();
        return [
            {
                name: 'property',
                type: 'select',
                field: 'propertyId',
                element: property,
                elements: properties,
                placeholder: 'Choisir un bien',
                callback: function (cell: any, search: any) {
                    if (cell.toString() === search) {
                        return true;
                    } else {
                        return false;
                    }
                },
            },
            {
                name: 'type',
                type: 'select',
                field: 'type',
                placeholder: 'Choisir un type',
                elements: this.getTypes(),
                callback: function (cell: any, search: any) {
                    if (cell.id.toString() === search) {
                        return true;
                    } else {
                        return false;
                    }
                },
            },
            {
                name: 'nomenclature',
                type: 'select',
                field: 'nomenclatureType',
                placeholder: 'Choisir une nomenclature',
                elements: nomenclatures,
                callback: function (cell: any, search: any) {
                    return cell.id.toString() === search;
                },
            },
            {
                type: 'datepicker',
            },
        ];
    }

    initSort(source) {
        let direction = 'desc';
        source.setSort([
            {
                field: 'createdAt',
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

}