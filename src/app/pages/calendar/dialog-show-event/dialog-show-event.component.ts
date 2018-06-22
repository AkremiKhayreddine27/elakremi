import { Component, OnInit, Input } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as dateFns from 'date-fns';
import { CalendarEvent } from 'ngx-calendar';
import { CalendarService } from '../../../@core/data/calendar.service';
const HOURS_IN_DAY = 48;

const colors = [
  '#f4511e',
  '#0b8043',
  '#039be5',
  '#d50000',
  '#8e24aa',
  '#010101'
];

@Component({
  selector: 'app-dialog-show-event',
  templateUrl: './dialog-show-event.component.html',
  styleUrls: ['./dialog-show-event.component.scss']
})
export class DialogShowEventComponent implements OnInit {

  @Input()
  event: CalendarEvent;

  public form: FormGroup;
  public hours: string[] = [];
  public allDay = false;
  public colors = colors;

  public canEdit: boolean = false;

  constructor(
    private calendarService: CalendarService,
    private formBuilder: FormBuilder, 
    public activeModal: NgbActiveModal) { }

  ngOnInit() {
    let startHour = dateFns.startOfDay(new Date());
    for (let i = 0; i < HOURS_IN_DAY; i++) {
     this.hours.push(dateFns.format(startHour, 'HH:mm'));
     startHour = dateFns.addMinutes(startHour, 30);
    }
     this.form = this.formBuilder.group({
       title: [this.event.title, [Validators.required, Validators.minLength(2)]],
       startTime: [dateFns.format(this.event.start, 'HH:mm'), Validators.required],
       endTime: [dateFns.format(this.event.end, 'HH:mm'), Validators.required],
       startDate: [{year: this.event.start.getFullYear(), month: dateFns.getMonth(this.event.start) + 1, day: this.event.start.getDate()},Validators.required],
       endDate: [{year: this.event.end.getFullYear(), month: dateFns.getMonth(this.event.end) + 1, day: this.event.end.getDate()}, Validators.required],
       color: [this.event.color ? this.event.color : this.event.calendar.color, Validators.required],
       location: [this.event.location ?this.event.location.address : null],
       allDay: [this.event.allDay]
     });
  }

  save() {
    this.canEdit = false;
  }

  close() {
    this.activeModal.dismiss();
  }

  submit(form) {

  }

  delete() {
    this.calendarService.removeEventFromCalendar(this.event);
    this.activeModal.close();
  }

  setColor (color: string) {
    this.form.patchValue({color: color});
    if (this.event.color) {
      this.event.color = color;
    } else {
      this.event.color =  color;
    }
  }

  allDayChanged(checked) {

  }

}
