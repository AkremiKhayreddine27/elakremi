import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as dateFns from 'date-fns';
import * as faker from 'faker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs/observable/of';
import { delay, take } from 'rxjs/operators';
import {
  PropertyService,
  SeasonalTariffService,
  ReservationsService,
  ContactsService,
  PaymentService,
  TariffsService,
} from '@core/data';

import { DialogNewContactComponent } from '../../contact/contact-form/contact-form.component';
import {
  Property,
  Reservation,
  SelectItem,
  Payment
} from '@core/data/models';
import 'style-loader!angular2-toaster/toaster.css';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../../store';
import { Pagination, FilterConf, SortConf } from '../../../store/helpers';

import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';

@Component({
  selector: 'show-reservation',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class NewReservationComponent implements OnInit {

  @ViewChild('form') form: FormGroup;

  public reservation: Reservation;

  public id;

  public pageTitle;

  public properties;

  public statuses: Observable<SelectItem[]>;

  public platforms: Observable<SelectItem[]>;

  lodgers;

  priceChanged: boolean = false;

  isSubmitted = false;

  constructor(
    private store: Store<fromStore.LocatusState>,
    public route: ActivatedRoute,
    public router: Router,
    public modalService: NgbModal,
    public propertyService: PropertyService,
    public contactsService: ContactsService,
    public paymentService: PaymentService,
    public tariffsService: TariffsService,
    public seasonalTariffService: SeasonalTariffService,
    public toasterService: ToasterService,
    public reservationsService: ReservationsService) { }

  ngOnInit() {
    this.statuses = this.reservationsService.getStatuses();
    this.platforms = this.reservationsService.getPlatforms();
    this.properties = of(this.propertyService.properties).pipe(delay(500));
    this.lodgers = of(this.contactsService.findBy('role.id', 2)).pipe(delay(500));
    this.id = this.route.snapshot.params.reservation;
    this.pageTitle = this.id ? 'Modifier la réservation ' + this.id : 'Ajouter une réservation';
    if (this.id) {
      this.store.select(fromStore.getSelectedReservation).subscribe(reservation => {
        this.reservation = reservation;
      });
      this.store.dispatch(new fromStore.SelectReservation(Number.parseInt(this.id)));
      if (this.reservation) {
        this.store.dispatch(new fromStore.LoadPayments({
          filters: [
            {
              field: 'nomenclature',
              search: this.reservation.id.toString(),
              filter(cell: any, search: any) {
                return cell.id.toString() === search && cell.type === 'Réservation';
              }
            }
          ], andOperator: true
        }));
      }
    }
    this.buildForm();
    this.onChanges();
  }

  onChanges(): void {
    this.price.valueChanges.subscribe(val => {
      this.priceChanged = false;
    });
  }

  buildForm() {
    this.form = new FormGroup({
      id: new FormControl(this.reservation ? this.reservation.id : faker.random.number()),
      title: new FormControl(this.reservation ? this.reservation.title : null, [Validators.minLength(4)]),
      description: new FormControl(this.reservation ? this.reservation.description : null),
      start: new FormControl(this.reservation ? {
        year: this.reservation.start.getFullYear(),
        month: dateFns.getMonth(this.reservation.start) + 1,
        day: this.reservation.start.getDate()
      } : null, Validators.required),
      end: new FormControl(this.reservation ? {
        year: this.reservation.end.getFullYear(),
        month: dateFns.getMonth(this.reservation.end) + 1,
        day: this.reservation.end.getDate()
      } : null, Validators.required),
      nbrNight: new FormControl(this.reservation && this.reservation.nbrNight ? this.reservation.nbrNight : 0),
      reservationDate: new FormControl(this.reservation && this.reservation.reservationDate ? {
        year: this.reservation.reservationDate.getFullYear(),
        month: dateFns.getMonth(this.reservation.reservationDate) + 1,
        day: this.reservation.reservationDate.getDate()
      } : null),
      deadlineDate: new FormControl(this.reservation ? {
        year: this.reservation.deadlineDate.getFullYear(),
        month: dateFns.getMonth(this.reservation.deadlineDate) + 1,
        day: this.reservation.deadlineDate.getDate()
      } : null, Validators.required),
      status: new FormControl(this.reservation ? this.reservation.status : null, Validators.required),
      platform: new FormControl(this.reservation ? this.reservation.platform : null, Validators.required),
      lodger: new FormControl(this.reservation ? this.reservation.lodger : null, Validators.required),
      property: new FormControl(this.reservation && this.reservation.property ? this.reservation.property : this.propertyService.currentProperty, Validators.required),
      nbrAdultes: new FormControl(this.reservation ? this.reservation.nbrAdultes : 0),
      nbrChildren: new FormControl(this.reservation ? this.reservation.nbrChildren : 0),
      nbrPets: new FormControl(this.reservation ? this.reservation.nbrPets : 0),
      price: new FormGroup({
        value: new FormControl(this.reservation ? this.reservation.price.value : null, [Validators.required, Validators.min(0)]),
        currency: new FormControl(this.reservation ? this.reservation.price.currency : {
          symbol: '€',
          code: 'EUR'
        })
      }),
      deposit: new FormControl(this.reservation ? this.reservation.deposit : this.tariffsService.findFirstBy('property.id', this.propertyService.currentProperty.id).deposit, [Validators.required, Validators.min(0), Validators.max(99)]),
      bail: new FormGroup({
        value: new FormControl(this.reservation ? this.reservation.bail.value : this.tariffsService.findFirstBy('property.id', this.propertyService.currentProperty.id).bail, [Validators.required, Validators.min(0)]),
        currency: new FormControl(this.reservation ? this.reservation.bail.currency : {
          symbol: '€',
          code: 'EUR'
        })
      }),
      balance: new FormGroup({
        value: new FormControl(this.reservation ? this.reservation.balance.value : 0, Validators.required),
        currency: new FormControl(this.reservation ? this.reservation.balance.currency : {
          symbol: '€',
          code: 'EUR'
        })
      }),
      adjusted: new FormGroup({
        value: new FormControl(this.reservation ? this.reservation.adjusted.value : 0, Validators.required),
        currency: new FormControl(this.reservation ? this.reservation.adjusted.currency : {
          symbol: '€',
          code: 'EUR'
        })
      }),
      payments: new FormControl(this.reservation ? this.reservation.payments : []),
      documents: new FormControl(this.reservation ? this.reservation.documents : []),
      createdAt: new FormControl(this.reservation ? this.reservation.createdAt : new Date()),
      updatedAt: new FormControl(new Date())
    });
  }

  get property(): any { return this.form.get('property'); }

  get price(): any { return this.form.get('price'); }

  get priceValue(): any { return this.form.get('price').get('value'); }

  get deposit(): any { return this.form.get('deposit'); }

  get bail(): any { return this.form.get('bail'); }

  get balance(): any { return this.form.get('balance'); }

  get adjusted(): any { return this.form.get('adjusted'); }

  get balanceValue(): any { return this.form.get('balance').get('value'); }

  get bailValue(): any { return this.form.get('bail').get('value'); }

  get description(): any { return this.form.get('description'); }

  get title(): any { return this.form.get('title'); }

  get start(): any { return this.form.get('start'); }

  get end(): any { return this.form.get('end'); }

  get reservationDate(): any { return this.form.get('reservationDate'); }

  get deadlineDate(): any { return this.form.get('deadlineDate'); }

  get status(): any { return this.form.get('status'); }

  get platform(): any { return this.form.get('platform') }

  get adultes(): any { return this.form.get('nbrAdultes').value; }

  get children(): any { return this.form.get('nbrChildren').value; }

  get pets(): any { return this.form.get('nbrPets').value; }

  get lodger(): any { return this.form.get('lodger'); }

  onStartDateSelect(date) {
    this.end.enable();
    if (this.form.value.end) {
      let tariff = this.tariffsService.findActiveTariff().price;
      const start = dateFns.parse(this.start.value.year + '-' + this.start.value.month + '-' + this.start.value.day);
      const end = dateFns.parse(this.end.value.year + '-' + this.end.value.month + '-' + this.end.value.day);
      const amount = dateFns.differenceInDays(end, start) * tariff;
      if (amount < 0) {
        this.end.setErrors({ 'endDateBefore': true });
        this.start.setErrors({ 'startDateAfter': true });
      } else {
        this.price.patchValue({ value: amount });
        this.priceChanged = true;
      }
    }
  }

  onEndDateSelect(date) {
    this.start.enable();
    if (this.form.value.start) {
      let tariff = this.tariffsService.findActiveTariff().price;
      const start = dateFns.parse(this.start.value.year + '-' + this.start.value.month + '-' + this.start.value.day);
      const end = dateFns.parse(this.end.value.year + '-' + this.end.value.month + '-' + this.end.value.day);
      const amount = dateFns.differenceInDays(end, start) * tariff;
      if (amount < 0) {
        this.end.setErrors({ 'endDateBefore': true });
        this.start.setErrors({ 'startDateAfter': true });
      } else {
        this.price.patchValue({ value: amount });
        this.priceChanged = true;
      }
    }
  }

  newContact() {
    const m = this.modalService.open(DialogNewContactComponent, { size: 'lg', container: 'nb-layout' });
    m.result.then((result) => {
      this.form.patchValue({ lodger: result });
      this.lodgers.push(result);
    }, (reasen) => {
      // console.log(reasen);
    });
    m.componentInstance.type = { label: 'Locataire', value: 'locataire' };
  }

  formatDates() {
    this.form.patchValue({ start: dateFns.parse(this.start.value.year + '-' + this.start.value.month + '-' + this.start.value.day) });
    this.form.patchValue({ end: dateFns.parse(this.end.value.year + '-' + this.end.value.month + '-' + this.end.value.day) });
    if (this.reservationDate.value) {
      this.form.patchValue({ reservationDate: dateFns.parse(this.reservationDate.value.year + '-' + this.reservationDate.value.month + '-' + this.reservationDate.value.day) });
    }
    this.form.patchValue({ deadlineDate: dateFns.parse(this.deadlineDate.value.year + '-' + this.deadlineDate.value.month + '-' + this.deadlineDate.value.day) });
  }

  save() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.formatDates();
      this.form.value.nbrNight = dateFns.differenceInDays(this.form.value.end, this.form.value.start) + ' nuitées';
      let property = this.form.value.property;
      if (this.reservation) {        
        this.store.dispatch(new fromStore.UpdateReservation(this.reservation.id, this.form.value));
        this.store.dispatch(new fromStore.UpdateSoujournPayments(this.reservation, this.form.value));
        this.store.dispatch(new fromStore.CalculateReservationBalance(this.reservation.id));
        this.store.dispatch(new fromStore.CalculateReservationAdjusted(this.reservation.id));
      } else {
        this.store.dispatch(new fromStore.CreateReservation(this.form.value));
        this.store.dispatch(new fromStore.CreateSoujournPayments(this.form.value));
        this.store.dispatch(new fromStore.CalculateReservationBalance(this.form.value.id));
        this.store.dispatch(new fromStore.CalculateReservationAdjusted(this.form.value.id));
      }
      this.propertyService.setCurrentProperty(property.id);
      this.router.navigateByUrl('/pages/reservations');
    }
  }

  back() {
    this.router.navigateByUrl('/pages/reservations');
  }

  reset() {
    this.isSubmitted = false;
    this.buildForm();
  }

}
