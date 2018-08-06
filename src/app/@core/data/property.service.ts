import { Injectable } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs/Subject';
import * as dateFns from 'date-fns';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Property, SelectItem } from './models';
import { Calendar } from 'ngx-calendar';
import { ServicesService } from './services.service';
import { ReservationsService } from './reservations.service';
import { DocumentsService } from './documents.service';

import { LatLngBounds, LatLng } from 'leaflet';

import * as faker from 'faker';
import { TariffsService } from './tariffs.service';
import { SeasonalTariffService } from './seasonal-tariff.service';
import { ContactsService } from './contacts.service';

@Injectable()
export class PropertyService {

  statuses = [
    { id: 1, value: 'réservé' },
    { id: 2, value: 'disponible' },
    { id: 3, value: 'indisponible' }
  ];

  platforms = [
    { id: 1, value: 'Airbnb' },
    { id: 2, value: 'Abritel' },
    { id: 3, value: 'Autre' },
    { id: 4, value: 'EasyLocatus' }
  ];

  types = [
    { id: 1, value: 'Appartement' },
    { id: 2, value: 'Appartement Corporatif' },
    { id: 3, value: 'Bed & Breakfast' },
    { id: 4, value: 'Bungalow' },
    { id: 5, value: 'Bateau' },
    { id: 6, value: 'Camping' },
    { id: 7, value: 'Caravane' },
    { id: 8, value: 'Chalet' },
    { id: 9, value: "Chambre d'hotes" },
    { id: 10, value: 'Chateau' },
    { id: 11, value: 'Ferme' },
    { id: 12, value: 'Gite' },
    { id: 13, value: "Grange Aménagée" },
    { id: 14, value: 'Hostal' },
    { id: 15, value: 'Hotel suites' },
    { id: 16, value: 'Hotel/Auberge' },
    { id: 17, value: 'Immeuble' },
    { id: 18, value: 'Maison' },
    { id: 19, value: 'Manoir/Chateau' },
    { id: 20, value: 'Mas' },
    { id: 21, value: 'Mobil Home' },
    { id: 22, value: 'Pavillon' },
    { id: 23, value: 'Péniche' },
    { id: 24, value: 'Refuge' },
    { id: 25, value: 'Riad' },
    { id: 26, value: 'Studio' },
    { id: 27, value: 'Villa' },
    { id: 28, value: 'Village Vacances Tout Compris' },
    { id: 29, value: 'Yacht' },
  ];

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

  public owner = this.contactService.generate({ role: 1 });

  public properties: Property[] = this.generateProperties();

  source: LocalDataSource = new LocalDataSource();

  public currentProperty: Property = this.properties[0];

  constructor(
    public reservationsService: ReservationsService,
    private documentsService: DocumentsService,
    private servicesService: ServicesService,
    private tariffService: TariffsService,
    private seasonalTariffService: SeasonalTariffService,
    private contactService: ContactsService
  ) { }

  getStatuses(): Observable<SelectItem[]> {
    return of(this.statuses).pipe(delay(500));
  }

  getTypes(): Observable<SelectItem[]> {
    return of(this.types).pipe(delay(500));
  }

  getPlatforms(): Observable<SelectItem[]> {
    return of(this.platforms).pipe(delay(500));
  }

  generateProperties(nbr: number = 6) {
    let properties: Property[] = [];
    let images = [
      'assets/images/p1.jpg',
      'assets/images/p2.jpg',
      'assets/images/p3.jpg',
      'assets/images/p4.jpg',
      'assets/images/p5.jpg',
      'assets/images/p6.jpg'
    ];
    let titles = [
      'Studio des Palmiers Baie Nettlé',
      'Superbe duplex centre historique coeur de Bordeaux',
      'Cosy Room Paris Center the Marais',
      'MAISON SOUS LES TOITS - HAUT MARAIS',
      'Villa de Charme Sud Landes 3ch',
      'Amboise Troglodyte'
    ];
    for (let i = 1; i <= nbr; i++) {
      let property = {
        id: i,
        title: titles[i - 1],
        images: [
          faker.random.arrayElement(images),
          faker.random.arrayElement(images),
          faker.random.arrayElement(images)
        ],
        status: faker.random.arrayElement(this.statuses),
        type: faker.random.arrayElement(this.types),
        nbr_chambre: 3,
        nbr_cuisine: 1,
        nbr_salon: 2,
        platforms: [faker.random.arrayElement(this.platforms)],
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
      };
      this.tariffService.generate(property);
      this.documentsService.generateDocuments(2, 1, property, '/pages/properties/' + property.id);
      this.servicesService.generateServices(15, property)
      this.reservationsService.generateReservations(15, this.tariffService.findActiveTariff().price, this.owner, property);
      properties.push(property);
    }
    return properties;
  }

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
