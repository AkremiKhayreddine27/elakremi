import { Injectable } from '@angular/core';
import { DataService } from './data.abstract';
import * as dateFns from 'date-fns';
import * as faker from 'faker';
import { SeasonService } from './season.service';

@Injectable({
  providedIn: 'root'
})
export class SeasonalTariffService extends DataService {



  public periods = [
    { id: 1, value: 'Mois', minDuration: 30, active: false },
    { id: 2, value: 'Semaine', minDuration: 7, active: false },
    { id: 3, value: 'Nuit', minDuration: 1, active: true },
    { id: 4, value: 'Weekend', minDuration: 1, active: false },
  ];

  findPeriodBy(attribute, value) {
    return this.periods.find(item => {
      return this.getDataFromObject(item, attribute) === value;
    });
  }

  constructor(public seasonService: SeasonService) {
    super();
  }

  generate(tariff) {
    if (this.seasonService.all().length === 0) {
      this.seasonService.generate();
    }
    for (let season of this.seasonService.all()) {
      for (let index in this.periods) {
        this.data.push({
          id: faker.random.number(),
          season: season,
          period: this.periods[index],
          price: season.defaultPrice + (Number.parseInt(index) * 10),
          tariff: tariff
        })
      }
    }
  }

  findByActivePeriod() {
    return this.data.find(seasonalTariff => {
      return seasonalTariff.period.active && dateFns.isWithinRange(new Date(), seasonalTariff.season.start, seasonalTariff.season.end);
    });
  }

}
