import { Injectable } from '@angular/core';
import { DataService } from './data.abstract';
import { EventService } from './event.service';
import * as dateFns from 'date-fns';
import * as faker from 'faker';

@Injectable({
  providedIn: 'root'
})
export class EventTariffService extends DataService {

  constructor(public eventService: EventService) {
    super();
  }

  generate(tariff) {
    if (this.eventService.all().length === 0) {
      this.eventService.generate();
    }
    for (let event of this.eventService.all()) {
      this.store({
        id: faker.random.number(),
        event: event,
        price: event.defaultPrice,
        tariff: tariff
      });
    }
  }

  findByActiveEvent() {
    return this.data.find(eventTariff => {
      return dateFns.isWithinRange(new Date(), eventTariff.event.start, eventTariff.event.end);
    });
  }

  hasActiveEvent() {
    if (this.findByActiveEvent()) {
      return true;
    }
    return false;
  }
}
