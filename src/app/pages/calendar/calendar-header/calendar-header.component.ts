import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogImportCalendarComponent } from '../dialog-import-calendar/dialog-import-calendar.component';
import { DialogExportCalendarComponent } from '../dialog-export-calendar/dialog-export-calendar.component';
import { CalendarSettingsComponent } from '../calendar-settings/calendar-settings.component';
import { Calendar } from 'ngx-calendar';
import * as dateFns from 'date-fns';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';

import { PropertyService } from '../../../@core/data/property.service';
import { CalendarService } from '../../../@core/data/calendar.service';
import { Property } from '../../../@core/data/models/property';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeaderComponent implements OnInit {

  @Input() view: string;
  
  @Input() viewDate: Date;
  
  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() weekStratsOnChange: EventEmitter<number> = new EventEmitter();
  
  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

  @Output()
  newCalendar: EventEmitter<{}> = new EventEmitter<{}>();

  @ViewChild(NgbDatepicker) ngbDatepicker: NgbDatepicker;

  isDatePickerCollapsed = true;

  isMyCalendarCollapsed = true;

  isSelectViewOpened = false;

  toDay = {year: new Date().getFullYear(), month: dateFns.getMonth(new Date()) + 1, day: new Date().getDate()};  
  
  views: any[] = [
    { text: 'Month', value: 'month' },
    { text: 'Week', value: 'week' },
    { text: 'Day', value: 'day' },
    { text: 'Schedule', value: 'schedule' },
    { text: 'Year', value: 'year' },
  ];

  properties: any[] = [];

  currentProperty; 


  constructor(private modalService: NgbModal,private propertyService: PropertyService, private calendarService: CalendarService) { }

  ngOnInit() {
    this.properties = this.propertyService.properties;
    this.currentProperty = this.propertyService.currentProperty; 
    this.propertyService.refreshCurrentProperty.subscribe(value => {
      this.currentProperty = value;
    });
    this.toDay = {year: this.viewDate.getFullYear(), month: dateFns.getMonth(this.viewDate) + 1, day: this.viewDate.getDate()};    
  }

  import () {
    const modalRef = this.modalService.open(DialogImportCalendarComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.calendars = this.currentProperty.calendars;
  }

  export() {
    const modalRef = this.modalService.open(DialogExportCalendarComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.calendars = this.currentProperty.calendars;
  }

  settings() {
    const modalRef = this.modalService.open(CalendarSettingsComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.result.then(result => {
      this.viewChange.emit(result.defaultView.value);
      this.weekStratsOnChange.emit(result.weekStartsOn.value);
    }, reason => {
      
    });
  }

  isToday(date) {
    const day = new Date(date.year, date.month - 1, date.day);
    const currentDay = new Date();
    if(day.getDate() === currentDay.getDate() && day.getFullYear() === currentDay.getFullYear() && day.getMonth() == currentDay.getMonth()) { 
      return true;
    }else {
      return false;
    }
  }

  daySelected($event) {
    const day = dateFns.parse($event.year + '-' + $event.month + '-' + $event.day);
    this.viewChange.next('day');
    this.viewDateChange.next(day);
    this.isDatePickerCollapsed = true;
  }

  toDayClicked() {
    this.toDay = {year: new Date().getFullYear(), month: dateFns.getMonth(new Date()) + 1, day: new Date().getDate()}; 
    this.ngbDatepicker.navigateTo(this.toDay);
    this.viewDateChange.next(this.viewDate);
    this.isDatePickerCollapsed = true;
  }

  navigate($event) {
    const day = dateFns.parse($event.next.year + '-' + $event.next.month + '-' + 1);
    this.viewDateChange.next(day);
    this.isDatePickerCollapsed = true;
  }

  setCurrentProperty(property: Property) {
    this.currentProperty = property;
    this.propertyService.setCurrentProperty(property);
  }

}
