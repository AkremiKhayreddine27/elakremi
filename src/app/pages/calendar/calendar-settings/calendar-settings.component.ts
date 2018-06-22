import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as dateFns from 'date-fns';
import { CalendarSettingsService } from '../../../@core/data/calendar-settings.service';

@Component({
  selector: 'app-calendar-settings',
  templateUrl: './calendar-settings.component.html',
  styleUrls: ['./calendar-settings.component.scss']
})
export class CalendarSettingsComponent implements OnInit {


  defaultView = this.settings.defaultView;

  weekStartsOn = this.settings.weekStartsOn;

  days = this.settings.days;

  isSelectViewOpened = false;

  views = this.settings.views;

  constructor(public activeModal: NgbActiveModal, private settings: CalendarSettingsService) { }

  ngOnInit() {

  }

  close() {
    this.activeModal.close({
      defaultView: this.defaultView,
      weekStartsOn: this.weekStartsOn
    });
  }

  setDefaultView(calendarView) {
    this.defaultView = calendarView;
    this.settings.defaultView = calendarView;
  }

  setWeekStartsOn(day) {
    this.weekStartsOn = day;
    this.settings.weekStartsOn = day;
  }

}
