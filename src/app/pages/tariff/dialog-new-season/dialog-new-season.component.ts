import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as dateFns from 'date-fns';
import { TariffsService } from '../../../@core/data/tariffs.service';

@Component({
  selector: 'dialog-new-season',
  templateUrl: './dialog-new-season.component.html',
  styleUrls: ['./dialog-new-season.component.scss']
})
export class DialogNewSeasonComponent implements OnInit {

  @Input() currentPeriod;

  @Input() season;

  private newSeason;


  submitted = false;

  constructor(public activeModal: NgbActiveModal, private tariffsService: TariffsService) { }

  ngOnInit() {
    if (!this.season) {
      this.newSeason =
        {
          title: '',
          nightAmount: null,
          weekendAmount: null,
          weekAmount: null,
          monthAmount: null,
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
      this.newSeason = { ...this.season };
      this.newSeason.startDate = {
        year: this.newSeason.startDate.getFullYear(),
        month: dateFns.getMonth(this.newSeason.startDate) + 1,
        day: this.newSeason.startDate.getDate()
      };
      this.newSeason.endDate = {
        year: this.newSeason.endDate.getFullYear(),
        month: dateFns.getMonth(this.newSeason.endDate) + 1,
        day: this.newSeason.endDate.getDate()
      };
    }
  }

  close() {
    this.activeModal.dismiss();
  }

  save() {
    this.submitted = true;
    if (!this.season) {
      this.newSeason.startDate = dateFns.parse(this.newSeason.startDate.year + '-' + this.newSeason.startDate.month + '-' + this.newSeason.startDate.day);
      this.newSeason.endDate = dateFns.parse(this.newSeason.endDate.year + '-' + this.newSeason.endDate.month + '-' + this.newSeason.endDate.day);
      this.tariffsService.add(this.newSeason);
    } else {
      this.newSeason.startDate = dateFns.parse(this.newSeason.startDate.year + '-' + this.newSeason.startDate.month + '-' + this.newSeason.startDate.day);
      this.newSeason.endDate = dateFns.parse(this.newSeason.endDate.year + '-' + this.newSeason.endDate.month + '-' + this.newSeason.endDate.day);
      this.tariffsService.update(this.newSeason);
    }
    this.close();
  }

}
