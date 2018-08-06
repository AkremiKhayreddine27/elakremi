import { Injectable } from '@angular/core';
import { DataService } from './data.abstract';
import * as dateFns from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class SeasonService extends DataService {

  public seasons = [
    { id: 1, value: 'Basse', defaultPrice: 40, start: dateFns.parse('2018-09-1'), end: dateFns.parse('2018-12-31') },
    { id: 2, value: 'Standard', defaultPrice: 50, start: dateFns.parse('2018-01-1'), end: dateFns.parse('2018-03-31') },
    { id: 3, value: 'Moyenne', defaultPrice: 60, start: dateFns.parse('2018-04-1'), end: dateFns.parse('2018-06-1') },
    { id: 4, value: 'Haute', defaultPrice: 70, start: dateFns.parse('2018-07-1'), end: dateFns.parse('2018-08-31') },
  ];


  generate() {
    this.seasons.map(season => {
      this.store(season);
    })
  }

  constructor() {
    super()
  }
}
