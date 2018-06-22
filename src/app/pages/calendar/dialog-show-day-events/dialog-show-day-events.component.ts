import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent } from 'ngx-calendar';

@Component({
  selector: 'app-dialog-show-day-events',
  templateUrl: './dialog-show-day-events.component.html',
  styleUrls: ['./dialog-show-day-events.component.scss']
})
export class DialogShowDayEventsComponent implements OnInit {

  @Input() day: Date;

  @Input() events: CalendarEvent[];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  close() {
    this.activeModal.dismiss();
  }

}
