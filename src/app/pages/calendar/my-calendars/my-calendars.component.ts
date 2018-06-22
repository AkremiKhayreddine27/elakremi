import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { Property } from '../../../@core/data/models/property';
import { Calendar, CalendarEvent } from 'ngx-calendar';

import { CalendarService } from '../../../@core/data/calendar.service';
import { PropertyService } from '../../../@core/data/property.service';

const colors = [
  '#f4511e',
  '#0b8043',
  '#039be5',
  '#d50000',
  '#8e24aa',
  '#010101'
];

@Component({
  selector: 'app-my-calendars',
  templateUrl: './my-calendars.component.html',
  styleUrls: ['./my-calendars.component.scss']
})
export class MyCalendarsComponent implements OnInit, OnChanges {

  @Input() refresh: Subject<any>;

  refreshSubscription: Subscription;

  @Output()
  newCalendar: EventEmitter<{}> = new EventEmitter<{}>();

  public colors = colors;

  public propertyForm: FormGroup;

  calendars: Calendar[];

  property: Property;


  constructor(
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private calendarService: CalendarService,
    private propertyService: PropertyService
  ) { }

  ngOnInit() {
    this.property = this.propertyService.currentProperty;
    this.buildPropertyForm();
    this.propertyService.refreshCurrentProperty.subscribe(value => {
      this.property = value;
      this.buildPropertyForm(); 
    });
    this.refreshSubscription = this.calendarService.refresh.subscribe(
      value => {
        this.property = this.propertyService.currentProperty;
        this.buildPropertyForm();
      }
    );
  }


  ngOnChanges(changes: any): void {

  }



  buildPropertyForm() {
    this.propertyForm = this.formBuilder.group({
      propertyCalendars: this.buildPropertyCalendars(),
      color: ['#8e24aa'],
    });
  }

  buildPropertyCalendars() {
    let propertyCalendars = [];
    if (this.property) {
      propertyCalendars = this.property.calendars.map(calendar => {
        return this.formBuilder.control(calendar.display);
      });
    }
    return this.formBuilder.array(propertyCalendars);
  }

  get propertyCalendars(): FormArray {
    return this.propertyForm.get('propertyCalendars') as FormArray;
  }

  setColor(color, calendar: Calendar) {
    calendar.color = color;
    calendar.events.map(event => {
      event.color = color;
    });
  }

  filter(calendars, property: Property = null) {
    this.calendarService.filter(calendars, property);
  }

  delete(id) {
    this.calendarService.remove(id);
  }

  refreshCalendar(calendar: Calendar) {
    this.calendarService.synchronize(calendar.url, calendar, this.propertyService.currentProperty);
  }

}
