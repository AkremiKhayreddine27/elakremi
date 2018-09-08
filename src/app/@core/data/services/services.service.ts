import { Injectable } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs/Subject';
import * as faker from 'faker';
import { PaymentService } from './payment.service';
import { DocumentsService } from './documents.service';
import { PropertyService } from './property.service';
import * as dateFns from 'date-fns';
import { Service, SelectItem, Property } from '../models';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { DataService } from './data.abstract';
import { LocatusFilter } from '../../../@theme/components/filters/locatus-filter';
import { ContactsService } from './contacts.service';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class ServicesService extends DataService {

    public statuses: SelectItem[] = [
        { id: 1, value: 'validée', cssClass: 'badge-success' },
        { id: 2, value: 'provisoire', cssClass: 'badge-warning' },
        { id: 3, value: 'annulée', cssClass: 'badge-danger' },
        { id: 4, value: 'terminée', cssClass: 'badge-info' }
    ];
    public frequencies: SelectItem[] = [
        { id: 1, value: 'une fois' },
        { id: 2, value: 'mensuelle' },
        { id: 3, value: 'bimestrielle' },
        { id: 4, value: 'trimestrielle' },
        { id: 5, value: 'semestrielle' },
        { id: 6, value: 'annuelle' }
    ];
    public priorities: SelectItem[] = [
        { id: 1, value: 'basse' },
        { id: 2, value: 'normale' },
        { id: 3, value: 'urgent' }
    ];

    public categories = [
        {
            id: 1,
            title: 'Dépenses Contraintes',
            slug: 'depenses-contraintes'
        },
        {
            id: 2,
            title: 'Dépenses Courantes',
            slug: 'depenses-courantes'
        },
        {
            id: 3,
            title: 'Dépenses Exceptionnelles',
            slug: 'depenses-exceptionnelles'
        }
    ];

    public subCategories = [
        {
            id: 1,
            title: 'Crédit',
            slug: 'credit',
            icons: ['fa fa-cc-mastercard'],
            categoryId: 1,
        },
        {
            id: 2,
            title: 'Impot & Taxes',
            slug: 'impot-taxes',
            icons: ['fa fa-university'],
            categoryId: 1,
        },
        {
            id: 3,
            title: 'Syndic',
            slug: 'syndic',
            icons: ['fa fa-building'],
            categoryId: 1,
        },
        {
            id: 4,
            title: 'Assurances',
            slug: 'assurances',
            icons: ['fa fa-users'],
            categoryId: 1,
        },
        {
            id: 5,
            title: 'Exploitation',
            slug: 'exploitation',
            icons: ['fa fa-tint ml-2', 'fa fa-free-code-camp ml-2', 'fa fa-plug ml-2', 'fa fa-wifi ml-2'],
            categoryId: 1,
        },
        {
            id: 6,
            title: 'Autre',
            slug: 'autre',
            icons: [],
            categoryId: 1,
        },
        {
            id: 7,
            title: 'Interventions',
            slug: 'interventions',
            icons: ['fa fa-wrench'],
            categoryId: 2,
        },
        {
            id: 8,
            title: 'Equipements',
            slug: 'equipements',
            icons: ['fa fa-tv'],
            categoryId: 2,
        },
        {
            id: 9,
            title: 'Conciergerie',
            slug: 'conciergerie',
            icons: ['fa fa-bed'],
            categoryId: 2,
        },
        {
            id: 10,
            title: 'Transactions',
            slug: 'transactions',
            icons: [],
            categoryId: 3,
        },
        {
            id: 11,
            title: 'Sinistres',
            slug: 'sinistres',
            icons: [],
            categoryId: 3,
        },
        {
            id: 12,
            title: 'Déménagement',
            slug: 'demenagement',
            icons: ['fa fa-car'],
            categoryId: 3,
        },
        {
            id: 13,
            title: 'Diagnostic',
            slug: 'diagnostic',
            icons: [],
            categoryId: 3,
        }
    ];

    types = [
        {
            id: 1,
            title: 'Immobilier',
            slug: 'immobilier',
            subCategoryId: 1,
            category: 1
        },
        {
            id: 2,
            title: 'Travaux',
            slug: 'travaux',
            subCategoryId: 1,
            categoryId: 1
        },
        {
            id: 3,
            title: 'Consommation',
            slug: 'consommation',
            subCategoryId: 1,
            categoryId: 1
        },
        {
            id: 4,
            title: 'Autre',
            slug: 'autre',
            subCategoryId: 1,
            categoryId: 1
        },
        {
            id: 5,
            title: 'Impôt sur le revenu',
            slug: 'impot-sur-le-revenu',
            subCategoryId: 2,
            categoryId: 1
        },
        {
            id: 6,
            title: 'Taxe Habitation',
            slug: 'taxe-habitation',
            subCategoryId: 2,
            categoryId: 1
        },
        {
            id: 7,
            title: 'Taxe Foncière',
            slug: 'taxe-fonciere',
            subCategoryId: 2,
            categoryId: 1
        },
        {
            id: 8,
            title: 'Charge copropriétés',
            slug: 'charge-coproprietes',
            subCategoryId: 3,
            categoryId: 1
        },
        {
            id: 9,
            title: 'Autres charges',
            slug: 'autres-charges',
            subCategoryId: 3,
            categoryId: 1
        },
        {
            id: 10,
            title: 'Habitation',
            slug: 'habitation',
            subCategoryId: 4,
            categoryId: 1
        },
        {
            id: 11,
            title: 'Crédit',
            slug: 'credit',
            subCategoryId: 4,
            categoryId: 1
        },
        {
            id: 12,
            title: 'Autre',
            slug: 'autre',
            subCategoryId: 4,
            categoryId: 1
        },
        {
            id: 13,
            title: 'Eau',
            slug: 'eau',
            subCategoryId: 5,
            categoryId: 1
        },
        {
            id: 14,
            title: 'Gaz',
            slug: 'gaz',
            subCategoryId: 5,
            categoryId: 1
        },
        {
            id: 15,
            title: 'Electricité',
            slug: 'electricite',
            subCategoryId: 5,
            categoryId: 1
        },
        {
            id: 16,
            title: 'Télécom',
            slug: 'telecom',
            subCategoryId: 5,
            categoryId: 1
        },
        {
            id: 17,
            title: 'Autre',
            slug: 'autre',
            subCategoryId: 6,
            categoryId: 1
        },
        {
            id: 18,
            title: 'Plomberie',
            slug: 'plomberie',
            subCategoryId: 7,
            categoryId: 2
        },
        {
            id: 19,
            title: 'Electroménager',
            slug: 'electromenager',
            subCategoryId: 7,
            categoryId: 2
        },
        {
            id: 20,
            title: 'Electricité',
            slug: 'electricite',
            subCategoryId: 7,
            categoryId: 2
        },
        {
            id: 21,
            title: 'Serrurie',
            slug: 'serrurie',
            subCategoryId: 7,
            categoryId: 2
        },
        {
            id: 22,
            title: 'Chauffage',
            slug: 'chauffage',
            subCategoryId: 7,
            categoryId: 2
        },
        {
            id: 23,
            title: 'Climatisation',
            slug: 'climatisation',
            subCategoryId: 7,
            categoryId: 2
        },
        {
            id: 24,
            title: 'Bricolage',
            slug: 'bricolage',
            subCategoryId: 7,
            categoryId: 2
        },
        {
            id: 25,
            title: 'Extérieur',
            slug: 'exterieur',
            subCategoryId: 7,
            categoryId: 2
        },
        {
            id: 26,
            title: 'Autre',
            slug: 'autre',
            subCategoryId: 7,
            categoryId: 2
        },
        {
            id: 27,
            title: 'Meubles - Déco',
            slug: 'meubles-deco',
            subCategoryId: 8,
            categoryId: 2
        },
        {
            id: 28,
            title: 'Literie - Linge',
            slug: 'literie-linge',
            subCategoryId: 8,
            categoryId: 2
        },
        {
            id: 29,
            title: 'Electroménager',
            slug: 'electromenager',
            subCategoryId: 8,
            categoryId: 2
        },
        {
            id: 30,
            title: 'Multimédia - Téléphonie',
            slug: 'multimedia-telephonie',
            subCategoryId: 8,
            categoryId: 2
        },
        {
            id: 31,
            title: 'Brico - Jardinage',
            slug: 'brico-jardinage',
            subCategoryId: 8,
            categoryId: 2
        },
        {
            id: 32,
            title: 'Sport - Loisir',
            slug: 'sport-loisir',
            subCategoryId: 8,
            categoryId: 2
        },
        {
            id: 33,
            title: 'Autre',
            slug: 'autre',
            subCategoryId: 8,
            categoryId: 2
        },
        {
            id: 34,
            title: 'Ménage & Linge',
            slug: 'menage-linge',
            subCategoryId: 9,
            categoryId: 2
        },
        {
            id: 35,
            title: 'Gardiennage',
            slug: 'gardiennage',
            subCategoryId: 9,
            categoryId: 2
        },
        {
            id: 36,
            title: 'Jardinage',
            slug: 'jardinage',
            subCategoryId: 9,
            categoryId: 2
        },
        {
            id: 37,
            title: 'Autre',
            slug: 'autre',
            subCategoryId: 9,
            categoryId: 2
        },
        {
            id: 38,
            title: 'Transactions',
            slug: 'transactions',
            subCategoryId: 10,
            category: 3
        },
        {
            id: 39,
            title: 'Sinistres',
            slug: 'sinistres',
            subCategoryId: 11,
            categoryId: 3
        },
        {
            id: 40,
            title: 'Déménagement',
            slug: 'demenagement',
            subCategoryId: 12,
            categoryId: 3
        },
        {
            id: 41,
            title: 'Diagnostic',
            slug: 'diagnostic',
            subCategoryId: 13,
            categoryId: 3
        }
    ];

    public currentType: SelectItem;

    public currentCategory: SelectItem;

    constructor(
        private paymentService: PaymentService,
        private documentsService: DocumentsService,
        private contactService: ContactsService,
        public afAuth: AngularFireAuth,
        public db: AngularFirestore
    ) {
        super(afAuth, db);
    }

    getStatuses(): Observable<SelectItem[]> {
        return of(this.statuses).pipe(delay(500));
    }

    getFrequencies(): Observable<SelectItem[]> {
        return of(this.frequencies).pipe(delay(500));
    }

    getPriorities(): Observable<SelectItem[]> {
        return of(this.priorities).pipe(delay(500));
    }

    generateServices(nbr: number, property: Property) {
        let services: Service[] = [];
        for (let n = 0; n < nbr; n++) {
            const id = faker.random.number();
            let start = faker.date.recent(20);
            let end = dateFns.addMonths(start, 24);
            let category = faker.random.arrayElement(this.subCategories);
            let service: Service = {
                id: id,
                kind: 'Service',
                title: faker.lorem.sentence(),
                description: faker.lorem.paragraph(),
                start: start,
                end: end,
                createdAt: faker.date.past(),
                priority: faker.random.arrayElement(this.priorities).value,
                category: category,
                type: faker.random.arrayElement(this.getTypes(category.id)),
                contractDate: new Date(),
                deadline: start,
                frequency: faker.random.arrayElement(this.frequencies),
                tva: faker.random.number(),
                status: faker.random.arrayElement(this.statuses),
                provider: this.contactService.generate({ role: 3 }),
                contractNumber: faker.finance.account(),
                price: {
                    value: faker.random.number(1000),
                    currency: {
                        symbol: '€',
                        code: 'EUR'
                    }
                },
                payments: [],
                reservation: null,
                property: property
            };
            this.paymentService.createServicePayments(service);
            this.documentsService.generateDocuments(1, 3, service, '/pages/categories/services/' + service.id + '/edit');
            services.push(service);
        }
        return services;
    }

    setCurrentType(type): void {
        this.currentType = type ? { ...type } : null;
    }

    setCurrentCategory(category): void {
        this.currentCategory = category ? { ...category } : null;
    }

    getCategories() {
        return this.categories;
    }

    getSubcategories(categoryId: number = null): any[] {
        if (categoryId) {
            return this.subCategories.filter(subCategory => {
                return subCategory.categoryId === categoryId;
            });
        }
        return this.subCategories;
    }

    getTypes(subCategoryId: number = null) {
        if (subCategoryId) {
            return this.types.filter(type => {
                return type.subCategoryId === subCategoryId;
            });
        }
        return this.types;
    }

    initFilters(propertyService: PropertyService): LocatusFilter[] {
        let properties = of(propertyService.properties.map(property => {
            return { id: property.id, value: property.title };
        })).pipe(delay(500));
        let property = { id: propertyService.currentProperty.id, value: propertyService.currentProperty.title };
        const statuses = this.getStatuses();
        const category = this.currentCategory ? this.getSubcategories().find(subCategory => {
            return subCategory.id === this.currentCategory.id;
        }) : null;
        const type = this.currentType ? this.getTypes().find(t => {
            return t.id === this.currentType.id;
        }) : null;
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
                name: 'category',
                type: 'select',
                field: 'category',
                placeholder: 'Choisir une categorie',
                bindLabel: 'title',
                action: 'onCategoryChange',
                element: category,
                elements: of(this.getSubcategories()).pipe(delay(500)),
                callback: function (cell: any, search: any) {
                    if (cell.id.toString() === search) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            {
                name: 'type',
                type: 'select',
                field: 'type',
                placeholder: 'Choisir un type',
                bindLabel: 'title',
                element: type,
                elements: of([]).pipe(delay(500)),
                callback: function (cell: any, search: any) {
                    if (cell.id.toString() === search) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            {
                name: 'date',
                field: 'start',
                type: 'datepicker'
            }
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
}