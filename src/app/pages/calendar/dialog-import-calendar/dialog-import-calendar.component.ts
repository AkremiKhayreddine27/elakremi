import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Calendar, CalendarEvent } from 'ngx-calendar';
import * as dateFns from 'date-fns';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Property } from '../../../@core/data/models/property';
import { CalendarService } from '../../../@core/data/calendar.service';
import { PropertyService } from '../../../@core/data/property.service';

const colors = [
  '#f4511e',
  '#40DC7E',
  '#039be5',
  '#d50000',
  '#8e24aa',
  '#010101'
];

@Component({
  selector: 'app-dialog-import-calendar',
  templateUrl: './dialog-import-calendar.component.html',
  styleUrls: ['./dialog-import-calendar.component.scss']
})
export class DialogImportCalendarComponent implements OnInit {

  importedEvents: CalendarEvent[] = [];

  @Input() calendars: Calendar[];

  calendarId: number;

  public colors = colors;

  isNewCalendar: boolean = false;

  fileName: string;

  public fileForm: FormGroup;

  public urlForm: FormGroup;

  public properties: Property[];

  selectedProperty: Property;

  constructor(
    private calendarService: CalendarService,
    private propertyService: PropertyService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.properties = this.propertyService.properties;
    if (this.calendars.length === 0) {
      this.isNewCalendar = true;
    } else {
      this.calendars = this.calendars.filter(calendar => {
        return calendar.isLocal;
      });
      if (this.calendars.length !== 0) {
        this.calendarId = this.calendars[0].id;
      } else {
        this.isNewCalendar = true;
      }
    }
    this.fileForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(2)]],
      color: ['#8e24aa', Validators.required]
    });
    this.urlForm = this.formBuilder.group({
      name: ['Airbnb', [Validators.required, Validators.minLength(2)]],
      color: ['#8e24aa', Validators.required],
      url: ['https://www.airbnb.fr/calendar/ical/5986888.ics?s=d3784860135990dbeba49d39493895bd', [Validators.required, Validators.minLength(2)]],
      sync: [5, [Validators.required]]
    });
  }

  fileChange($event) {
    this.fileName = $event.srcElement.files[0].name;
  }

  newEvents(events, calendarName) {
    for (const event of events) {
      let allDay = false;
      if (dateFns.differenceInDays(event.end, event.start) >= 1) {
        allDay = true;
      }
      let title = 'No title';
      if (event.title) {
        title = event.title;
      }
      const newEvent: CalendarEvent = {
        title: title,
        start: event.start,
        end: event.end,
        allDay: allDay,
        color: this.calendars[0].color,
        isReservation: false
      }
      this.importedEvents.push(newEvent);
    }
  }

  /**
   * 
   * @param form 
   */
  submitFileForm(form) {
    if (this.isNewCalendar) {
      const calendar: Calendar = {
        id: this.calendars.length + 1,
        color: this.fileForm.get('color').value,
        name: this.fileForm.get('name').value,
        isLocal: false,
        url: '',
        display: true
      }
      for (let event of this.importedEvents) {
        event.color = calendar.color;
      }
      calendar.events = this.importedEvents;
      this.calendarService.add(calendar);
      this.activeModal.close();
    } else {
      this.calendarService.importEventsToCalendar(this.importedEvents, this.calendarService.get(this.calendarId, this.propertyService.currentProperty), this.propertyService.currentProperty);
      this.activeModal.close();
    }
  }

  submitUrlForm(form) {
    const calendar: Calendar = {
      id: Math.random(),
      name: this.urlForm.get('name').value,
      color: this.urlForm.get('color').value,
      isLocal: false,
      url: this.urlForm.get('url').value,
      display: true
    };
    this.calendarService.synchronize(this.urlForm.get('url').value, calendar, this.selectedProperty);
    this.activeModal.close();
  }

  close() {
    this.activeModal.dismiss();
  }

  setColor(color: string) {
    this.fileForm.patchValue({ color: color });
    this.urlForm.patchValue({ color: color });
  }

  selectCalendar($event) {
    if ($event.target.value === 'new') {
      this.isNewCalendar = true;
    } else {
      this.isNewCalendar = false;
      this.calendarId = Number.parseInt($event.target.value);
      for (let calendar of this.calendars) {
        if (calendar.id === this.calendarId) {
          for (let event of this.importedEvents) {
            event.calendar = calendar;
          }
        }
      }
    }
  }

  selectProperty(id) {
    for (let property of this.properties) {
      if (property.id === Number.parseInt(id)) {
        this.selectedProperty = property;
      }
    }
  }

}
