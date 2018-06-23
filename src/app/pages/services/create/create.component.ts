import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
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

@Component({
  selector: 'create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  service: Service = {
    id: faker.random.number(),
    title: null,
    description: null,
    startDate: new Date(),
    endDate: new Date(),
    createdAt: new Date(),
    priority: null,
    type: {
      title: null,
      slug: null,
      subCategory: null,
      category: null
    },
    subscriptionDate: new Date(),
    deadline: 'une fois',
    status: null,
    provider: null,
    numeroContrat: null,
    tariff: {
      amount: null,
      tva: 0,
      deadline: 'une fois'
    },
    paymentStatus: 'à payer',
    payments: [],
    documents: [],
    reservationId: null
  };

  serviceId;

  type;

  @ViewChild('form') form: FormGroup;

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  lodgers = [];

  contact;

  public properties: any[] = [];

  public statuses: any[];

  public deadlines: any[];

  public currentDeadline = { label: 'une fois', value: 'une fois' };

  public frequencies: any[];

  public currentFrequency = { label: 'une fois', value: 'une fois' };

  public statusDefault = { label: 'Choisir un Statut', value: 'Choisir un Statut' };

  public tvas: any[];

  public currentTva;

  public subCategory;

  public categories;

  public currentCategory;

  public subCategories = [];

  public currentSubCategory;

  public currentProperty;

  public category;

  public reservations;

  public reservationDefault;

  public pageTitle;

  public serviceReservation;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public modalService: NgbModal,
    public contactsService: ContactsService,
    public formBuilder: FormBuilder,
    public servicesService: ServicesService,
    public propertyService: PropertyService) { }

  ngOnInit() {
    this.serviceId = this.route.snapshot.params.service;
    const depense = this.category ? this.category.title : 'service';
    this.pageTitle = this.serviceId ? 'Modifier le service ' + this.serviceId : 'Ajouter une ' + depense;

    this.categories = this.servicesService.getCategories().map(category => {
      return { label: category.title, value: category.title, slug: category };
    });

    this.statuses = this.servicesService.statuses;
    this.statusDefault = this.service.status ? { label: this.service.status, value: this.service.status } : { label: 'Choisir un Statut', value: 'Choisir un Statut' };

    this.deadlines = this.servicesService.deadlines;
    this.currentDeadline = this.service.deadline ? { label: this.service.deadline, value: this.service.deadline } : { label: 'une fois', value: 'une fois' };

    this.tvas = this.servicesService.tvas;
    this.currentTva = this.service.tariff.tva ? { label: this.service.tariff.tva, value: this.service.tariff.tva } : { label: 'Définir le TVA', value: 'Définir le TVA' };

    this.frequencies = this.servicesService.frequencies;
    this.currentFrequency = this.service.tariff.deadline ? { label: this.service.tariff.deadline, value: this.service.deadline } : { label: 'une fois', value: 'une fois' };

    this.contact = this.service.provider;

    this.currentProperty = { label: this.propertyService.currentProperty.title, value: this.propertyService.currentProperty.title };

    if (this.servicesService.currentService) {
      this.servicesService.getCategories().map(category => {
        if (this.servicesService.currentService.subCategory.slug === category.slug) {
          this.category = category;
          this.subCategories = category.services.map(service => {
            if (service.slug === this.servicesService.currentService.slug) {
              this.currentSubCategory = { label: service.title, value: service.title, slug: service.slug };
            }
            return { label: service.title, value: service.title, slug: service.slug };
          });
          this.currentCategory = { label: category.title, value: category.title, slug: category };
        }
      });
    } else {
      this.currentCategory = { label: 'Catégorie', value: 'Catégorie', slug: 'Catégorie' };
      this.currentSubCategory = { label: 'Sous catégorie', value: 'Sous catégorie', slug: 'Sous catégorie' };
    }

    if (this.serviceId) {
      this.service = this.servicesService.find(this.propertyService.currentProperty, this.serviceId);
      this.serviceReservation = this.propertyService.currentProperty.reservations.filter(r => {
        return r.id === this.servicesService.find(this.propertyService.currentProperty, this.serviceId).reservationId;
      })[0];

      this.servicesService.getCategories().map(category => {
        if (this.service.type.subCategory.slug === category.slug) {
          this.category = category;
          this.subCategories = category.services.map(service => {
            if (service.slug === this.service.type.slug) {
              this.currentSubCategory = { label: service.title, value: service.title, slug: service.slug };
            }
            return { label: service.title, value: service.title, slug: service.slug };
          });
          this.currentCategory = { label: category.title, value: category.title, slug: category };
        }
      });
    }

    this.contactsService.getLodgers().subscribe(lodger => {
      this.lodgers.push(lodger);
    });

    this.properties = this.propertyService.properties.map(property => {
      return { label: property.title, value: property.title, data: property };
    });

    this.reservations = this.propertyService.currentProperty.reservations.map(reservation => {
      return { label: reservation.id + ' ' + reservation.title, value: reservation.id + ' ' + reservation.title, reservation: reservation };
    });

    this.reservationDefault = this.serviceReservation ? { label: this.serviceReservation.id + ' ' + this.serviceReservation.title, value: this.serviceReservation.id + ' ' + this.serviceReservation.title } : { label: 'Associer à une réservation', value: 'Associer à une réservation' };

    this.form = new FormGroup({
      title: new FormControl(this.service.title ? this.service.title : null, Validators.required),
      description: new FormControl(this.service.description),
      startDate: new FormControl({
        year: this.service.startDate.getFullYear(),
        month: dateFns.getMonth(this.service.startDate) + 1,
        day: this.service.startDate.getDate()
      }, Validators.required),
      endDate: new FormControl({
        year: this.service.endDate.getFullYear(),
        month: dateFns.getMonth(this.service.endDate) + 1,
        day: this.service.endDate.getDate()
      }, Validators.required),
      subscriptionDate: new FormControl({
        year: this.service.subscriptionDate.getFullYear(),
        month: dateFns.getMonth(this.service.subscriptionDate) + 1,
        day: this.service.subscriptionDate.getDate()
      }),
      priority: new FormControl(this.service.priority),
      deadline: new FormControl(this.service.deadline),
      status: new FormControl(this.service.status, Validators.required),
      provider: new FormControl(this.service.provider ? this.service.provider : null, Validators.required),
      tariff: new FormGroup({
        amount: new FormControl(this.service.tariff.amount, Validators.required),
        tva: new FormControl(this.service.tariff.tva),
        deadline: new FormControl(this.service.tariff.deadline)
      }),
      numeroContrat: new FormControl(this.service.numeroContrat),
      property: new FormControl(this.propertyService.currentProperty),
      reservationId: new FormControl(null),
      payements: new FormControl([]),
      paymentStatus: new FormControl('à payer'),
      type: new FormControl(this.service.type.title ? this.service.type : this.servicesService.currentService)
    });
  }

  setStatus(status) {
    this.form.patchValue({ status: status.element.value });
  }

  setFrequency(deadline) {
    this.tariff.patchValue({ deadline: deadline.value });
  }

  setTva(tva) {
    this.tariff.patchValue({ tva: tva.element.value });
  }

  setReservation(reservation) {
    this.form.patchValue({ reservationId: reservation.element.reservation.id });
  }

  setDeadline(deadline) {
    this.form.patchValue({ deadline: deadline.element.value });
    this.currentDeadline = { label: deadline.element.value, value: deadline.element.value };
  }

  setCategory(category) {
    this.currentCategory = category.element;
    this.currentSubCategory = { label: 'Sous catégorie', value: 'Sous catégorie', slug: 'Sous catégorie' };
    this.subCategories = category.element.slug.services.map(category => {
      return { label: category.title, value: category.title, slug: category };
    });
  }

  setSubCategory(type) {
    this.type = type.element.slug;
    this.form.patchValue({
      type: type.element.slug
    });
  }

  setProperty(property) {
    this.form.patchValue({ property: property.element.data });
    this.reservations = property.element.data.reservations.map(reservation => {
      return { label: reservation.id + ' ' + reservation.title, value: reservation.id + ' ' + reservation.title, reservation: reservation };
    });
  }

  get title(): any { return this.form.get('title'); }

  get description(): any { return this.form.get('description'); }

  get priority(): any { return this.form.get('priority'); }

  get deadline(): any { return this.form.get('deadline'); }

  get startDate(): any { return this.form.get('startDate'); }

  get endDate(): any { return this.form.get('endDate'); }

  get subscriptionDate(): any { return this.form.get('subscriptionDate'); }

  get status(): any { return this.form.get('status'); }

  get provider(): any { return this.form.get('provider'); }

  get tariff(): any { return this.form.get('tariff'); }

  get amount(): any { return this.form.get('tariff').get('amount'); }

  get tva(): any { return this.form.get('tariff').get('tva'); }

  formatter = (x: any) => x.firstname + ' ' + x.lastname;

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.focus$)
      .merge(this.click$.filter(() =>
        !this.instance.isPopupOpen())
      )
      .map(term => (term === '' ?
        this.lodgers :
        this.lodgers.filter(v => v.firstname.toLowerCase().indexOf(term.toLowerCase()) > -1)
      ).slice(0, 10));


  assignContact(value) {
    this.service.provider = value.item;
  }

  newContact() {
    const m = this.modalService.open(DialogNewContactComponent, { size: 'lg', container: 'nb-layout' });
    m.result.then((result) => {
      this.form.patchValue({ provider: result });
      this.service.provider = result;
      this.lodgers.push(result);
    }, (reasen) => {
      // console.log(reasen);
    });
    m.componentInstance.type = { label: 'Prestataire de service', value: 'prestataire de service' };
  }

  save() {
    this.form.patchValue({ startDate: dateFns.parse(this.startDate.value.year + '-' + this.startDate.value.month + '-' + this.startDate.value.day) });
    this.form.patchValue({ endDate: dateFns.parse(this.endDate.value.year + '-' + this.endDate.value.month + '-' + this.endDate.value.day) });
    this.form.patchValue({ subscriptionDate: dateFns.parse(this.subscriptionDate.value.year + '-' + this.subscriptionDate.value.month + '-' + this.subscriptionDate.value.day) });
    if (this.route.snapshot.routeConfig.path.indexOf('edit') === -1) {
      this.servicesService.add(this.form.value, this.form.value.property);
    } else {
      this.form.value.id = this.service.id;
      this.servicesService.update(this.form.value, this.form.value.property);
    }
    this.router.navigateByUrl('/pages/categories/services');
  }

  back() {
    this.router.navigateByUrl('/pages/categories/services');
  }

}
