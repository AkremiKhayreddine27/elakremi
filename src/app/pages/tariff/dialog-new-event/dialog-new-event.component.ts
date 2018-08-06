import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as dateFns from 'date-fns';
import { PropertyService } from '../../../@core/data/property.service';
import { TariffsService } from '../../../@core/data/tariffs.service';
import * as faker from 'faker';
import { EventTariffService } from '../../../@core/data/event-tariff.service';
import { EventService } from '../../../@core/data/event.service';

@Component({
  selector: 'dialog-new-event',
  templateUrl: './dialog-new-event.component.html',
  styleUrls: ['./dialog-new-event.component.scss']
})
export class DialogNewEventComponent implements OnInit {


  @ViewChild('form') form: FormGroup;

  @Input() eventTariff;

  isSubmitted: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    public propertyService: PropertyService,
    public eventTariffService: EventTariffService,
    public eventService: EventService,
    public tariffsService: TariffsService) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = new FormGroup({
      id: new FormControl(this.eventTariff ? this.eventTariff.id : faker.random.number()),
      event: new FormGroup({
        id: new FormControl(this.eventTariff ? this.eventTariff.event.id : faker.random.number()),
        value: new FormControl(this.eventTariff && this.eventTariff.event ? this.eventTariff.event.value : null, Validators.required),
        start: new FormControl(this.eventTariff && this.eventTariff.event ? {
          year: this.eventTariff.event.start.getFullYear(),
          month: dateFns.getMonth(this.eventTariff.event.start) + 1,
          day: this.eventTariff.event.start.getDate()
        } : null, Validators.required),
        end: new FormControl(this.eventTariff && this.eventTariff.event ? {
          year: this.eventTariff.event.end.getFullYear(),
          month: dateFns.getMonth(this.eventTariff.event.end) + 1,
          day: this.eventTariff.event.end.getDate()
        } : null, Validators.required),
        duration: new FormControl(this.eventTariff && this.eventTariff.event ? this.eventTariff.event.duration : 1, Validators.required)
      }),
      price: new FormControl(this.eventTariff ? this.eventTariff.price : null, Validators.required),
      tariff: new FormControl(this.eventTariff ? this.eventTariff.tariff : this.tariffsService.findFirstBy('property.id', this.propertyService.currentProperty.id))
    });
  }

  get event(): FormGroup { return this.form.get('event') as FormGroup }

  get eventName(): FormControl { return this.event.get('value') as FormControl }

  get start(): FormControl { return this.event.get('start') as FormControl }

  get end(): FormControl { return this.event.get('end') as FormControl }

  get price(): FormControl { return this.form.get('price') as FormControl }

  formatDates() {
    this.event.patchValue({ start: dateFns.parse(this.start.value.year + '-' + this.start.value.month + '-' + this.start.value.day) });
    this.event.patchValue({ end: dateFns.parse(this.end.value.year + '-' + this.end.value.month + '-' + this.end.value.day) });
  }

  reset() {
    this.isSubmitted = false;
    this.buildForm();
  }

  save() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.formatDates();
      if (this.eventTariff) {
        this.eventService.update(this.eventTariff.event, this.event.value);
        this.eventTariffService.update(this.eventTariff, this.form.value);
      } else {
        this.eventService.store(this.event.value);
        this.eventTariffService.store(this.form.value);
      }
      this.close();
    }
  }

  close() {
    this.activeModal.dismiss();
  }

}
