import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';

import * as dateFns from 'date-fns';

import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { NgbModal, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';

import { CalendarEvent, Calendar } from 'ngx-calendar';

import { DialogShowEventComponent } from './dialog-show-event/dialog-show-event.component';
import { DialogNewCalendarComponent } from './dialog-new-calendar/dialog-new-calendar.component';
import { DialogNewEventComponent } from './dialog-new-event/dialog-new-event.component';
import { DialogShowDayEventsComponent } from './dialog-show-day-events/dialog-show-day-events.component';

import { CalendarService } from '../../@core/data/calendar.service';
import { CalendarSettingsService } from '../../@core/data/calendar-settings.service';
import { PropertyService } from '../../@core/data/property.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

  /**
   * Calendar date
   */
  viewDate = new Date();

  /**
   * Datepicker date
   */
  toDay = { year: this.viewDate.getFullYear(), month: dateFns.getMonth(this.viewDate) + 1, day: this.viewDate.getDate() };


  @ViewChild(NgbDatepicker) ngbDatepicker: NgbDatepicker;

  /**
   * Calendar view [month, week, day, year, schedule]
   */
  view = this.settings.defaultView.value;

  /**
   * Calendar week starts on [ day number  ]
   */
  weekStartsOn = this.settings.weekStartsOn.value;

  /**
   * Calendars to display
   */
  calendars: Calendar[] = [];

  /**
   * Non Filtred calendars
   */
  originalCalendars: Calendar[] = [];

  /**
   * Current Property calendar
   */
  selectedPropertyCalendars: Calendar[] = [];

  newEvent: CalendarEvent;

  /**
   * Rxjs subject to refresh calendars
   */
  refresh: Subject<any> = new Subject();

  refreshSubscription: Subscription;

  /**
   * To disable dragging in mobile device
   */
  canAddEvent = true;

  constructor(
    private modalService: NgbModal,
    private calendarService: CalendarService,
    private settings: CalendarSettingsService,
    private propertyService: PropertyService
  ) { }

  ngOnInit() {
    this.setupEvents();
    if (this.propertyService.currentProperty) {
      this.calendars = this.propertyService.currentProperty.calendars;
      this.calendarService.init(this.propertyService.currentProperty);
      this.observeLocalCalendars();
    }
    this.propertyService.refreshCurrentProperty.subscribe(property => {
      if (property) {
        this.calendars = property.calendars;
        this.calendarService.init(property);
      }
    });
  }

  /**
   * @hidden
   */
  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  /** 
   * 
  */
  observeLocalCalendars() {
    this.refreshSubscription = this.calendarService.refresh.subscribe(
      value => {
        this.calendars = value.filter(calendar => {
          return calendar.display;
        });
        this.refresh.next();
      }
    );
  }

  /**
   * Display event informations when event is clicked
   * @param event 
   */
  eventClicked(event) {
    const modalRef = this.modalService.open(DialogShowEventComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.event = event.event;
  }

  /**
   * Display day events when day is clicked for year view
   * @param  
   */
  dayClicked($event) {
    const modalRef = this.modalService.open(DialogShowDayEventsComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.day = $event.day;
    modalRef.componentInstance.events = $event.events;
  }


  newEventStart(event: CalendarEvent, isEventClicked) {
    if (!isEventClicked) {
      const calendar: Calendar = this.calendarService.getDefaultCalendar(this.propertyService.currentProperty);
      event.calendar = calendar;
      event.color = null;
      event.draggable = true;
      this.newEvent = event;
      this.calendarService.addEventToCalendar(this.newEvent, calendar, this.propertyService.currentProperty);
    }
  }

  editEvent(event, end, isEventClicked) {
    const calendar: Calendar = this.calendarService.getDefaultCalendar(this.propertyService.currentProperty);
    if (end && !isEventClicked) {
      const modalRef = this.modalService.open(DialogNewEventComponent, {
        size: 'lg',
        container: 'nb-layout'
      });
      modalRef.componentInstance.calendars = this.propertyService.currentProperty.calendars;
      modalRef.componentInstance.newEvent = this.newEvent;
      modalRef.result.then(result => {
        this.createEvent(result, this.newEvent);
      }, reasen => {
        calendar.events = calendar.events.filter(e => {
          return e !== this.newEvent;
        });
        this.refresh.next();
      });
    } else {
      this.newEvent = event;
      calendar.events.map(e => {
        if (e === event) {
          e.end = event.end;
          this.refresh.next();
        }
      });
    }
  }

  /**
   * Update event when it is dragged and dropped
   * @param param0 
   */
  eventTimesChanged({
    event, newStart, newEnd
  }) {
    this.calendars.map(calendar => {
      calendar.events.map(e => {
        if (e.id === event.id) {
          e.start = newStart;
          e.end = newEnd;
          this.refresh.next();
        }
      });
    });
  }

  /**
   * Dislay a modal to add a new calendar and store the created one
   */
  newCalendar() {
    const modalRef = this.modalService.open(DialogNewCalendarComponent, { size: 'lg', container: 'nb-layout' });
  }

  /**
   * Change the view to the date view when a day is selected from the datepicker and display events for the selected day
   * @param  
   */
  daySelected($event) {
    const day = dateFns.parse($event.year + '-' + $event.month + '-' + $event.day);
    this.view = 'day';
    this.viewDate = day;
  }

  /**
   * datepicker variable to style current date
   */
  isToday(date) {
    const day = new Date(date.year, date.month - 1, date.day);
    const currentDay = new Date();
    if (day.getDate() === currentDay.getDate() && day.getFullYear() === currentDay.getFullYear() && day.getMonth() == currentDay.getMonth()) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Update the datepicker view when viewDate is changed from the header of the calendar
   * @param  
   */
  viewDateChange($event) {
    this.viewDate = $event;
    const toDay = { year: this.viewDate.getFullYear(), month: dateFns.getMonth(this.viewDate) + 1, day: this.viewDate.getDate() };
    this.ngbDatepicker.navigateTo(toDay);
    if (this.view === 'day') {
      this.toDay = toDay;
    }
  }


  createEvent(result, newEvent) {
    this.calendarService.getDefaultCalendar(this.propertyService.currentProperty).events = this.calendarService.getDefaultCalendar(this.propertyService.currentProperty).events.filter(event => {
      return event !== newEvent;
    });
    const event: CalendarEvent = {
      id: this.calendarService.getDefaultCalendar(this.propertyService.currentProperty).events.length + 1,
      start: dateFns.parse(
        result.startDate.year + '-' + result.startDate.month + '-' + result.startDate.day + ' '
        + result.startTime),
      end: dateFns.parse(result.endDate.year + '-' + result.endDate.month + '-' + result.endDate.day + ' '
        + result.endTime),
      title: result.title,
      location: result.location,
      color: result.color ? result.color : this.calendarService.get(Number.parseInt(result.calendar), this.propertyService.currentProperty).color,
      allDay: result.allDay,
      isReservation: false
    };
    this.calendarService.addEventToCalendar(event, this.calendarService.get(Number.parseInt(result.calendar), this.propertyService.currentProperty), this.propertyService.currentProperty);
  }

  /**
   * Listner to detect window resize
   * @param  
   */
  @HostListener('window:resize', ['$event'])
  detectWindowResize($event) {
    this.setupEvents();
  }

  /**
   * disable dragging & dropping when window is less than 768px
   */
  setupEvents() {
    if (window.innerWidth < 768) {
      this.calendars.map(calendar => {
        calendar.events.map(event => {
          event.draggable = false;
        });
      });
      this.canAddEvent = false;
    } else {
      this.calendars.map(calendar => {
        calendar.events.map(event => {
          event.draggable = true;
        });
      });
      this.canAddEvent = true;
    }
  }

}
