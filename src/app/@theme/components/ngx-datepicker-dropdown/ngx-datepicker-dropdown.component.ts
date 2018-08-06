import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownConfig, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import * as dateFns from 'date-fns';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;


@Component({
  selector: 'ngx-datepicker-dropdown',
  templateUrl: './ngx-datepicker-dropdown.component.html',
  styleUrls: ['./ngx-datepicker-dropdown.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NgxDatepickerDropdownComponent implements OnInit {

  @Output()
  dateChanged: EventEmitter<{ from: any, to: any }> = new EventEmitter();

  @ViewChild(NgbDropdown)
  private dropdown: NgbDropdown;

  hoveredDate: NgbDateStruct;

  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;

  from;
  to;

  constructor(public calendar: NgbCalendar, config: NgbDropdownConfig) {
    config.autoClose = false;
  }

  ngOnInit() {

  }

  onDateSelection(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.from = dateFns.parse(date.year + '-' + date.month + '-' + date.day);
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
      this.to = dateFns.parse(date.year + '-' + date.month + '-' + date.day);
      this.dropdown.close();
    } else {
      this.toDate = null;
      this.to = null;
      this.fromDate = date;
      this.from = dateFns.parse(date.year + '-' + date.month + '-' + date.day);
      this.dropdown.close();
    }
    this.dateChanged.emit({ from: this.from, to: this.to });
  }

  cancel() {
    this.fromDate = this.toDate = this.from = this.to = null;
    this.dateChanged.emit({ from: this.from, to: this.to });
    this.dropdown.close();
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

}
