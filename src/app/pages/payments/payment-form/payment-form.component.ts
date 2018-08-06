import { Component, OnInit, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as dateFns from 'date-fns';
import { PaymentService } from '../../../@core/data/payment.service';
import { Payment } from '../../../@core/data/models/payment';
import { ContactsService } from '../../../@core/data/contacts.service';
import { DateService } from '../../../@core/data/date.service';
import { ReservationsService } from '../../../@core/data/reservations.service';
import { PropertyService } from '../../../@core/data/property.service';
import * as faker from 'faker';
import { Observable } from 'rxjs/Observable';
import { SelectItem, User, Reservation } from '../../../@core/data/models';
import { filter, find } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';
import { ServicesService } from '../../../@core/data/services.service';

@Component({
  selector: 'payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {

  @Input() payment: Payment;

  @Input() nomenclatureType: any;

  service;

  public title;

  public form: FormGroup;

  mode: string = 'Dépense';

  public types: Observable<SelectItem[]>;

  public statuses: Observable<SelectItem[]>;

  public methods: Observable<SelectItem[]>;

  public payers: Observable<User[]>;

  public contact;

  public contactType;

  public filtredTypes;

  public nomenclatures: Observable<any[]>;

  isSubmitted = false;

  constructor(
    public activeModal: NgbActiveModal,
    public paymentService: PaymentService,
    public contactsService: ContactsService,
    public reservationsService: ReservationsService,
    public servicesService: ServicesService,
    public propertyService: PropertyService,
    public dateService: DateService) { }

  ngOnInit() {
    let nomenclature = this.nomenclatureType ? this.nomenclatureType.type : this.payment ? this.payment.nomenclature.type : null;
    this.service = nomenclature === 'Réservation' ? this.reservationsService : this.servicesService;
    this.title = this.payment ? 'Modifier le paiement ' + this.payment.id : 'Ajouter un paiement';

    this.methods = this.paymentService.getMethods();

    this.statuses = this.paymentService.getStatuses();

    this.mode = this.payment && this.payment.type ? this.payment.type.isOutgo ? 'Dépense' : 'Revenue' : 'Dépense';

    this.types = of(this.paymentService.getFiltredType(this.mode, this.nomenclatureType)).pipe(delay(500));

    this.nomenclatures = of(this.paymentService.getNomenclatures(this.service.findBy('property.id', this.propertyService.currentProperty.id), this.nomenclatureType ? this.nomenclatureType.type : this.payment && this.payment.nomenclature.type ? this.payment.nomenclature.type : null)).pipe(delay(500));


    this.payers = of(this.contactsService.all()).pipe(delay(500));


    this.buildForm();
  }

  buildForm() {
    this.form = new FormGroup({
      id: new FormControl(this.payment && this.payment.id ? this.payment.id : faker.random.number()),
      description: new FormControl(this.payment ? this.payment.description : null),
      price: new FormGroup({
        value: new FormControl(this.payment && this.payment.price ? this.payment.price.value : null, Validators.required),
        currency: new FormControl(this.payment && this.payment.price ? this.payment.price.currency : {
          symbol: '€',
          code: 'EUR'
        })
      }),
      tva: new FormControl(this.payment && this.payment.tva ? this.payment.tva : null, Validators.required),
      status: new FormControl(this.payment && this.payment.status ? this.payment.status : null, Validators.required),
      method: new FormControl(this.payment && this.payment.method ? this.payment.method : null, Validators.required),
      type: new FormControl(this.payment && this.payment.type ? this.payment.type : null, Validators.required),
      paymentDate: new FormControl(this.payment && this.payment.paymentDate ? {
        year: this.payment.paymentDate.getFullYear(),
        month: dateFns.getMonth(this.payment.paymentDate) + 1,
        day: this.payment.paymentDate.getDate()
      } : null),
      deadlineDate: new FormControl(this.payment && this.payment.deadlineDate ? {
        year: this.payment.deadlineDate.getFullYear(),
        month: dateFns.getMonth(this.payment.deadlineDate) + 1,
        day: this.payment.deadlineDate.getDate()
      } : null, Validators.required),
      payer: new FormControl(this.payment && this.payment.payer ? this.payment.payer : null, Validators.required),
      payee: new FormControl(this.payment && this.payment.payee ? this.payment.payee : null),
      nomenclature: new FormControl(this.payment && this.payment.nomenclature ? this.payment.nomenclature : this.nomenclatureType ? this.nomenclatureType : null),
      propertyId: new FormControl(this.payment && this.payment.propertyId ? this.payment.propertyId : null)
    });
  }

  get nomenclature(): any { return this.form.get('nomenclature'); }

  get payer(): any { return this.form.get('payer'); }

  get payee(): any { return this.form.get('payee'); }

  get status(): any { return this.form.get('status'); }

  get type(): any { return this.form.get('type'); }

  get method(): any { return this.form.get('method'); }

  get tva(): any { return this.form.get('tva'); }

  get description(): any { return this.form.get('description'); }

  get paymentDate(): any { return this.form.get('paymentDate'); }

  get deadlineDate(): any { return this.form.get('deadlineDate'); }

  get price(): any { return this.form.get('price'); }

  get priceValue(): any { return this.price.get('value'); }

  currentMode() {
    return this.mode === 'Dépense';
  }

  toggleMode(checked) {
    if (checked) {
      this.mode = 'Revenu';
      this.types = of(this.paymentService.getFiltredType(this.mode, this.nomenclatureType)).pipe(delay(500));
    } else {
      this.mode = 'Dépense';
      this.types = of(this.paymentService.getFiltredType(this.mode, this.nomenclatureType)).pipe(delay(500));
    }
  }

  submit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.form.patchValue({ paymentDate: dateFns.parse(this.paymentDate.value.year + '-' + this.paymentDate.value.month + '-' + this.paymentDate.value.day) });
      this.form.patchValue({ deadlineDate: dateFns.parse(this.deadlineDate.value.year + '-' + this.deadlineDate.value.month + '-' + this.deadlineDate.value.day) });
      this.form.patchValue({ propertyId: this.paymentService.getNomenclature(this.service.findBy('property.id', this.propertyService.currentProperty.id), this.nomenclature.value.id).property.id });
      if (this.payment) {
        this.paymentService.update(this.payment, this.form.value);
      } else {
        this.paymentService.store(this.form.value);
      }
      this.activeModal.dismiss();
    }
  }

  close() {
    this.activeModal.dismiss();
  }
}
