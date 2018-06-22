import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Calendar } from 'ngx-calendar';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-dialog-export-calendar',
  templateUrl: './dialog-export-calendar.component.html',
  styleUrls: ['./dialog-export-calendar.component.scss']
})
export class DialogExportCalendarComponent implements OnInit {

  @Input()
  calendars: Calendar[];

  calendarsToExport: Calendar[] = [];

  public form: FormGroup;

  refresh: Subject<any> = new Subject();

  canExport: boolean = true;

  constructor(private formBuilder: FormBuilder, public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.calendarsToExport = this.calendars;
    this.refreshForm();
  }

  refreshForm() {
    this.form = this.formBuilder.group({
      activeCalendars: this.buildCalendars(),
      color: ['#8e24aa'],
    });
  }

  buildCalendars() {
    const arr = this.calendars.map(calendar => {
      return this.formBuilder.control(true);
    });
    return this.formBuilder.array(arr);
  }

  get activeCalendars(): FormArray {
    return this.form.get('activeCalendars') as FormArray;
  }

  close() {
    this.activeModal.dismiss();
  }

  filter () {
    this.calendarsToExport = [];
    const activeCalendars = this.form.get('activeCalendars') as FormArray;
    let active = 0;
    activeCalendars.controls.forEach((calendar, index) => {
      this.calendars.map((cal: Calendar) => {
        if (calendar.value && this.calendars[index].id === cal.id) {
          this.calendarsToExport.push(cal);
          active++;
        }
      });
    });
    if(active === 0) {
      this.canExport = false;
    }else {
      this.canExport = true;
    }
    this.refresh.next();
  }

}
