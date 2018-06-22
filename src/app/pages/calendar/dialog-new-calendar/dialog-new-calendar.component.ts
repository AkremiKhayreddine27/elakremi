import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';

import { CalendarService } from '../../../@core/data/calendar.service';

const colors = [
  '#f4511e',
  '#0b8043',
  '#039be5',
  '#d50000',
  '#8e24aa',
  '#010101'
];

@Component({
  selector: 'app-dialog-new-calendar',
  templateUrl: './dialog-new-calendar.component.html',
  styleUrls: ['./dialog-new-calendar.component.scss']
})
export class DialogNewCalendarComponent implements OnInit {

  public form: FormGroup;
  public colors = colors;

  constructor(private calendarService: CalendarService, private formBuilder: FormBuilder, public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(2)]],
      color: ['#8e24aa', Validators.required],
    });
  }

  submit(form: any) {
    if (this.form.valid) {
      this.calendarService.add({
        id: this.calendarService.all().length + 1,
        name: this.form.value.name,
        url: '',
        color: this.form.value.color,
        isLocal: true,
        display: true,
        events: []
      });
      this.activeModal.close();
    }
  }

  close() {
    this.activeModal.dismiss();
  }

  setColor (color: string) {
    this.form.patchValue({color: color});
  }

}
