import { Injectable } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs/Subject';
import * as dateFns from 'date-fns';

import { Property } from './models/property';
import { Calendar } from 'ngx-calendar';
import { ServicesService } from './services.service';

import { LatLngBounds, LatLng } from 'leaflet';

import * as faker from 'faker';

@Injectable()
export class PropertyService {

  refresh: Subject<any> = new Subject();

  refreshCurrentProperty: Subject<any> = new Subject();

  refreshPropertyCalendars: Subject<any> = new Subject();

  local: Calendar = {
    id: 1,
    name: 'EasyLocatus',
    url: '',
    color: '#40DC7E',
    isLocal: true,
    display: true,
    events: []
  };

  holidaysInFrance: Calendar = {
    id: 2,
    name: 'Holidays in France',
    color: '#039be5',
    isLocal: false,
    url: 'https://calendar.google.com/calendar/ical/fr.french%23holiday%40group.v.calendar.google.com/public/basic.ics',
    display: true,
    events: []
  };

  public owner = {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber()
  };

  public provider1 = {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber()
  };

  public provider2 = {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber()
  };

  public provider3 = {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber()
  };

  public provider4 = {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber()
  };

  public provider5 = {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber()
  };

  public lodger1 = {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber()
  };

  public lodger2 = {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber()
  };

  public lodger3 = {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber()
  };

  public lodger4 = {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber()
  };

  public lodger5 = {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber()
  };
 
  public properties: Property[] = [
    {
      id: 1,
      title: 'Studio des Palmiers Baie Nettlé',
      images: [
        'assets/images/p1.jpg',
        'assets/images/p2.jpg',
        'assets/images/p3.jpg'
      ],
      status: 'réservé',
      type: 'Appartement',
      nbr_chambre: 3,
      nbr_cuisine: 1,
      nbr_salon: 2,
      platforms: ['Airbnb', 'Abritel'],
      owner: this.owner,
      location: {
        userLocation: {
          country: 'France',
          city: 'Issy-les-Moulineaux',
          state: 'Ile-de-France',
          address: 'Info Municipale, Chemin de Bretagne',
          longitude: 2.2582740783036575,
          latitude: 48.82377450294101,
          postcode: '92130',
          isValid: true
        },
        mapLocation: {
          country: 'France',
          city: 'Issy-les-Moulineaux',
          state: 'Ile-de-France',
          address: 'Info Municipale, Chemin de Bretagne',
          longitude: 2.2582740783036575,
          latitude: 48.82377450294101,
          postcode: '92130',
        },
        isMapAddress: false
      },
      equipements: [
        {
          name: 'Réfrigérateur'
        },
        {
          name: 'Congélateur'
        },
        {
          name: 'Four'
        },
        {
          name: 'Téléphone'
        },
        {
          name: 'Ordinateur'
        },
        {
          name: 'Armoire'
        },
        {
          name: 'Placard'
        }
      ],
      calendars: [
        {
          id: 2,
          name: 'Holidays in France',
          color: '#039be5',
          isLocal: false,
          url: 'https://calendar.google.com/calendar/ical/fr.french%23holiday%40group.v.calendar.google.com/public/basic.ics',
          display: true,
          events: []
        },
        {
          id: 1,
          name: 'EasyLocatus',
          url: '',
          color: '#40DC7E',
          isLocal: true,
          display: true,
          events: []
        }
      ],
      links: [
        {
          titre: 'Airbnb',
          url: 'https://www.airbnb.com/rooms/select/18575744?adults=2&s=Yys9hnmr'
        },
        {
          titre: 'Abritel',
          url: 'https://www.airbnb.com/rooms/select/18575744?adults=2&s=Yys9hnmr'
        }
      ],
      services: [
        {
          id: faker.random.number(),
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          startDate: faker.date.past(),
          endDate: faker.date.future(),
          createdAt: faker.date.past(),
          priority: 'basse',
          type: {
            title: 'Immobilier',
            slug: 'immobilier',
            subCategory: {
              title: 'Crédit',
              slug: 'credit'
            },
            category: {
              title: 'Dépenses Contraintes',
              slug: 'depenses-contraintes'
            }
          },
          subscriptionDate: new Date(),
          deadline: 'une fois',
          status: 'validée',
          provider: this.provider1,
          numeroContrat: faker.finance.account(),
          tariff: {
            amount: faker.finance.amount(),
            tva: faker.finance.amount(),
            deadline: 'mois',
          },
          paymentStatus: 'payé',
          payments: [
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'partiel',
              method: 'Espèces',
              type: {
                label: 'Acompte',
                value: 'Acompte',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'payé',
              method: 'Chèque',
              type: {
                label: 'Frais de service',
                value: 'Frais de service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'partiel',
              method: 'Virement',
              type: {
                label: 'Taxe séjour',
                value: 'Taxe séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'en retard',
              method: 'Prélèvement',
              type: {
                label: 'Séjour',
                value: 'Séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: faker.date.past(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'à payer',
              method: 'Chèque',
              type: {
                label: 'Service',
                value: 'Service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            }
          ],
          documents: [
            {
              id: 1,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'facture',
              createdAt: faker.date.past(),
              format: 'pdf'
            },
            {
              id: 2,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'contrat',
              createdAt: faker.date.past(),
              format: 'word'
            },
            {
              id: 3,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'paiement',
              createdAt: faker.date.past(),
              format: 'archive'
            },
            {
              id: 4,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'autre',
              createdAt: faker.date.past(),
              format: 'excel'
            }
          ],
          reservationId: 1,
        },
        {
          id: faker.random.number(),
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          startDate: faker.date.past(),
          endDate: faker.date.future(),
          createdAt: faker.date.past(),
          priority: 'normale',
          type: {
            title: 'Travaux',
            slug: 'travaux',
            subCategory: {
              title: 'Crédit',
              slug: 'credit'
            },
            category: {
              title: 'Dépenses Contraintes',
              slug: 'depenses-contraintes'
            }
          },
          subscriptionDate: new Date(),
          deadline: 'mois',
          status: 'provisoire',
          provider: this.provider2,
          numeroContrat: faker.finance.account(),
          tariff: {
            amount: faker.finance.amount(),
            tva: faker.finance.amount(),
            deadline: 'semestre',
          },
          paymentStatus: 'à payer',
          payments: [
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'partiel',
              method: 'Espèces',
              type: {
                label: 'Acompte',
                value: 'Acompte',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'payé',
              method: 'Chèque',
              type: {
                label: 'Frais de service',
                value: 'Frais de service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'partiel',
              method: 'Virement',
              type: {
                label: 'Taxe séjour',
                value: 'Taxe séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'en retard',
              method: 'Prélèvement',
              type: {
                label: 'Séjour',
                value: 'Séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: faker.date.past(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'à payer',
              method: 'Chèque',
              type: {
                label: 'Service',
                value: 'Service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            }
          ],
          documents: [
            {
              id: 1,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'facture',
              createdAt: faker.date.past(),
              format: 'pdf'
            },
            {
              id: 2,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'contrat',
              createdAt: faker.date.past(),
              format: 'word'
            },
            {
              id: 3,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'paiement',
              createdAt: faker.date.past(),
              format: 'archive'
            },
            {
              id: 4,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'autre',
              createdAt: faker.date.past(),
              format: 'excel'
            }
          ],
          reservationId: 2,
        },
        {
          id: faker.random.number(),
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          startDate: faker.date.past(),
          endDate: faker.date.future(),
          createdAt: faker.date.past(),
          priority: 'urgent',
          type: {
            title: 'Travaux',
            slug: 'travaux',
            subCategory: {
              title: 'Crédit',
              slug: 'credit'
            },
            category: {
              title: 'Dépenses Contraintes',
              slug: 'depenses-contraintes'
            }
          },
          subscriptionDate: new Date(),
          deadline: 'semestre',
          status: 'annulée',
          provider: this.provider3,
          numeroContrat: faker.finance.account(),
          tariff: {
            amount: faker.finance.amount(),
            tva: faker.finance.amount(),
            deadline: 'trimestre',
          },
          paymentStatus: 'payé',
          payments: [
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'partiel',
              method: 'Espèces',
              type: {
                label: 'Acompte',
                value: 'Acompte',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'payé',
              method: 'Chèque',
              type: {
                label: 'Frais de service',
                value: 'Frais de service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'partiel',
              method: 'Virement',
              type: {
                label: 'Taxe séjour',
                value: 'Taxe séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'en retard',
              method: 'Prélèvement',
              type: {
                label: 'Séjour',
                value: 'Séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: faker.date.past(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'à payer',
              method: 'Chèque',
              type: {
                label: 'Service',
                value: 'Service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            }
          ],
          documents: [
            {
              id: 1,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'facture',
              createdAt: faker.date.past(),
              format: 'pdf'
            },
            {
              id: 2,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'contrat',
              createdAt: faker.date.past(),
              format: 'word'
            },
            {
              id: 3,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'paiement',
              createdAt: faker.date.past(),
              format: 'archive'
            },
            {
              id: 4,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'autre',
              createdAt: faker.date.past(),
              format: 'excel'
            }
          ],
          reservationId: 3
        },
        {
          id: faker.random.number(),
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          startDate: faker.date.past(),
          endDate: faker.date.future(),
          createdAt: faker.date.past(),
          priority: 'basse',
          type: {
            title: 'Immobilier',
            slug: 'immobilier',
            subCategory: {
              title: 'Crédit',
              slug: 'credit'
            },
            category: {
              title: 'Dépenses Contraintes',
              slug: 'depenses-contraintes'
            }
          },
          subscriptionDate: new Date(),
          deadline: 'trimestre',
          status: 'terminée',
          provider: this.provider4,
          numeroContrat: faker.finance.account(),
          tariff: {
            amount: faker.finance.amount(),
            tva: faker.finance.amount(),
            deadline: 'année',
          },
          paymentStatus: 'à payer',
          payments: [
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'partiel',
              method: 'Espèces',
              type: {
                label: 'Acompte',
                value: 'Acompte',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'payé',
              method: 'Chèque',
              type: {
                label: 'Frais de service',
                value: 'Frais de service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'partiel',
              method: 'Virement',
              type: {
                label: 'Taxe séjour',
                value: 'Taxe séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'en retard',
              method: 'Prélèvement',
              type: {
                label: 'Séjour',
                value: 'Séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: faker.date.past(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'à payer',
              method: 'Chèque',
              type: {
                label: 'Service',
                value: 'Service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            }
          ],
          documents: [
            {
              id: 1,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'facture',
              createdAt: faker.date.past(),
              format: 'pdf'
            },
            {
              id: 2,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'contrat',
              createdAt: faker.date.past(),
              format: 'word'
            },
            {
              id: 3,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'paiement',
              createdAt: faker.date.past(),
              format: 'archive'
            },
            {
              id: 4,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'autre',
              createdAt: faker.date.past(),
              format: 'excel'
            }
          ],
          reservationId: 4,
        },
        {
          id: faker.random.number(),
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          startDate: faker.date.past(),
          endDate: faker.date.future(),
          createdAt: faker.date.past(),
          priority: 'urgent',
          type: {
            title: 'Immobilier',
            slug: 'immobilier',
            subCategory: {
              title: 'Crédit',
              slug: 'credit'
            },
            category: {
              title: 'Dépenses Contraintes',
              slug: 'depenses-contraintes'
            }
          },
          subscriptionDate: new Date(),
          deadline: 'année',
          status: 'provisoire',
          provider: this.provider5,
          numeroContrat: faker.finance.account(),
          tariff: {
            amount: faker.finance.amount(),
            tva: faker.finance.amount(),
            deadline: 'une fois',
          },
          paymentStatus: 'payé',
          payments: [
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'partiel',
              method: 'Espèces',
              type: {
                label: 'Acompte',
                value: 'Acompte',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'payé',
              method: 'Chèque',
              type: {
                label: 'Frais de service',
                value: 'Frais de service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'partiel',
              method: 'Virement',
              type: {
                label: 'Taxe séjour',
                value: 'Taxe séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'en retard',
              method: 'Prélèvement',
              type: {
                label: 'Séjour',
                value: 'Séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: faker.date.past(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'à payer',
              method: 'Chèque',
              type: {
                label: 'Service',
                value: 'Service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            }
          ],
          documents: [
            {
              id: 1,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'facture',
              createdAt: faker.date.past(),
              format: 'pdf'
            },
            {
              id: 2,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'contrat',
              createdAt: faker.date.past(),
              format: 'word'
            },
            {
              id: 3,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'paiement',
              createdAt: faker.date.past(),
              format: 'archive'
            },
            {
              id: 4,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'autre',
              createdAt: faker.date.past(),
              format: 'excel'
            }
          ],
          reservationId: 5
        },
        {
          id: faker.random.number(),
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          startDate: faker.date.past(),
          endDate: faker.date.future(),
          createdAt: faker.date.past(),
          priority: 'basse',
          type: {
            title: 'Immobilier',
            slug: 'immobilier',
            subCategory: {
              title: 'Crédit',
              slug: 'credit'
            },
            category: {
              title: 'Dépenses Contraintes',
              slug: 'depenses-contraintes'
            }
          },
          subscriptionDate: new Date(),
          deadline: 'une fois',
          status: 'validée',
          provider: this.provider1,
          numeroContrat: faker.finance.account(),
          tariff: {
            amount: faker.finance.amount(),
            tva: faker.finance.amount(),
            deadline: 'mois',
          },
          paymentStatus: 'payé',
          payments: [
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'partiel',
              method: 'Espèces',
              type: {
                label: 'Acompte',
                value: 'Acompte',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'payé',
              method: 'Chèque',
              type: {
                label: 'Frais de service',
                value: 'Frais de service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'partiel',
              method: 'Virement',
              type: {
                label: 'Taxe séjour',
                value: 'Taxe séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'en retard',
              method: 'Prélèvement',
              type: {
                label: 'Séjour',
                value: 'Séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: faker.date.past(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'à payer',
              method: 'Chèque',
              type: {
                label: 'Service',
                value: 'Service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            }
          ],
          documents: [
            {
              id: 1,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'facture',
              createdAt: faker.date.past(),
              format: 'pdf'
            },
            {
              id: 2,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'contrat',
              createdAt: faker.date.past(),
              format: 'word'
            },
            {
              id: 3,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'paiement',
              createdAt: faker.date.past(),
              format: 'archive'
            },
            {
              id: 4,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'autre',
              createdAt: faker.date.past(),
              format: 'excel'
            }
          ],
          reservationId: 1,
        },
        {
          id: faker.random.number(),
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          startDate: faker.date.past(),
          endDate: faker.date.future(),
          createdAt: faker.date.past(),
          priority: 'normale',
          type: {
            title: 'Travaux',
            slug: 'travaux',
            subCategory: {
              title: 'Crédit',
              slug: 'credit'
            },
            category: {
              title: 'Dépenses Contraintes',
              slug: 'depenses-contraintes'
            }
          },
          subscriptionDate: new Date(),
          deadline: 'mois',
          status: 'provisoire',
          provider: this.provider2,
          numeroContrat: faker.finance.account(),
          tariff: {
            amount: faker.finance.amount(),
            tva: faker.finance.amount(),
            deadline: 'semestre',
          },
          paymentStatus: 'à payer',
          payments: [
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'partiel',
              method: 'Espèces',
              type: {
                label: 'Acompte',
                value: 'Acompte',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'payé',
              method: 'Chèque',
              type: {
                label: 'Frais de service',
                value: 'Frais de service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'partiel',
              method: 'Virement',
              type: {
                label: 'Taxe séjour',
                value: 'Taxe séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'en retard',
              method: 'Prélèvement',
              type: {
                label: 'Séjour',
                value: 'Séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: faker.date.past(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'à payer',
              method: 'Chèque',
              type: {
                label: 'Service',
                value: 'Service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            }
          ],
          documents: [
            {
              id: 1,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'facture',
              createdAt: faker.date.past(),
              format: 'pdf'
            },
            {
              id: 2,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'contrat',
              createdAt: faker.date.past(),
              format: 'word'
            },
            {
              id: 3,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'paiement',
              createdAt: faker.date.past(),
              format: 'archive'
            },
            {
              id: 4,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'autre',
              createdAt: faker.date.past(),
              format: 'excel'
            }
          ],
          reservationId: 2,
        },
        {
          id: faker.random.number(),
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          startDate: faker.date.past(),
          endDate: faker.date.future(),
          createdAt: faker.date.past(),
          priority: 'urgent',
          type: {
            title: 'Travaux',
            slug: 'travaux',
            subCategory: {
              title: 'Crédit',
              slug: 'credit'
            },
            category: {
              title: 'Dépenses Contraintes',
              slug: 'depenses-contraintes'
            }
          },
          subscriptionDate: new Date(),
          deadline: 'semestre',
          status: 'annulée',
          provider: this.provider3,
          numeroContrat: faker.finance.account(),
          tariff: {
            amount: faker.finance.amount(),
            tva: faker.finance.amount(),
            deadline: 'trimestre',
          },
          paymentStatus: 'payé',
          payments: [
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'partiel',
              method: 'Espèces',
              type: {
                label: 'Acompte',
                value: 'Acompte',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'payé',
              method: 'Chèque',
              type: {
                label: 'Frais de service',
                value: 'Frais de service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'partiel',
              method: 'Virement',
              type: {
                label: 'Taxe séjour',
                value: 'Taxe séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'en retard',
              method: 'Prélèvement',
              type: {
                label: 'Séjour',
                value: 'Séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: faker.date.past(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'à payer',
              method: 'Chèque',
              type: {
                label: 'Service',
                value: 'Service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            }
          ],
          documents: [
            {
              id: 1,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'facture',
              createdAt: faker.date.past(),
              format: 'pdf'
            },
            {
              id: 2,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'contrat',
              createdAt: faker.date.past(),
              format: 'word'
            },
            {
              id: 3,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'paiement',
              createdAt: faker.date.past(),
              format: 'archive'
            },
            {
              id: 4,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'autre',
              createdAt: faker.date.past(),
              format: 'excel'
            }
          ],
          reservationId: 3
        },
        {
          id: faker.random.number(),
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          startDate: faker.date.past(),
          endDate: faker.date.future(),
          createdAt: faker.date.past(),
          priority: 'basse',
          type: {
            title: 'Immobilier',
            slug: 'immobilier',
            subCategory: {
              title: 'Crédit',
              slug: 'credit'
            },
            category: {
              title: 'Dépenses Contraintes',
              slug: 'depenses-contraintes'
            }
          },
          subscriptionDate: new Date(),
          deadline: 'trimestre',
          status: 'terminée',
          provider: this.provider4,
          numeroContrat: faker.finance.account(),
          tariff: {
            amount: faker.finance.amount(),
            tva: faker.finance.amount(),
            deadline: 'année',
          },
          paymentStatus: 'à payer',
          payments: [
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'partiel',
              method: 'Espèces',
              type: {
                label: 'Acompte',
                value: 'Acompte',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'payé',
              method: 'Chèque',
              type: {
                label: 'Frais de service',
                value: 'Frais de service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'partiel',
              method: 'Virement',
              type: {
                label: 'Taxe séjour',
                value: 'Taxe séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'en retard',
              method: 'Prélèvement',
              type: {
                label: 'Séjour',
                value: 'Séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: faker.date.past(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'à payer',
              method: 'Chèque',
              type: {
                label: 'Service',
                value: 'Service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            }
          ],
          documents: [
            {
              id: 1,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'facture',
              createdAt: faker.date.past(),
              format: 'pdf'
            },
            {
              id: 2,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'contrat',
              createdAt: faker.date.past(),
              format: 'word'
            },
            {
              id: 3,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'paiement',
              createdAt: faker.date.past(),
              format: 'archive'
            },
            {
              id: 4,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'autre',
              createdAt: faker.date.past(),
              format: 'excel'
            }
          ],
          reservationId: 4,
        },
        {
          id: faker.random.number(),
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          startDate: faker.date.past(),
          endDate: faker.date.future(),
          createdAt: faker.date.past(),
          priority: 'urgent',
          type: {
            title: 'Immobilier',
            slug: 'immobilier',
            subCategory: {
              title: 'Crédit',
              slug: 'credit'
            },
            category: {
              title: 'Dépenses Contraintes',
              slug: 'depenses-contraintes'
            }
          },
          subscriptionDate: new Date(),
          deadline: 'année',
          status: 'provisoire',
          provider: this.provider5,
          numeroContrat: faker.finance.account(),
          tariff: {
            amount: faker.finance.amount(),
            tva: faker.finance.amount(),
            deadline: 'une fois',
          },
          paymentStatus: 'payé',
          payments: [
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'partiel',
              method: 'Espèces',
              type: {
                label: 'Acompte',
                value: 'Acompte',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'payé',
              method: 'Chèque',
              type: {
                label: 'Frais de service',
                value: 'Frais de service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'partiel',
              method: 'Virement',
              type: {
                label: 'Taxe séjour',
                value: 'Taxe séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'en retard',
              method: 'Prélèvement',
              type: {
                label: 'Séjour',
                value: 'Séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: faker.date.past(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'à payer',
              method: 'Chèque',
              type: {
                label: 'Service',
                value: 'Service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            }
          ],
          documents: [
            {
              id: 1,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'facture',
              createdAt: faker.date.past(),
              format: 'pdf'
            },
            {
              id: 2,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'contrat',
              createdAt: faker.date.past(),
              format: 'word'
            },
            {
              id: 3,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'paiement',
              createdAt: faker.date.past(),
              format: 'archive'
            },
            {
              id: 4,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'autre',
              createdAt: faker.date.past(),
              format: 'excel'
            }
          ],
          reservationId: 5
        },
                {
          id: faker.random.number(),
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          startDate: faker.date.past(),
          endDate: faker.date.future(),
          createdAt: faker.date.past(),
          priority: 'basse',
          type: {
            title: 'Immobilier',
            slug: 'immobilier',
            subCategory: {
              title: 'Crédit',
              slug: 'credit'
            },
            category: {
              title: 'Dépenses Contraintes',
              slug: 'depenses-contraintes'
            }
          },
          subscriptionDate: new Date(),
          deadline: 'une fois',
          status: 'validée',
          provider: this.provider1,
          numeroContrat: faker.finance.account(),
          tariff: {
            amount: faker.finance.amount(),
            tva: faker.finance.amount(),
            deadline: 'mois',
          },
          paymentStatus: 'payé',
          payments: [
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'partiel',
              method: 'Espèces',
              type: {
                label: 'Acompte',
                value: 'Acompte',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'payé',
              method: 'Chèque',
              type: {
                label: 'Frais de service',
                value: 'Frais de service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'partiel',
              method: 'Virement',
              type: {
                label: 'Taxe séjour',
                value: 'Taxe séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'en retard',
              method: 'Prélèvement',
              type: {
                label: 'Séjour',
                value: 'Séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: faker.date.past(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'à payer',
              method: 'Chèque',
              type: {
                label: 'Service',
                value: 'Service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            }
          ],
          documents: [
            {
              id: 1,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'facture',
              createdAt: faker.date.past(),
              format: 'pdf'
            },
            {
              id: 2,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'contrat',
              createdAt: faker.date.past(),
              format: 'word'
            },
            {
              id: 3,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'paiement',
              createdAt: faker.date.past(),
              format: 'archive'
            },
            {
              id: 4,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'autre',
              createdAt: faker.date.past(),
              format: 'excel'
            }
          ],
          reservationId: 1,
        },
        {
          id: faker.random.number(),
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          startDate: faker.date.past(),
          endDate: faker.date.future(),
          createdAt: faker.date.past(),
          priority: 'normale',
          type: {
            title: 'Travaux',
            slug: 'travaux',
            subCategory: {
              title: 'Crédit',
              slug: 'credit'
            },
            category: {
              title: 'Dépenses Contraintes',
              slug: 'depenses-contraintes'
            }
          },
          subscriptionDate: new Date(),
          deadline: 'mois',
          status: 'provisoire',
          provider: this.provider2,
          numeroContrat: faker.finance.account(),
          tariff: {
            amount: faker.finance.amount(),
            tva: faker.finance.amount(),
            deadline: 'semestre',
          },
          paymentStatus: 'à payer',
          payments: [
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'partiel',
              method: 'Espèces',
              type: {
                label: 'Acompte',
                value: 'Acompte',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'payé',
              method: 'Chèque',
              type: {
                label: 'Frais de service',
                value: 'Frais de service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'partiel',
              method: 'Virement',
              type: {
                label: 'Taxe séjour',
                value: 'Taxe séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'en retard',
              method: 'Prélèvement',
              type: {
                label: 'Séjour',
                value: 'Séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: faker.date.past(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'à payer',
              method: 'Chèque',
              type: {
                label: 'Service',
                value: 'Service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            }
          ],
          documents: [
            {
              id: 1,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'facture',
              createdAt: faker.date.past(),
              format: 'pdf'
            },
            {
              id: 2,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'contrat',
              createdAt: faker.date.past(),
              format: 'word'
            },
            {
              id: 3,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'paiement',
              createdAt: faker.date.past(),
              format: 'archive'
            },
            {
              id: 4,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'autre',
              createdAt: faker.date.past(),
              format: 'excel'
            }
          ],
          reservationId: 2,
        },
        {
          id: faker.random.number(),
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          startDate: faker.date.past(),
          endDate: faker.date.future(),
          createdAt: faker.date.past(),
          priority: 'urgent',
          type: {
            title: 'Travaux',
            slug: 'travaux',
            subCategory: {
              title: 'Crédit',
              slug: 'credit'
            },
            category: {
              title: 'Dépenses Contraintes',
              slug: 'depenses-contraintes'
            }
          },
          subscriptionDate: new Date(),
          deadline: 'semestre',
          status: 'annulée',
          provider: this.provider3,
          numeroContrat: faker.finance.account(),
          tariff: {
            amount: faker.finance.amount(),
            tva: faker.finance.amount(),
            deadline: 'trimestre',
          },
          paymentStatus: 'payé',
          payments: [
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'partiel',
              method: 'Espèces',
              type: {
                label: 'Acompte',
                value: 'Acompte',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'payé',
              method: 'Chèque',
              type: {
                label: 'Frais de service',
                value: 'Frais de service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'partiel',
              method: 'Virement',
              type: {
                label: 'Taxe séjour',
                value: 'Taxe séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'en retard',
              method: 'Prélèvement',
              type: {
                label: 'Séjour',
                value: 'Séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: faker.date.past(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'à payer',
              method: 'Chèque',
              type: {
                label: 'Service',
                value: 'Service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            }
          ],
          documents: [
            {
              id: 1,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'facture',
              createdAt: faker.date.past(),
              format: 'pdf'
            },
            {
              id: 2,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'contrat',
              createdAt: faker.date.past(),
              format: 'word'
            },
            {
              id: 3,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'paiement',
              createdAt: faker.date.past(),
              format: 'archive'
            },
            {
              id: 4,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'autre',
              createdAt: faker.date.past(),
              format: 'excel'
            }
          ],
          reservationId: 3
        },
        {
          id: faker.random.number(),
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          startDate: faker.date.past(),
          endDate: faker.date.future(),
          createdAt: faker.date.past(),
          priority: 'basse',
          type: {
            title: 'Immobilier',
            slug: 'immobilier',
            subCategory: {
              title: 'Crédit',
              slug: 'credit'
            },
            category: {
              title: 'Dépenses Contraintes',
              slug: 'depenses-contraintes'
            }
          },
          subscriptionDate: new Date(),
          deadline: 'trimestre',
          status: 'terminée',
          provider: this.provider4,
          numeroContrat: faker.finance.account(),
          tariff: {
            amount: faker.finance.amount(),
            tva: faker.finance.amount(),
            deadline: 'année',
          },
          paymentStatus: 'à payer',
          payments: [
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'partiel',
              method: 'Espèces',
              type: {
                label: 'Acompte',
                value: 'Acompte',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'payé',
              method: 'Chèque',
              type: {
                label: 'Frais de service',
                value: 'Frais de service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'partiel',
              method: 'Virement',
              type: {
                label: 'Taxe séjour',
                value: 'Taxe séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'en retard',
              method: 'Prélèvement',
              type: {
                label: 'Séjour',
                value: 'Séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: faker.date.past(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'à payer',
              method: 'Chèque',
              type: {
                label: 'Service',
                value: 'Service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            }
          ],
          documents: [
            {
              id: 1,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'facture',
              createdAt: faker.date.past(),
              format: 'pdf'
            },
            {
              id: 2,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'contrat',
              createdAt: faker.date.past(),
              format: 'word'
            },
            {
              id: 3,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'paiement',
              createdAt: faker.date.past(),
              format: 'archive'
            },
            {
              id: 4,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'autre',
              createdAt: faker.date.past(),
              format: 'excel'
            }
          ],
          reservationId: 4,
        },
        {
          id: faker.random.number(),
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          startDate: faker.date.past(),
          endDate: faker.date.future(),
          createdAt: faker.date.past(),
          priority: 'urgent',
          type: {
            title: 'Immobilier',
            slug: 'immobilier',
            subCategory: {
              title: 'Crédit',
              slug: 'credit'
            },
            category: {
              title: 'Dépenses Contraintes',
              slug: 'depenses-contraintes'
            }
          },
          subscriptionDate: new Date(),
          deadline: 'année',
          status: 'provisoire',
          provider: this.provider5,
          numeroContrat: faker.finance.account(),
          tariff: {
            amount: faker.finance.amount(),
            tva: faker.finance.amount(),
            deadline: 'une fois',
          },
          paymentStatus: 'payé',
          payments: [
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'partiel',
              method: 'Espèces',
              type: {
                label: 'Acompte',
                value: 'Acompte',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'payé',
              method: 'Chèque',
              type: {
                label: 'Frais de service',
                value: 'Frais de service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'partiel',
              method: 'Virement',
              type: {
                label: 'Taxe séjour',
                value: 'Taxe séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'en retard',
              method: 'Prélèvement',
              type: {
                label: 'Séjour',
                value: 'Séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: faker.date.past(),
              payer: this.provider1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '5%',
              status: 'à payer',
              method: 'Chèque',
              type: {
                label: 'Service',
                value: 'Service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            }
          ],
          documents: [
            {
              id: 1,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'facture',
              createdAt: faker.date.past(),
              format: 'pdf'
            },
            {
              id: 2,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'contrat',
              createdAt: faker.date.past(),
              format: 'word'
            },
            {
              id: 3,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'paiement',
              createdAt: faker.date.past(),
              format: 'archive'
            },
            {
              id: 4,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'autre',
              createdAt: faker.date.past(),
              format: 'excel'
            }
          ],
          reservationId: 5
        },
      ],
      reservations: [
        {
          id: 1,
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          status: 'validée',
          startDate: dateFns.addDays(new Date(), 1),
          endDate: dateFns.addDays(new Date(), 3),
          reservationDate: new Date(),
          paymentStatus: 'payé',
          createdAt: dateFns.subDays(new Date(), 3),
          amount: faker.finance.amount(),
          nbrAdultes: faker.random.number(10),
          nbrChildren: faker.random.number(10),
          nbrPets: faker.random.number(10),
          lodger: this.lodger1,
          payments: [
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '4%',
              status: 'partiel',
              method: 'Espèces',
              type: {
                label: 'Acompte',
                value: 'Acompte',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.lodger1
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '4%',
              status: 'partiel',
              method: 'Virement',
              type: {
                label: 'Taxe séjour',
                value: 'Taxe séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            }
          ],
          documents: [
            {
              id: 1,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'facture',
              createdAt: faker.date.past(),
              format: 'pdf'
            },
            {
              id: 2,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'contrat',
              createdAt: faker.date.past(),
              format: 'word'
            },
            {
              id: 3,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'paiement',
              createdAt: faker.date.past(),
              format: 'archive'
            },
            {
              id: 4,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'autre',
              createdAt: faker.date.past(),
              format: 'excel'
            }
          ],
        },
        {
          id: 2,
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          status: 'terminée',
          startDate: dateFns.addDays(new Date(), 1),
          endDate: dateFns.addDays(new Date(), 3),
          reservationDate: new Date(),
          createdAt: dateFns.subDays(new Date(), 3),
          paymentStatus: 'à payer',
          amount: faker.finance.amount(),
          nbrAdultes: faker.random.number(10),
          nbrChildren: faker.random.number(10),
          nbrPets: faker.random.number(10),
          lodger: this.lodger2,
          payments: [
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '4%',
              status: 'payé',
              method: 'Chèque',
              type: {
                label: 'Frais de service',
                value: 'Frais de service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.lodger2
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '4%',
              status: 'à payer',
              method: 'Chèque',
              type: {
                label: 'Service',
                value: 'Service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            }
          ],
          documents: [
            {
              id: 1,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'facture',
              createdAt: faker.date.past(),
              format: 'pdf'
            },
            {
              id: 2,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'contrat',
              createdAt: faker.date.past(),
              format: 'word'
            },
            {
              id: 3,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'paiement',
              createdAt: faker.date.past(),
              format: 'archive'
            },
            {
              id: 4,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'autre',
              createdAt: faker.date.past(),
              format: 'excel'
            }
          ],
        },
        {
          id: 3,
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          status: 'annulée',
          startDate: dateFns.addDays(new Date(), 1),
          endDate: dateFns.addDays(new Date(), 3),
          reservationDate: new Date(),
          createdAt: dateFns.subDays(new Date(), 3),
          paymentStatus: 'payé',
          amount: faker.finance.amount(),
          nbrAdultes: faker.random.number(10),
          nbrChildren: faker.random.number(10),
          nbrPets: faker.random.number(10),
          lodger: this.lodger3,
          payments: [
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '4%',
              status: 'partiel',
              method: 'Espèces',
              type: {
                label: 'Acompte',
                value: 'Acompte',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.lodger3
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '4%',
              status: 'à payer',
              method: 'Chèque',
              type: {
                label: 'Service',
                value: 'Service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            }
          ],
          documents: [
            {
              id: 1,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'facture',
              createdAt: faker.date.past(),
              format: 'pdf'
            },
            {
              id: 2,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'contrat',
              createdAt: faker.date.past(),
              format: 'word'
            },
            {
              id: 3,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'paiement',
              createdAt: faker.date.past(),
              format: 'archive'
            },
            {
              id: 4,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'autre',
              createdAt: faker.date.past(),
              format: 'excel'
            }
          ],
        },
        {
          id: 4,
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          status: 'provisoire',
          startDate: dateFns.addDays(new Date(), 1),
          endDate: dateFns.addDays(new Date(), 3),
          reservationDate: new Date(),
          createdAt: dateFns.subDays(new Date(), 3),
          paymentStatus: 'à payer',
          amount: faker.finance.amount(),
          nbrAdultes: faker.random.number(10),
          nbrChildren: faker.random.number(10),
          nbrPets: faker.random.number(10),
          lodger: this.lodger4,
          payments: [
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '4%',
              status: 'partiel',
              method: 'Espèces',
              type: {
                label: 'Acompte',
                value: 'Acompte',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.lodger4
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '4%',
              status: 'partiel',
              method: 'Virement',
              type: {
                label: 'Taxe séjour',
                value: 'Taxe séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            }
          ],
          documents: [
            {
              id: 1,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'facture',
              createdAt: faker.date.past(),
              format: 'pdf'
            },
            {
              id: 2,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'contrat',
              createdAt: faker.date.past(),
              format: 'word'
            },
            {
              id: 3,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'paiement',
              createdAt: faker.date.past(),
              format: 'archive'
            },
            {
              id: 4,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'autre',
              createdAt: faker.date.past(),
              format: 'excel'
            }
          ],
        },
        {
          id: 5,
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          status: 'validée',
          startDate: dateFns.addDays(new Date(), 1),
          endDate: dateFns.addDays(new Date(), 3),
          reservationDate: new Date(),
          createdAt: dateFns.subDays(new Date(), 3),
          paymentStatus: 'à payer',
          amount: faker.finance.amount(),
          nbrAdultes: faker.random.number(10),
          nbrChildren: faker.random.number(10),
          nbrPets: faker.random.number(10),
          lodger: this.lodger5,
          payments: [
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '4%',
              status: 'payé',
              method: 'Chèque',
              type: {
                label: 'Frais de service',
                value: 'Frais de service',
                isIncome: false,
                isOutgo: true
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.lodger5
            },
            {
              id: faker.random.number(),
              description: faker.lorem.paragraph(),
              amount: Number.parseInt(faker.finance.amount()),
              tva: '4%',
              status: 'partiel',
              method: 'Virement',
              type: {
                label: 'Taxe séjour',
                value: 'Taxe séjour',
                isIncome: true,
                isOutgo: false
              },
              paymentDate: new Date(),
              deadlineDate: new Date(),
              payer: this.owner
            }
          ],
          documents: [
            {
              id: 1,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'facture',
              createdAt: faker.date.past(),
              format: 'pdf'
            },
            {
              id: 2,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'contrat',
              createdAt: faker.date.past(),
              format: 'word'
            },
            {
              id: 3,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'paiement',
              createdAt: faker.date.past(),
              format: 'archive'
            },
            {
              id: 4,
              title: faker.lorem.words(3),
              description: faker.lorem.paragraph(),
              type: 'autre',
              createdAt: faker.date.past(),
              format: 'excel'
            }
          ],
        },
      ],
      documents: [
        {
          id: 1,
          title: faker.lorem.words(3),
          description: faker.lorem.paragraph(),
          type: 'facture',
          createdAt: faker.date.past(),
          format: 'pdf'
        },
        {
          id: 2,
          title: faker.lorem.words(3),
          description: faker.lorem.paragraph(),
          type: 'contrat',
          createdAt: faker.date.past(),
          format: 'word'
        },
        {
          id: 3,
          title: faker.lorem.words(3),
          description: faker.lorem.paragraph(),
          type: 'paiement',
          createdAt: faker.date.past(),
          format: 'archive'
        },
        {
          id: 4,
          title: faker.lorem.words(3),
          description: faker.lorem.paragraph(),
          type: 'autre',
          createdAt: faker.date.past(),
          format: 'excel'
        }
      ],
      tariff: {
        seasons: [
          {
            title: 'Nuit',
            active: false,
            seasons: [
              {
                id: 1,
                title: 'Standard',
                amount: 80,
                startDate: faker.date.past(),
                endDate: faker.date.future(),
                minDuration: 7
              },
              {
                id: 2,
                title: 'Haute',
                amount: 100,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 3,
                title: 'Moyenne',
                amount: 90,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 4,
                title: 'Basse',
                amount: 120,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              }
            ]
          },
          {
            title: 'Weekend',
            active: true,
            seasons: [
              {
                id: 1,
                title: 'Standard',
                amount: 80,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 2,
                title: 'Haute',
                amount: 100,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 3,
                title: 'Moyenne',
                amount: 90,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 4,
                title: 'Basse',
                amount: 120,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              }
            ]
          },
          {
            title: 'Semaine',
            active: false,
            seasons: [
              {
                id: 1,
                title: 'Standard',
                amount: 80,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 2,
                title: 'Haute',
                amount: 100,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 3,
                title: 'Moyenne',
                amount: 90,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 4,
                title: 'Basse',
                amount: 120,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              }
            ]
          },
          {
            title: 'Mois',
            active: false,
            seasons: [
              {
                id: 1,
                title: 'Standard',
                amount: 80,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 2,
                title: 'Haute',
                amount: 100,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 3,
                title: 'Moyenne',
                amount: 90,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 4,
                title: 'Basse',
                amount: 120,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              }
            ]
          },
        ],
        events: [
          {
            title: 'Evénnement',
            active: true,
            seasons: [
              {
                id: 1,
                title: 'Evénnement 1',
                amount: 80,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 2,
                title: 'Evénnement 2',
                amount: 100,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 3,
                title: 'Evénnement 3',
                amount: 90,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 4,
                title: 'Evénnement 4',
                amount: 120,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              }
            ]
          }
        ],
        caution: faker.random.number(1000),
      },
      rate: 5,
      votes: 26,
      amount: 85
    },
    {
      id: 2,
      title: 'Superbe duplex centre historique coeur de Bordeaux',
      status: 'disponible',
      images: [
        'assets/images/p2.jpg',
        'assets/images/p3.jpg',
        'assets/images/p4.jpg'
      ],
      type: 'Villa',
      nbr_chambre: 3,
      nbr_cuisine: 1,
      nbr_salon: 2,
      platforms: ['Airbnb'],
      owner: this.owner,
      location: {
        mapLocation: {
          longitude: 2.25743508352025,
          latitude: 48.82402879259719,
          city: 'Issy-les-Moulineaux',
          state: 'Ile-de-France',
          postcode: '92130',
          country: 'France',
          address: "KDS, Chemin de Bretagne",
        },
        userLocation: {
          address: "KDS, Chemin de Bretagne",
          longitude: 2.25743508352025,
          latitude: 48.82402879259719,
          city: 'Issy-les-Moulineaux',
          state: 'Ile-de-France',
          postcode: '92130',
          country: 'France',
          isValid: false
        },
        isMapAddress: true
      },
      equipements: [
        {
          name: 'Télévision'
        }
      ],
      calendars: [
        {
          id: 4,
          name: 'Holidays in France',
          color: '#039be5',
          isLocal: false,
          url: 'https://calendar.google.com/calendar/ical/fr.french%23holiday%40group.v.calendar.google.com/public/basic.ics',
          display: true,
          events: []
        },
        {
          id: 3,
          name: 'EasyLocatus',
          url: '',
          color: '#40DC7E',
          isLocal: true,
          display: true,
          events: []
        }
      ],
      services: [],
      reservations: [],
      documents: [],
      links: [
        {
          titre: 'Airbnb',
          url: 'https://www.airbnb.com/rooms/select/18575744?adults=2&s=Yys9hnmr'
        },
        {
          titre: 'Abritel',
          url: 'https://www.airbnb.com/rooms/select/18575744?adults=2&s=Yys9hnmr'
        }
      ],
      tariff: {
        seasons: [
          {
            title: 'Nuit',
            active: false,
            seasons: [
              {
                id: 1,
                title: 'Standard',
                amount: 80,
                startDate: faker.date.past(),
                endDate: faker.date.future(),
                minDuration: 7
              },
              {
                id: 2,
                title: 'Haute',
                amount: 100,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 3,
                title: 'Moyenne',
                amount: 90,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 4,
                title: 'Basse',
                amount: 120,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              }
            ]
          },
          {
            title: 'Weekend',
            active: true,
            seasons: [
              {
                id: 1,
                title: 'Standard',
                amount: 80,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 2,
                title: 'Haute',
                amount: 100,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 3,
                title: 'Moyenne',
                amount: 90,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 4,
                title: 'Basse',
                amount: 120,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              }
            ]
          },
          {
            title: 'Semaine',
            active: false,
            seasons: [
              {
                id: 1,
                title: 'Standard',
                amount: 80,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 2,
                title: 'Haute',
                amount: 100,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 3,
                title: 'Moyenne',
                amount: 90,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 4,
                title: 'Basse',
                amount: 120,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              }
            ]
          },
          {
            title: 'Mois',
            active: false,
            seasons: [
              {
                id: 1,
                title: 'Standard',
                amount: 80,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 2,
                title: 'Haute',
                amount: 100,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 3,
                title: 'Moyenne',
                amount: 90,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 4,
                title: 'Basse',
                amount: 120,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              }
            ]
          },
        ],
        events: [
          {
            title: 'Evénnement',
            active: true,
            seasons: [
              {
                id: 1,
                title: 'Evénnement 1',
                amount: 80,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 2,
                title: 'Evénnement 2',
                amount: 100,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 3,
                title: 'Evénnement 3',
                amount: 90,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 4,
                title: 'Evénnement 4',
                amount: 120,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              }
            ]
          }
        ],
        caution: faker.random.number(1000),
      },
      rate: 3,
      votes: 7,
      amount: 60
    },
    {
      id: 3,
      title: 'Cosy Room Paris Center the Marais',
      images: [
        'assets/images/p5.jpg',
        'assets/images/p1.jpg',
        'assets/images/p2.jpg'
      ],
      status: 'disponible',
      type: 'Studio',
      nbr_chambre: 3,
      nbr_cuisine: 1,
      nbr_salon: 2,
      platforms: ['Abritel'],
      owner: this.owner,
      location: {
        mapLocation: {
          address: "Groupe Scolaire Robert Doisneau, Rue Jean-Jacques Rousseau",
          longitude: 2.258831978106173,
          latitude: 48.82294452044182,
          country: 'France',
          city: 'Issy-les-Moulineaux',
          state: 'Ile-de-France',
          postcode: '92130',
        },
        userLocation: {
          address: "Groupe Scolaire Robert Doisneau, Rue Jean-Jacques Rousseau",
          longitude: 2.258831978106173,
          latitude: 48.82294452044182,
          country: 'France',
          city: 'Issy-les-Moulineaux',
          state: 'Ile-de-France',
          postcode: '92130',
          isValid: true
        },
        isMapAddress: false
      },
      equipements: [
        {
          name: 'Télévision'
        }
      ],
      calendars: [
        this.local
      ],
      services: [],
      reservations: [],
      documents: [
        {
          id: 1,
          title: faker.lorem.words(3),
          description: faker.lorem.paragraph(),
          type: 'application/pdf',
          icon: 'assets/images/pdf.png'
        },
        {
          id: 2,
          title: faker.lorem.words(3),
          description: faker.lorem.paragraph(),
          type: 'image/png',
          icon: 'assets/images/image.svg'
        },
        {
          id: 3,
          title: faker.lorem.words(3),
          description: faker.lorem.paragraph(),
          type: 'image/jpeg',
          icon: 'assets/images/image.svg'
        },
        {
          id: 4,
          title: faker.lorem.words(3),
          description: faker.lorem.paragraph(),
          icon: 'assets/images/archive.svg'
        }
      ],
      links: [
        {
          titre: 'Airbnb',
          url: 'https://www.airbnb.com/rooms/select/18575744?adults=2&s=Yys9hnmr'
        },
        {
          titre: 'Abritel',
          url: 'https://www.airbnb.com/rooms/select/18575744?adults=2&s=Yys9hnmr'
        }],
      tariff: {
        seasons: [
          {
            title: 'Nuit',
            active: false,
            seasons: [
              {
                id: 1,
                title: 'Standard',
                amount: 80,
                startDate: faker.date.past(),
                endDate: faker.date.future(),
                minDuration: 7
              },
              {
                id: 2,
                title: 'Haute',
                amount: 100,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 3,
                title: 'Moyenne',
                amount: 90,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 4,
                title: 'Basse',
                amount: 120,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              }
            ]
          },
          {
            title: 'Weekend',
            active: true,
            seasons: [
              {
                id: 1,
                title: 'Standard',
                amount: 80,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 2,
                title: 'Haute',
                amount: 100,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 3,
                title: 'Moyenne',
                amount: 90,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 4,
                title: 'Basse',
                amount: 120,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              }
            ]
          },
          {
            title: 'Semaine',
            active: false,
            seasons: [
              {
                id: 1,
                title: 'Standard',
                amount: 80,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 2,
                title: 'Haute',
                amount: 100,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 3,
                title: 'Moyenne',
                amount: 90,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 4,
                title: 'Basse',
                amount: 120,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              }
            ]
          },
          {
            title: 'Mois',
            active: false,
            seasons: [
              {
                id: 1,
                title: 'Standard',
                amount: 80,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 2,
                title: 'Haute',
                amount: 100,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 3,
                title: 'Moyenne',
                amount: 90,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 4,
                title: 'Basse',
                amount: 120,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              }
            ]
          },
        ],
        events: [
          {
            title: 'Evénnement',
            active: true,
            seasons: [
              {
                id: 1,
                title: 'Evénnement 1',
                amount: 80,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 2,
                title: 'Evénnement 2',
                amount: 100,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 3,
                title: 'Evénnement 3',
                amount: 90,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 4,
                title: 'Evénnement 4',
                amount: 120,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              }
            ]
          }
        ],
        caution: faker.random.number(1000),
      },
      rate: 4,
      votes: 70,
      amount: 90
    },
    {
      id: 4,
      title: 'MAISON SOUS LES TOITS - HAUT MARAIS',
      images: [
        'assets/images/p4.jpg',
        'assets/images/p5.jpg',
        'assets/images/p6.jpg'
      ],
      status: 'indisponible',
      type: 'Maison',
      nbr_chambre: 3,
      nbr_cuisine: 1,
      nbr_salon: 2,
      platforms: ['Airbnb'],
      owner: this.owner,
      location: {
        userLocation: {
          country: 'France',
          city: 'Issy-les-Moulineaux',
          state: 'Ile-de-France',
          address: 'École Le Petit Train Vert, Rue Eugène Atget',
          longitude: 2.2610828884353396,
          latitude: 48.8245832810708,
          postcode: '92130',
          isValid: true
        },
        mapLocation: {
          country: 'France',
          city: 'Issy-les-Moulineaux',
          state: 'Ile-de-France',
          address: 'École Le Petit Train Vert, Rue Eugène Atget',
          longitude: 2.2610828884353396,
          latitude: 48.8245832810708,
          postcode: '92130',
        },
        isMapAddress: false
      },
      equipements: [
        {
          name: 'Télévision'
        }
      ],
      calendars: [
        this.local
      ],
      services: [],
      reservations: [],
      documents: [
        {
          id: 1,
          title: faker.lorem.words(3),
          description: faker.lorem.paragraph(),
          type: 'application/pdf',
          icon: 'assets/images/pdf.png'
        },
        {
          id: 2,
          title: faker.lorem.words(3),
          description: faker.lorem.paragraph(),
          type: 'image/png',
          icon: 'assets/images/image.svg'
        },
        {
          id: 3,
          title: faker.lorem.words(3),
          description: faker.lorem.paragraph(),
          type: 'image/jpeg',
          icon: 'assets/images/image.svg'
        },
        {
          id: 4,
          title: faker.lorem.words(3),
          description: faker.lorem.paragraph(),
          icon: 'assets/images/archive.svg'
        }
      ],
      links: [
        {
          titre: 'Airbnb',
          url: 'https://www.airbnb.com/rooms/select/18575744?adults=2&s=Yys9hnmr'
        },
        {
          titre: 'Abritel',
          url: 'https://www.airbnb.com/rooms/select/18575744?adults=2&s=Yys9hnmr'
        }],
      tariff: {
        seasons: [
          {
            title: 'Nuit',
            active: false,
            seasons: [
              {
                id: 1,
                title: 'Standard',
                amount: 80,
                startDate: faker.date.past(),
                endDate: faker.date.future(),
                minDuration: 7
              },
              {
                id: 2,
                title: 'Haute',
                amount: 100,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 3,
                title: 'Moyenne',
                amount: 90,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 4,
                title: 'Basse',
                amount: 120,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              }
            ]
          },
          {
            title: 'Weekend',
            active: true,
            seasons: [
              {
                id: 1,
                title: 'Standard',
                amount: 80,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 2,
                title: 'Haute',
                amount: 100,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 3,
                title: 'Moyenne',
                amount: 90,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 4,
                title: 'Basse',
                amount: 120,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              }
            ]
          },
          {
            title: 'Semaine',
            active: false,
            seasons: [
              {
                id: 1,
                title: 'Standard',
                amount: 80,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 2,
                title: 'Haute',
                amount: 100,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 3,
                title: 'Moyenne',
                amount: 90,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 4,
                title: 'Basse',
                amount: 120,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              }
            ]
          },
          {
            title: 'Mois',
            active: false,
            seasons: [
              {
                id: 1,
                title: 'Standard',
                amount: 80,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 2,
                title: 'Haute',
                amount: 100,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 3,
                title: 'Moyenne',
                amount: 90,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 4,
                title: 'Basse',
                amount: 120,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              }
            ]
          },
        ],
        events: [
          {
            title: 'Evénnement',
            active: true,
            seasons: [
              {
                id: 1,
                title: 'Evénnement 1',
                amount: 80,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 2,
                title: 'Evénnement 2',
                amount: 100,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 3,
                title: 'Evénnement 3',
                amount: 90,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 4,
                title: 'Evénnement 4',
                amount: 120,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              }
            ]
          }
        ],
        caution: faker.random.number(1000),
      },
      rate: 4,
      votes: 86,
      amount: 85
    },
    {
      id: 5,
      title: 'Villa de Charme Sud Landes 3ch',
      images: [

      ],
      status: 'indisponible',
      type: 'Villa',
      nbr_chambre: 3,
      nbr_cuisine: 1,
      nbr_salon: 2,
      platforms: ['Abritel', 'Airbnb'],
      owner: this.owner,
      location: {
        userLocation: {
          country: 'France',
          city: 'Issy-les-Moulineaux',
          state: 'Ile-de-France',
          address: 'A2B6G9, Place Jacques Madaule',
          longitude: 2.260222434997559,
          latitude: 48.82406340421708,
          postcode: '92130',
          isValid: true
        },
        mapLocation: {
          country: 'France',
          city: 'Issy-les-Moulineaux',
          state: 'Ile-de-France',
          address: 'A2B6G9, Place Jacques Madaule',
          longitude: 2.260222434997559,
          latitude: 48.82406340421708,
          postcode: '92130',
        },
        isMapAddress: false
      },
      equipements: [
        {
          name: 'Télévision'
        }
      ],
      calendars: [
        this.local
      ],
      services: [],
      reservations: [],
      documents: [
        {
          id: 1,
          title: faker.lorem.words(3),
          description: faker.lorem.paragraph(),
          type: 'application/pdf',
          icon: 'assets/images/pdf.png'
        },
        {
          id: 2,
          title: faker.lorem.words(3),
          description: faker.lorem.paragraph(),
          type: 'image/png',
          icon: 'assets/images/image.svg'
        },
        {
          id: 3,
          title: faker.lorem.words(3),
          description: faker.lorem.paragraph(),
          type: 'image/jpeg',
          icon: 'assets/images/image.svg'
        },
        {
          id: 4,
          title: faker.lorem.words(3),
          description: faker.lorem.paragraph(),
          icon: 'assets/images/archive.svg'
        }
      ],
      links: [
        {
          titre: 'Airbnb',
          url: 'https://www.airbnb.com/rooms/select/18575744?adults=2&s=Yys9hnmr'
        },
        {
          titre: 'Abritel',
          url: 'https://www.airbnb.com/rooms/select/18575744?adults=2&s=Yys9hnmr'
        }],
      tariff: {
        seasons: [
          {
            title: 'Nuit',
            active: false,
            seasons: [
              {
                id: 1,
                title: 'Standard',
                amount: 80,
                startDate: faker.date.past(),
                endDate: faker.date.future(),
                minDuration: 7
              },
              {
                id: 2,
                title: 'Haute',
                amount: 100,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 3,
                title: 'Moyenne',
                amount: 90,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 4,
                title: 'Basse',
                amount: 120,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              }
            ]
          },
          {
            title: 'Weekend',
            active: true,
            seasons: [
              {
                id: 1,
                title: 'Standard',
                amount: 80,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 2,
                title: 'Haute',
                amount: 100,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 3,
                title: 'Moyenne',
                amount: 90,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 4,
                title: 'Basse',
                amount: 120,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              }
            ]
          },
          {
            title: 'Semaine',
            active: false,
            seasons: [
              {
                id: 1,
                title: 'Standard',
                amount: 80,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 2,
                title: 'Haute',
                amount: 100,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 3,
                title: 'Moyenne',
                amount: 90,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 4,
                title: 'Basse',
                amount: 120,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              }
            ]
          },
          {
            title: 'Mois',
            active: false,
            seasons: [
              {
                id: 1,
                title: 'Standard',
                amount: 80,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 2,
                title: 'Haute',
                amount: 100,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 3,
                title: 'Moyenne',
                amount: 90,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 4,
                title: 'Basse',
                amount: 120,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              }
            ]
          },
        ],
        events: [
          {
            title: 'Evénnement',
            active: true,
            seasons: [
              {
                id: 1,
                title: 'Evénnement 1',
                amount: 80,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 2,
                title: 'Evénnement 2',
                amount: 100,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 3,
                title: 'Evénnement 3',
                amount: 90,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 4,
                title: 'Evénnement 4',
                amount: 120,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              }
            ]
          }
        ],
        caution: faker.random.number(1000),
      },
      rate: 4,
      votes: 26,
      amount: 120
    },
    {
      id: 6,
      title: 'Amboise Troglodyte',
      images: [
        'assets/images/p6.jpg',
        'assets/images/p4.jpg',
        'assets/images/p3.jpg'
      ],
      status: 'réservé',
      type: 'Immeuble',
      nbr_chambre: 3,
      nbr_cuisine: 1,
      nbr_salon: 2,
      platforms: ['Abritel'],
      owner: this.owner,
      location: {
        userLocation: {
          country: 'France',
          city: 'Issy-les-Moulineaux',
          state: 'Ile-de-France',
          address: '37, Rue du Passeur de Boulogne',
          longitude: 2.259896278119413,
          latitude: 48.82543372005282,
          postcode: '92130',
          isValid: true
        },
        mapLocation: {
          country: 'France',
          city: 'Issy-les-Moulineaux',
          state: 'Ile-de-France',
          address: '37, Rue du Passeur de Boulogne',
          longitude: 2.259896278119413,
          latitude: 48.82543372005282,
          postcode: '92130',
        },
        isMapAddress: false
      },
      equipements: [
        {
          name: 'Télévision'
        }
      ],
      calendars: [
        this.local
      ],
      services: [],
      reservations: [],
      documents: [
        {
          id: 1,
          title: faker.lorem.words(3),
          description: faker.lorem.paragraph(),
          type: 'application/pdf',
          icon: 'assets/images/pdf.png'
        },
        {
          id: 2,
          title: faker.lorem.words(3),
          description: faker.lorem.paragraph(),
          type: 'image/png',
          icon: 'assets/images/image.svg'
        },
        {
          id: 3,
          title: faker.lorem.words(3),
          description: faker.lorem.paragraph(),
          type: 'image/jpeg',
          icon: 'assets/images/image.svg'
        },
        {
          id: 4,
          title: faker.lorem.words(3),
          description: faker.lorem.paragraph(),
          icon: 'assets/images/archive.svg'
        }
      ],
      links: [{
        titre: 'Airbnb',
        url: 'https://www.airbnb.com/rooms/select/18575744?adults=2&s=Yys9hnmr'
      },
      {
        titre: 'Abritel',
        url: 'https://www.airbnb.com/rooms/select/18575744?adults=2&s=Yys9hnmr'
      }],
      tariff: {
        seasons: [
          {
            title: 'Nuit',
            active: false,
            seasons: [
              {
                id: 1,
                title: 'Standard',
                amount: 80,
                startDate: faker.date.past(),
                endDate: faker.date.future(),
                minDuration: 7
              },
              {
                id: 2,
                title: 'Haute',
                amount: 100,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 3,
                title: 'Moyenne',
                amount: 90,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 4,
                title: 'Basse',
                amount: 120,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              }
            ]
          },
          {
            title: 'Weekend',
            active: true,
            seasons: [
              {
                id: 1,
                title: 'Standard',
                amount: 80,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 2,
                title: 'Haute',
                amount: 100,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 3,
                title: 'Moyenne',
                amount: 90,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 4,
                title: 'Basse',
                amount: 120,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              }
            ]
          },
          {
            title: 'Semaine',
            active: false,
            seasons: [
              {
                id: 1,
                title: 'Standard',
                amount: 80,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 2,
                title: 'Haute',
                amount: 100,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 3,
                title: 'Moyenne',
                amount: 90,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 4,
                title: 'Basse',
                amount: 120,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              }
            ]
          },
          {
            title: 'Mois',
            active: false,
            seasons: [
              {
                id: 1,
                title: 'Standard',
                amount: 80,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 2,
                title: 'Haute',
                amount: 100,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 3,
                title: 'Moyenne',
                amount: 90,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 4,
                title: 'Basse',
                amount: 120,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              }
            ]
          },
        ],
        events: [
          {
            title: 'Evénnement',
            active: true,
            seasons: [
              {
                id: 1,
                title: 'Evénnement 1',
                amount: 80,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 2,
                title: 'Evénnement 2',
                amount: 100,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 3,
                title: 'Evénnement 3',
                amount: 90,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              },
              {
                id: 4,
                title: 'Evénnement 4',
                amount: 120,
                startDate: new Date(),
                endDate: new Date(),
                minDuration: 7
              }
            ]
          }
        ],
        caution: faker.random.number(1000),
      },
      rate: 5,
      votes: 26,
      amount: 97
    }
  ];

  source: LocalDataSource = new LocalDataSource();

  public currentProperty: Property = this.properties[0];

  constructor(private servicesService: ServicesService) { }

  all() {
    this.source.load(this.properties);
    return this.source;
  }

  find(id: number): Property {
    return this.properties.filter(property => {
      return property.id === id;
    })[0];
  }

  setCurrentProperty(property: Property) {
    property.title !== 'All Properties' ? this.currentProperty = property : this.currentProperty = undefined;
    this.refreshCurrentProperty.next(this.currentProperty);
  }

  addCalendar(calendar: Calendar, property: Property) {
    property.calendars.push(calendar);
    this.refreshPropertyCalendars.next(property);
  }

  remove(property: Property) {
    this.properties = this.properties.filter(p => {
      return p.id !== property.id;
    });
    if ((this.currentProperty && this.currentProperty.id === property.id) || this.properties.length === 0) {
      this.currentProperty = null;
      this.refreshCurrentProperty.next(null);
    }
    this.refresh.next(this.properties);
  }

  add(property: Property) {
    this.properties.push(property);
    this.setCurrentProperty(property);
    this.refresh.next(this.properties);
  }

  getNearby(bounds: LatLngBounds, property: Property) {
    return this.properties.filter(p => {
      return bounds.contains(new LatLng(p.location.userLocation.latitude, p.location.userLocation.longitude)) && p.id !== property.id;
    });
  }

}
