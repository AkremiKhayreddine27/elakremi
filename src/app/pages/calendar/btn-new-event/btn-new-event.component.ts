import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogNewEventComponent } from '../dialog-new-event/dialog-new-event.component';
import { CalendarEvent } from 'ngx-calendar';
import * as dateFns from 'date-fns';
import { CalendarService } from '../../../@core/data/calendar.service';
import { PropertyService } from '../../../@core/data/property.service';
import { Calendar } from 'ngx-calendar';

@Component({
  selector: 'calendar-btn-new-event',
  templateUrl: './btn-new-event.component.html',
  styleUrls: ['./btn-new-event.component.scss']
})
export class BtnNewEventComponent implements OnInit {

  public event: CalendarEvent;

  @Input() calendars: Calendar[];

  /**
   * Called when an event title is clicked
  */
  @Output()
  newEvent: EventEmitter<{ event: CalendarEvent }> = new EventEmitter<{
    event: CalendarEvent;
  }>();

  constructor(
    private modalService: NgbModal, 
    private calendarService: CalendarService,
    private propertyService: PropertyService
  ) { }

  ngOnInit() {

  }

  open() {
    const modalRef = this.modalService.open(DialogNewEventComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.calendars = this.calendars;
    modalRef.result.then(result => {
        this.event = {
          start: dateFns.parse(
            result.startDate.year + '-' + result.startDate.month + '-' + result.startDate.day + ' ' 
            + result.startTime),
          end: dateFns.parse(result.endDate.year + '-' + result.endDate.month + '-' + result.endDate.day + ' '
            + result.endTime),
          title: result.title,
          location: result.location,
          calendar: result.calendar,
          color: result.color ? result.color: this.propertyService.currentProperty.calendars[Number.parseInt(result.calendar)].color,
          allDay: result.allDay,
          isReservation: false
        };
      this.calendarService.addEventToCalendar(this.event, this.propertyService.currentProperty.calendars[Number.parseInt(result.calendar)], this.propertyService.currentProperty);
    }, (reason) => {

    });
  }

}
