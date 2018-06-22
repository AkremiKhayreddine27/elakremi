import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as dateFns from 'date-fns';
import { TariffsService } from '../../../@core/data/tariffs.service';

@Component({
  selector: 'dialog-new-event',
  templateUrl: './dialog-new-event.component.html',
  styleUrls: ['./dialog-new-event.component.scss']
})
export class DialogNewEventComponent implements OnInit {

  @Input() event;

  private newEvent;

  submitted = false;

  constructor(public activeModal: NgbActiveModal, private tariffsService: TariffsService) { }

  ngOnInit() {
    if (!this.event) {
      this.newEvent =
        {
          title: '',
          amount: null,
          startDate: {
            year: new Date().getFullYear(),
            month: dateFns.getMonth(new Date()) + 1,
            day: new Date().getDate()
          },
          endDate: {
            year: new Date().getFullYear(),
            month: dateFns.getMonth(new Date()) + 1,
            day: new Date().getDate()
          },
          minDuration: 0
        }
    } else {
      this.newEvent = { ...this.event };
      this.newEvent.startDate = {
        year: this.newEvent.startDate.getFullYear(),
        month: dateFns.getMonth(this.newEvent.startDate) + 1,
        day: this.newEvent.startDate.getDate()
      };
      this.newEvent.endDate = {
        year: this.newEvent.endDate.getFullYear(),
        month: dateFns.getMonth(this.newEvent.endDate) + 1,
        day: this.newEvent.endDate.getDate()
      };
    }
  }

  save() {
    this.submitted = true;
    if (!this.event) {
      this.newEvent.startDate = dateFns.parse(this.newEvent.startDate.year + '-' + this.newEvent.startDate.month + '-' + this.newEvent.startDate.day);
      this.newEvent.endDate = dateFns.parse(this.newEvent.endDate.year + '-' + this.newEvent.endDate.month + '-' + this.newEvent.endDate.day);
      this.tariffsService.addTarifEvent(this.newEvent);
    } else {
      this.newEvent.startDate = dateFns.parse(this.newEvent.startDate.year + '-' + this.newEvent.startDate.month + '-' + this.newEvent.startDate.day);
      this.newEvent.endDate = dateFns.parse(this.newEvent.endDate.year + '-' + this.newEvent.endDate.month + '-' + this.newEvent.endDate.day);
      this.tariffsService.updateTarifEvent(this.newEvent);
    }
    this.close();
  }

  close() {
    this.activeModal.dismiss();
  }

}
