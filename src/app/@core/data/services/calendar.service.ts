import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { FormArray } from '@angular/forms';

import { Calendar, CalendarEvent } from 'ngx-calendar';
import * as dateFns from 'date-fns';
import * as ICAL from 'ical.js';

import { Subject } from 'rxjs/Subject';

import { Reservation, Property } from '../models';

import { PropertyService } from './property.service';

@Injectable()
export class CalendarService {

  refresh: Subject<any> = new Subject();

  refreshCurrentProperty: Subject<any> = new Subject();

  calendars: Calendar[] = [
    {
      id: 1,
      name: 'Holidays in France',
      color: '#039be5',
      isLocal: false,
      url: 'https://calendar.google.com/calendar/ical/fr.french%23holiday%40group.v.calendar.google.com/public/basic.ics',
      display: true,
      events: []
    }
  ];

  proxy = 'https://cors-anywhere.herokuapp.com/';



  constructor(private http: Http, private propertyService: PropertyService) { }

  /**
   * sychronize calendar with url calendar
   * @param url 
   * @param calendar 
   */
  synchronize(url: string, calendar: Calendar, property: Property = null) {
    this.http.get(this.proxy + url)
      .pipe(
        map(response => response.text())
      ).subscribe(response => {
        const jcalData = ICAL.parse(response);
        const comp = new ICAL.Component(jcalData);
        let isAirbnb = false;
        if (comp.getFirstProperty('prodid')) {
          if (comp.getFirstProperty('prodid').getFirstValue().indexOf('Airbnb') !== -1) {
            isAirbnb = true;
          }
        }
        const vevents = comp.getAllSubcomponents('vevent');
        const data = vevents.map(vevent => {
          const cevent = new ICAL.Event(vevent);
          let allDay = false;
          if (dateFns.differenceInDays(dateFns.parse(cevent.endDate), dateFns.parse(cevent.startDate)) >= 1) {
            allDay = true;
          }
          let location = null;
          if (cevent.location) {
            location = {
              address: cevent.location,
              country: '',
              latitude: 0,
              longitude: 0,
              postalCode: '',
              isValid: true
            }
          }
          if (isAirbnb && cevent.description) {
            return this.convertAirbnbEvent(cevent, calendar);
          } else {
            const event: CalendarEvent = {
              id: cevent.uid,
              title: cevent.summary,
              start: dateFns.parse(cevent.startDate),
              end: dateFns.parse(cevent.endDate),
              description: cevent.description,
              location: location,
              color: calendar.color,
              allDay: allDay,
              draggable: false,
              isReservation: false,
            };
            return event;
          }
        });
        const existe = property.calendars.filter(c => {
          return c.id === calendar.id;
        });
        if (existe.length > 0) {
          existe.map(c => {
            c.events = data;
          });
          this.refresh.next(property.calendars);
        } else {
          calendar.events = data;
          if (property !== null) {
            property.calendars.push(calendar);
            this.refresh.next(property.calendars);
          } else {
            this.add(calendar);
          }
        }
      }, error => {
      });
  }

  /**
   * add new calendar
   * @param calendar 
   */
  add(calendar: Calendar) {
    this.calendars.push(calendar);
    this.refresh.next(this.calendars);
  }

  /**
   * Add new event to given calendar
   * @param event 
   * @param calendar 
   */
  addEventToCalendar(event: CalendarEvent, calendar: Calendar, property: Property) {
    calendar.events.push(event);
    this.refresh.next(property.calendars);
  }

  importEventsToCalendar(events: CalendarEvent[], calendar: Calendar, property: Property) {
    calendar.events = calendar.events.concat(events);
    this.refresh.next(property.calendars);
  }

  removeEventFromCalendar(event: CalendarEvent) {
    this.calendars.map(calendar => {
      calendar.events = calendar.events.filter(e => {
        return e.id !== event.id;
      });
    });
    this.refresh.next(this.calendars);
  }

  init(property: Property) {
    property.calendars.map(calendar => {
      if (!calendar.isLocal) {
        this.synchronize(calendar.url, calendar, property);
      }
    });
  }

  getPropertyCalendars(property: Property, reservations: Reservation[]) {
    let calendars = [];
    property.calendars = property.calendars.filter(calendar => {
      return calendar.name !== 'Réservations';
    });
    calendars = calendars.concat(property.calendars);
    let reservationsCalendar = {
      id: 6,
      name: 'Réservations',
      color: '#ff4c6a',
      isLocal: true,
      url: null,
      display: true,
      events: reservations.map((event: any) => {
        event.allDay = true;
        event.location = property.location;
        event.color = '#ff4c6a';
        return event;
      })
    };
    property.calendars.push(reservationsCalendar);
    calendars = calendars.concat(reservationsCalendar);
    return calendars;
  }

  /**
   * get all calendars
   */
  all() {
    this.calendars.map(calendar => {
      calendar.events.map(event => {
        if (!event.color) {
          event.color = calendar.color;
        }
      });
    });
    return this.calendars;
  }

  /**
   * get calendar with the given id
   * @param id 
   */
  get(id: number, property: Property): Calendar {
    return property.calendars.filter(calendar => {
      return calendar.id === id;
    })[0];
  }

  getDefaultCalendar(property: Property): Calendar {
    return property.calendars.filter(calendar => {
      return calendar.isLocal;
    })[0];
  }

  getEventCalendar(event: CalendarEvent) {
    let ev;
    this.calendars.map(calendar => {
      calendar.events.map(e => {
        if (e === event) {
          ev = e;
        }
      });
    });
  }

  /**
   * remove the calendar with the given id
   * @param id 
   */
  remove(id: number) {
    this.calendars = this.calendars.filter(calendar => {
      return calendar.id !== id;
    });
    this.refresh.next(this.calendars);
  }

  /**
   * filter calendars with the given filters
   * @param activeCalendars 
   */
  filter(activeCalendars: FormArray, property: Property = null) {
    activeCalendars.controls.forEach((status, index) => {
      const isActive = status.value;
      if (property !== null) {
        property.calendars.map((cal: Calendar) => {
          if (isActive && property.calendars[index].id === cal.id) {
            cal.display = true;
          } else if (!isActive && property.calendars[index].id === cal.id) {
            cal.display = false;
          }
        });
        this.refresh.next(property.calendars);
      }
    });
  }


  convertAirbnbEvent(event, calendar): Reservation {
    const rservationProps = ['PROPERTY', 'NIGHTS'];
    const lodgerProps = ['PHONE', 'EMAIL'];
    let allDay = false;
    if (dateFns.differenceInDays(dateFns.parse(event.endDate), dateFns.parse(event.startDate)) >= 1) {
      allDay = true;
    }
    let location = null;
    if (event.location) {
      location = {
        address: event.location,
        country: '',
        latitude: 0,
        longitude: 0,
        postalCode: '',
        isValid: true
      }
    }
    let reservation: any = {
      id: event.uid,
      title: event.summary,
      start: dateFns.parse(event.startDate),
      end: dateFns.parse(event.endDate),
      isReservation: true,
      draggable: false,
      color: calendar.color,
      location: location,
      allDay: allDay,
      code: event.summary.split(" ")[2].replace('(', '').replace(')', '')
    };
    reservation.lodger = {
      firstname: event.summary.split(" ")[0],
      lastname: event.summary.split(" ")[1],
      phone: '',
      email: ''
    };
    lodgerProps.map(prop => {
      let propStart = event.description.indexOf(prop);
      if (propStart !== -1) {
        var propEnd = event.description.indexOf('\n', propStart);
        if (propEnd === -1) {
          propEnd = event.description.length;
        }
        var propVal = event.description.substring(propStart + prop.length + 2, propEnd);
        reservation.lodger[prop.toLocaleLowerCase()] = propVal;
      }
    });
    rservationProps.map(prop => {
      let propStart = event.description.indexOf(prop);
      if (propStart !== -1) {
        var propEnd = event.description.indexOf('\n', propStart);
        if (propEnd === -1) {
          propEnd = event.description.length;
        }
        var propVal = event.description.substring(propStart + prop.length + 2, propEnd);
        reservation[prop.toLocaleLowerCase()] = propVal;
      }
    });
    return reservation;
  }
}
