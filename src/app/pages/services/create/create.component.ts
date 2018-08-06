import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactsService } from '../../../@core/data/contacts.service';
import { PropertyService } from '../../../@core/data/property.service';
import { ServicesService } from '../../../@core/data/services.service';
import { DialogNewContactComponent } from '../../contact/contact-form/contact-form.component';
import * as dateFns from 'date-fns';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as faker from 'faker';
import { Service } from '../../../@core/data/models/service';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ReservationsService } from '../../../@core/data/reservations.service';
import { PaymentService } from '../../../@core/data/payment.service';

@Component({
  selector: 'create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  service: Service;

  serviceId;

  public pageTitle;

  @ViewChild('form') form: FormGroup;

  isSubmitted = false;

  properties;
  providers;
  statuses;
  deadlines;
  frequencies;
  tvas;
  categories;
  subCategories;

  public reservations;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public modalService: NgbModal,
    public contactsService: ContactsService,
    public servicesService: ServicesService,
    public reservationService: ReservationsService,
    public paymentService: PaymentService,
    public propertyService: PropertyService) { }

  ngOnInit() {
    this.serviceId = this.route.snapshot.params.service;
    this.pageTitle = this.serviceId ? 'Modifier le service ' + this.serviceId : 'Ajouter une service';
    this.properties = of(this.propertyService.properties).pipe(delay(500));
    this.providers = of(this.contactsService.findBy('role.id', 3)).pipe(delay(500));
    this.statuses = this.servicesService.getStatuses();
    this.frequencies = this.servicesService.getFrequencies();
    this.categories = of(this.servicesService.getSubcategories()).pipe(delay(500));
    this.reservations = of(this.reservationService.findBy('property.id', this.propertyService.currentProperty.id)).pipe(delay(500));
    if (this.serviceId) {
      this.service = this.servicesService.find(Number.parseInt(this.serviceId));
      if (this.service) {
        this.reservations = of(this.reservationService.findBy('property.id', this.service.property.id)).pipe(delay(500));
        this.subCategories = of(this.servicesService.getTypes(this.service.type.subCategoryId)).pipe(delay(500));
      }
    }
    this.buildForm();
  }

  buildForm() {
    this.form = new FormGroup({
      id: new FormControl(this.service && this.service.id ? this.service.id : faker.random.number()),
      title: new FormControl(this.service && this.service.title ? this.service.title : null, Validators.required),
      description: new FormControl(this.service && this.service.description ? this.service.description : null),
      start: new FormControl(this.service ? {
        year: this.service.start.getFullYear(),
        month: dateFns.getMonth(this.service.start) + 1,
        day: this.service.start.getDate()
      } : null, Validators.required),
      end: new FormControl(this.service ? {
        year: this.service.end.getFullYear(),
        month: dateFns.getMonth(this.service.end) + 1,
        day: this.service.end.getDate()
      } : null, Validators.required),
      contractDate: new FormControl(this.service ? {
        year: this.service.contractDate.getFullYear(),
        month: dateFns.getMonth(this.service.contractDate) + 1,
        day: this.service.contractDate.getDate()
      } : null, Validators.required),
      priority: new FormControl(this.service && this.service.priority ? this.service.priority : null, [Validators.required]),
      deadline: new FormControl(this.service && this.service.deadline ? {
        year: this.service.deadline.getFullYear(),
        month: dateFns.getMonth(this.service.deadline) + 1,
        day: this.service.deadline.getDate()
      } : null, Validators.required),
      status: new FormControl(this.service && this.service.status ? this.service.status : null, Validators.required),
      provider: new FormControl(this.service && this.service.provider ? this.service.provider : null, Validators.required),
      price: new FormGroup({
        value: new FormControl(this.service && this.service.price ? this.service.price.value : null, Validators.required),
        currency: new FormControl(this.service ? this.service.price.currency : {
          symbol: '€',
          code: 'EUR'
        })
      }),
      frequency: new FormControl(this.service && this.service.frequency ? this.service.frequency : null, Validators.required),
      tva: new FormControl(this.service && this.service.tva ? this.service.tva : null, Validators.required),
      contractNumber: new FormControl(this.service && this.service.contractNumber ? this.service.contractNumber : null, [Validators.required]),
      property: new FormControl(this.service && this.service.property ? this.service.property : this.propertyService.currentProperty, Validators.required),
      reservation: new FormControl(this.service && this.service.reservation ? this.service.reservation : null),
      type: new FormControl(this.service && this.service.type ? this.service.type : null, Validators.required),
      category: new FormControl(this.service && this.service.category ? this.service.category : null, Validators.required),
      payments: new FormControl(this.service ? this.service.payments : []),
    });
  }

  get property(): any { return this.form.get('property'); }

  get reservation(): any { return this.form.get('reservation'); }

  get title(): any { return this.form.get('title'); }

  get type(): any { return this.form.get('type'); }

  get category(): any { return this.form.get('category'); }

  get description(): any { return this.form.get('description'); }

  get priority(): any { return this.form.get('priority'); }

  get deadline(): any { return this.form.get('deadline'); }

  get start(): any { return this.form.get('start'); }

  get end(): any { return this.form.get('end'); }

  get contractDate(): any { return this.form.get('contractDate'); }

  get contractNumber(): any { return this.form.get('contractNumber'); }

  get status(): any { return this.form.get('status'); }

  get frequency(): any { return this.form.get('frequency'); }

  get provider(): any { return this.form.get('provider'); }

  get price(): any { return this.form.get('price'); }

  get priceValue(): any { return this.form.get('price').get('value'); }

  get tva(): any { return this.form.get('tva'); }

  onCategoryChange(category) {
    if (category) {
      this.subCategories = of(this.servicesService.getTypes(category.id)).pipe(delay(500));
    } else {
      this.subCategories = of([]).pipe(delay(500));
      this.form.patchValue({ type: null });
    }
  }

  newContact() {
    const m = this.modalService.open(DialogNewContactComponent, { size: 'lg', container: 'nb-layout' });
    m.result.then((result) => {
      this.form.patchValue({ provider: result });
      this.providers.push(result);
    }, (reasen) => {
      // console.log(reasen);
    });
    m.componentInstance.type = { label: 'Prestataire de service', value: 'prestataire de service' };
  }

  formatDates() {
    this.form.patchValue({ start: dateFns.parse(this.start.value.year + '-' + this.start.value.month + '-' + this.start.value.day) });
    this.form.patchValue({ end: dateFns.parse(this.end.value.year + '-' + this.end.value.month + '-' + this.end.value.day) });
    this.form.patchValue({ contractDate: dateFns.parse(this.contractDate.value.year + '-' + this.contractDate.value.month + '-' + this.contractDate.value.day) });
    this.form.patchValue({ deadline: dateFns.parse(this.deadline.value.year + '-' + this.deadline.value.month + '-' + this.deadline.value.day) });
  }

  generateNewPayments() {
    let payments = this.paymentService.createServicePayments(this.form.value);
    this.form.patchValue({ payments: payments });
  }

  clearPayments() {
    this.service.payments.map(payment => {
      this.paymentService.delete(payment);
    });
  }

  save() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.formatDates();
      if (this.service) {
        this.clearPayments();
        this.generateNewPayments();
        this.servicesService.update(this.service, this.form.value);
      } else {
        this.generateNewPayments();
        this.servicesService.store(this.form.value);
      }
      this.back();
    }
  }

  back() {
    this.router.navigateByUrl('/pages/categories/services');
  }

  reset() {
    this.isSubmitted = false;
    this.buildForm();
  }

}
