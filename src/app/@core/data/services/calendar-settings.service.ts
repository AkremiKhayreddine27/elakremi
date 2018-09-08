import { Injectable } from '@angular/core';
import * as dateFns from 'date-fns';

@Injectable()
export class CalendarSettingsService {

  views: any[] = [
    { text: 'Month', value: 'month' },
    { text: 'Week', value: 'week' },
    { text: 'Day', value: 'day' },
    { text: 'Schedule', value: 'schedule' },
    { text: 'Year', value: 'year' },
  ];

  days = dateFns.eachDay(dateFns.startOfWeek(new Date()), dateFns.endOfWeek(new Date())).map(day => {
    return {
      text: dateFns.format(day.toString(), 'dddd') ,
      value: day.getDay()
    };
  });

  settings = {
    defaultView : { text: 'Month', value: 'month' },
    weekStartsOn : { 
      text: dateFns.format(dateFns.startOfWeek(new Date()).toString(), 'dddd'), 
      value: dateFns.startOfWeek(new Date()).getDay()
    }
  };

  constructor() { }

  get defaultView() {
    return this.settings.defaultView;
  }

  get weekStartsOn() {
    return this.settings.weekStartsOn;
  }

  set defaultView(defaultView) {
    this.settings.defaultView = defaultView;
  }

  set weekStartsOn(weekStartsOn) {
    this.settings.weekStartsOn = weekStartsOn;
  }


}
