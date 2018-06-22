import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import * as dateFns from 'date-fns';
import { Calendar, CalendarEvent } from 'ngx-calendar';

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
  selector: 'app-dialog-new-event',
  templateUrl: './dialog-new-event.component.html',
  styleUrls: ['./dialog-new-event.component.scss']
})
export class DialogNewEventComponent implements OnInit {

  @Input() calendars: Calendar[];
  @Input() viewDate: Date;
  @Input() newEvent: CalendarEvent;
  public form: FormGroup;
  public hours: string[] = [];
  public allDay = false;
  public colors = colors;

  constructor(private formBuilder: FormBuilder, public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.calendars = this.calendars.filter(calendar => {
      return calendar.isLocal;
    });
    let startHour = dateFns.startOfDay(new Date());
    for (let i = 0; i < HOURS_IN_DAY; i++) {
     this.hours.push(dateFns.format(startHour, 'HH:mm'));
     startHour = dateFns.addMinutes(startHour, 30);
    }
     this.form = this.formBuilder.group({
       title: [this.newEvent ? this.newEvent.title: null, [Validators.required, Validators.minLength(2)]],
       startTime: [dateFns.format(startHour, 'HH:mm'), Validators.required],
       endTime: [
        this.newEvent ? this.hours[this.hours.length - 1] : dateFns.format(startHour, 'HH:mm'), 
         Validators.required],
       startDate: [
         this.newEvent ? {
           year: this.newEvent.start.getFullYear(), 
           month: dateFns.getMonth(this.newEvent.start) + 1, 
           day: this.newEvent.start.getDate()
          }: {
            year: new Date().getFullYear(), 
            month: dateFns.getMonth(new Date()) + 1, 
            day: new Date().getDate()
          },
         Validators.required],
       endDate: [
        this.newEvent ? {
          year: this.newEvent.end.getFullYear(), 
          month: dateFns.getMonth(this.newEvent.end) + 1, 
          day: this.newEvent.end.getDate()
        }: {
          year: new Date().getFullYear(), 
          month: dateFns.getMonth(new Date()) + 1, 
          day: new Date().getDate()
        }, Validators.required],
       color: [null],
       location: [null],
       allDay: [this.newEvent ? this.newEvent.allDay: false],
       calendar: [this.calendars[0].id, Validators.required]
     });
     if(this.newEvent) {
      this.allDay = true;
      this.form.patchValue({endTime: this.hours[this.hours.length - 1]});
    }
  }

  submit(form: any) {
    if (this.form.valid) {
      this.activeModal.close(this.form.value);
    }
  }

  close() {
    this.activeModal.dismiss();
  }

  setColor (color: string) {
    this.newEvent.color = color;
    this.form.patchValue({color: color});
  }

  allDayChanged (checked: boolean) {
      const startDate: Date = this.form.value.startDate;
      const endDate: Date = this.form.value.endDate;
      if (checked && dateFns.isSameDay(startDate, endDate)) {
        this.form.patchValue({endTime: this.hours[this.hours.length - 1]});
        this.allDay = true;
      }else if (!checked) {
        this.allDay = false;
      }else if (checked) {
        this.allDay = true;
      }
  }

  titleChanged($event) {
    if(this.newEvent) {
      this.newEvent.title = $event.target.value;
    }
  }

}
