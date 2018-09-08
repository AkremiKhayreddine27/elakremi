import { Injectable } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Property, SelectItem, Document } from '../models';
import { Calendar } from 'ngx-calendar';
import { ServicesService } from './services.service';
import { ReservationsService } from './reservations.service';
import { DocumentsService } from './documents.service';

import { LatLngBounds, LatLng } from 'leaflet';

import * as faker from 'faker';
import { TariffsService } from './tariffs.service';
import { SeasonalTariffService } from './seasonal-tariff.service';
import { ContactsService } from './contacts.service';
import { DataService } from './data.abstract';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { throwError } from 'rxjs';

@Injectable()
export class PropertyService extends DataService {

  statuses = [
    { id: 1, value: 'réservé' },
    { id: 2, value: 'disponible' },
    { id: 3, value: 'indisponible' }
  ];

  getStatus(id: number) {
    return this.statuses.find(status => {
      return status.id === id;
    });
  }

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

  languages = [
    { id: 1, value: 'Arabe' },
    { id: 2, value: 'Espagnol' },
    { id: 3, value: 'Français' },
    { id: 4, value: 'Italien' },
    { id: 5, value: 'Portugais' },
    { id: 6, value: 'Anglais' }
  ];

  currencies = [
    { id: 1, value: 'Euro' },
    { id: 2, value: 'Bitcoin' },
    { id: 3, value: 'Dollar' }
  ];

  public amenties = [
    { id: 1, name: 'Parking' },
    { id: 2, name: 'Salle de sport' },
    { id: 3, name: 'Jacuzzi' },
    { id: 4, name: 'Piscine' },
    { id: 5, name: 'Ascenseur' },
    { id: 6, name: 'Interphone' },
    { id: 7, name: 'Air de jeux' },
    { id: 8, name: 'accés internet' },
    { id: 9, name: 'Chauffage collectif' },
    { id: 10, name: 'laverie' },
    { id: 11, name: 'Climatisation' },
    { id: 12, name: 'Serrure Connecté' }
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

  public currentProperty: Property;

  constructor(
    public reservationsService: ReservationsService,
    private documentsService: DocumentsService,
    private servicesService: ServicesService,
    private tariffService: TariffsService,
    private seasonalTariffService: SeasonalTariffService,
    private contactService: ContactsService,

    public afAuth: AngularFireAuth,
    public db: AngularFirestore
  ) {
    super(afAuth, db);
  }

  getStatuses(): Observable<SelectItem[]> {
    return of(this.statuses).pipe(delay(500));
  }

  getTypes(): Observable<SelectItem[]> {
    return of(this.types).pipe(delay(500));
  }

  getPlatforms(): Observable<SelectItem[]> {
    return of(this.platforms).pipe(delay(500));
  }

  generateProperties(db = 'local', nbr: number = 6) {
    let properties: Property[] = [];
    let images = [
      {
        name: 'p1.jpg',
        type: '',
        size: 0,
        url: 'assets/images/p1.jpg'
      },
      {
        name: 'p2.jpg',
        type: '',
        size: 0,
        url: 'assets/images/p2.jpg'
      },
      {
        name: 'p3.jpg',
        type: '',
        size: 0,
        url: 'assets/images/p3.jpg'
      },
      {
        name: 'p4.jpg',
        type: '',
        size: 0,
        url: 'assets/images/p4.jpg'
      },
      {
        name: 'p5.jpg',
        type: '',
        size: 0,
        url: 'assets/images/p5.jpg'
      },
      {
        name: 'p6.jpg',
        type: '',
        size: 0,
        url: 'assets/images/p6.jpg'
      },
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
      let property: Property = {
        id: i,
        title: titles[i - 1],
        description: faker.lorem.paragraph(),
        images: [
          faker.random.arrayElement(images),
          faker.random.arrayElement(images),
          faker.random.arrayElement(images)
        ],
        status: faker.random.arrayElement(this.statuses),
        type: faker.random.arrayElement(this.types),
        language: faker.random.arrayElement(this.languages),
        currency: faker.random.arrayElement(this.currencies),
        nbrRooms: 3,
        nbrKitchens: 1,
        nbrLounges: 2,
        terrace: true,
        garden: true,
        suitableForEvents: true,
        platform: faker.random.arrayElement(this.platforms),
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
        amenities: this.amenties.filter((item: any) => {
          return item.name.includes(faker.helpers.replaceSymbols('?').toLowerCase());
        }),
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
        rate: 5,
        votes: 26,
        amount: 85
      };
      this.tariffService.generate(property);
      this.documentsService.generateDocuments(1, 1, property, '/pages/properties/' + property.id);
      if (db === 'local')
        this.store(property);
      this.reservationsService.generateReservations(15, this.tariffService.findActiveTariff().price, this.owner, property).map(reservation => {
        this.reservationsService.store(reservation);
      });
      this.servicesService.generateServices(15, property).map(service => {
        this.servicesService.store(service);
      });
    }
    return properties;
  }

  setCurrentProperty(id: number): Observable<any> {
    if (this.find(id)) {
      this.currentProperty = this.find(id);
      this.refreshCurrentProperty.next(this.currentProperty);
      return of(this.currentProperty);
    } else {
      return throwError('Property with id ' + id + ' doesnt exist');
    }
  }

  getCurrentProperty(): Property {
    return this.currentProperty;
  }

  addCalendar(calendar: Calendar, property: Property) {
    property.calendars.push(calendar);
    this.refreshPropertyCalendars.next(property);
  }

  getNearby(bounds: LatLngBounds, property: Property) {
    return this.properties.filter(p => {
      return bounds.contains(new LatLng(p.location.userLocation.latitude, p.location.userLocation.longitude)) && p.id !== property.id;
    });
  }

}
