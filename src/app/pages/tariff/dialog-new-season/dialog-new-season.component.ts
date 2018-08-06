import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as dateFns from 'date-fns';
import { TariffsService } from '../../../@core/data/tariffs.service';
import { SeasonalTariffService } from '../../../@core/data/seasonal-tariff.service';
import * as faker from 'faker';
import { PropertyService } from '../../../@core/data/property.service';
import { SeasonService } from '../../../@core/data/season.service';

@Component({
  selector: 'dialog-new-season',
  templateUrl: './dialog-new-season.component.html',
  styleUrls: ['./dialog-new-season.component.scss']
})
export class DialogNewSeasonComponent implements OnInit {

  @ViewChild('form') form: FormGroup;

  @Input() currentPeriod;

  @Input() tariff;

  isSubmitted = false;

  pageTitle = 'Ajouter un saison';

  constructor(
    public activeModal: NgbActiveModal,
    public tariffsService: TariffsService,
    public propertyService: PropertyService,
    public seasonService: SeasonService,
    public seasonalTariffService: SeasonalTariffService) {

  }

  ngOnInit() {
    if (this.tariff) {
      this.pageTitle = 'Modifier le montant de ' + this.tariff.period.value + ' de saison ' + this.tariff.season.value;
      this.buildEditForm();
    } else {
      this.buildStoreForm();
    }
  }

  reset() {
    this.isSubmitted = false;
    if (this.tariff) {
      this.buildEditForm();
    } else {
      this.buildStoreForm();
    }
  }

  buildStoreForm() {
    this.form = new FormGroup({
      id: new FormControl(faker.random.number()),
      season: new FormGroup({
        id: new FormControl(faker.random.number()),
        value: new FormControl(null, Validators.required),
        start: new FormControl(null, Validators.required),
        end: new FormControl(null, Validators.required),
      }),
      periods: new FormArray([]),
      tariff: new FormControl(this.tariffsService.findFirstBy('property.id', this.propertyService.currentProperty.id))
    });
    this.buildPeriods();
  }

  buildEditForm() {
    this.form = new FormGroup({
      id: new FormControl(this.tariff.id, Validators.required),
      season: new FormGroup({
        id: new FormControl(this.tariff.season.id),
        value: new FormControl(this.tariff.season.value, Validators.required),
        start: new FormControl({
          year: this.tariff.season.start.getFullYear(),
          month: dateFns.getMonth(this.tariff.season.start) + 1,
          day: this.tariff.season.start.getDate()
        }, Validators.required),
        end: new FormControl({
          year: this.tariff.season.end.getFullYear(),
          month: dateFns.getMonth(this.tariff.season.end) + 1,
          day: this.tariff.season.end.getDate()
        }, Validators.required),
      }),
      period: new FormGroup({
        id: new FormControl(this.tariff.period.id),
        value: new FormControl(this.tariff.period.value),
        active: new FormControl(this.tariff.period.active),
        minDuration: new FormControl(this.tariff.period.minDuration),
      }),
      price: new FormControl(this.tariff.price, Validators.required),
      tariff: new FormControl(this.tariff.tariff)
    })
  }

  buildPeriods() {
    this.seasonalTariffService.periods.map(period => {
      let p = new FormGroup({
        id: new FormControl(period.id),
        value: new FormControl(period.value),
        active: new FormControl(period.active),
        minDuration: new FormControl(period.minDuration),
        price: new FormControl(null, Validators.required)
      });
      this.periods.push(p);
    });
  }

  get season(): FormGroup { return this.form.get('season') as FormGroup; }

  get seasonName(): FormControl { return this.season.get('value') as FormControl }

  get start(): FormControl { return this.season.get('start') as FormControl; }

  get end(): FormControl { return this.season.get('end') as FormControl; }

  get periods(): FormArray { return this.form.get('periods') as FormArray }

  get period(): FormGroup { return this.form.get('period') as FormGroup }

  get price(): FormControl { return this.form.get('price') as FormControl }

  close() {
    this.activeModal.dismiss();
  }

  formatDates() {
    this.season.patchValue({ start: dateFns.parse(this.start.value.year + '-' + this.start.value.month + '-' + this.start.value.day) });
    this.season.patchValue({ end: dateFns.parse(this.end.value.year + '-' + this.end.value.month + '-' + this.end.value.day) });
  }

  save() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.formatDates();
      if (this.tariff) {
        this.seasonalTariffService.update(this.tariff, this.form.value);
      } else {
        this.seasonService.store(this.season.value);
        let periods: FormArray = this.periods;
        this.form.removeControl('periods');
        periods.controls.map((control: FormGroup) => {
          let price = control.get('price').value;
          control.removeControl('price');
          this.form.addControl('price', new FormControl(price));
          this.form.addControl('period', new FormControl(control.value));
          this.seasonalTariffService.store(this.form.value);
          this.form.removeControl('price');
          this.form.removeControl('period');
        });
      }
      this.close();
    }
  }

}
