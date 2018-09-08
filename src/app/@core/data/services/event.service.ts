import { Injectable } from '@angular/core';
import { DataService } from './data.abstract';
import * as dateFns from 'date-fns';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class EventService extends DataService {


  public seasons = [
    { id: 1, value: "Jour de l'an", defaultPrice: 400, start: dateFns.parse('2018-01-1'), end: dateFns.parse('2018-01-2'), duration: 1 },
    { id: 2, value: 'Noël', defaultPrice: 500, start: dateFns.parse('2018-12-25'), end: dateFns.parse('2018-12-26'), duration: 1 },
    { id: 3, value: 'Spécial', defaultPrice: 600, start: new Date(), end: dateFns.addDays(new Date(), 1), duration: 1 },
    { id: 4, value: 'Haute', defaultPrice: 700, start: dateFns.parse('2018-07-1'), end: dateFns.parse('2018-07-1'), duration: 1 },
  ];


  generate() {
    this.seasons.map(season => {
      this.store(season);
    })
  }

  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFirestore
  ) {
    super(afAuth, db);
  }
}
