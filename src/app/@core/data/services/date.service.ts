import { Injectable } from '@angular/core';
import * as dateFns from 'date-fns';

@Injectable()
export class DateService {

    private HOURS_IN_DAY = 48;

    getHours() {
        let startHour = dateFns.startOfDay(new Date());
        const hours = [];
        for (let i = 0; i < this.HOURS_IN_DAY; i++) {
            hours.push({ label: dateFns.format(startHour, 'HH:mm'), value: dateFns.format(startHour, 'HH:mm') });
            startHour = dateFns.addMinutes(startHour, 30);
        }
        return hours;
    }

    convertDate(date: Date) {
        return {
            year: date.getFullYear(),
            month: dateFns.getMonth(date) + 1,
            day: date.getDate(),
        };
    }

}
