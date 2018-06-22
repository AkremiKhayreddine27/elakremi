import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { PropertyService } from '../../../../@core/data/property.service';
import * as dateFns from 'date-fns';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactsService } from '../../../../@core/data/contacts.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { DialogNewContactComponent } from '../../../contact/contact-form/contact-form.component';

@Component({
  selector: 'form-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  @Input() reservation;

  @Input() contact;

  @Output() validityChange = new EventEmitter<any>();

  @Output() propertyChange = new EventEmitter<any>();

  @ViewChild('form') form: FormGroup;
  public validStatus: boolean;

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  lodgers = [];

  public properties: any[] = [];

  public statuses: any[] = [
    { label: 'validée', value: 'validée' },
    { label: 'provisoire', value: 'provisoire' },
    { label: 'annulée', value: 'annulée' },
    { label: 'terminée', value: 'terminée' }
  ];

  public currentStatus = { label: 'Choisir un Statut', value: 'Choisir un Statut' };

  public currentProperty;

  constructor(
    public modalService: NgbModal,
    public contactsService: ContactsService,
    public formBuilder: FormBuilder,
    public propertyService: PropertyService) { }

  ngOnInit() {
    this.contact = this.reservation.lodger;
    this.currentStatus = this.reservation.status ? { label: this.reservation.status, value: this.reservation.status } : { label: 'Choisir un Statut', value: 'Choisir un Statut' };
    this.currentProperty = { label: this.propertyService.currentProperty.title, value: this.propertyService.currentProperty.title, data: this.propertyService.currentProperty };
    this.contactsService.getLodgers().subscribe(lodger => {
      this.lodgers.push(lodger);
    });
    this.properties = this.propertyService.properties.map(property => {
      return { label: property.title, value: property.title, data: property };
    });
    this.form = new FormGroup({
      title: new FormControl(this.reservation.title),
      description: new FormControl(this.reservation.description),
      startDate: new FormControl({
        year: this.reservation.startDate.getFullYear(),
        month: dateFns.getMonth(this.reservation.startDate) + 1,
        day: this.reservation.startDate.getDate()
      }, Validators.required),
      endDate: new FormControl({
        year: this.reservation.endDate.getFullYear(),
        month: dateFns.getMonth(this.reservation.endDate) + 1,
        day: this.reservation.endDate.getDate()
      }, Validators.required),
      reservationDate: new FormControl({
        year: this.reservation.reservationDate.getFullYear(),
        month: dateFns.getMonth(this.reservation.reservationDate) + 1,
        day: this.reservation.reservationDate.getDate()
      }),
      status: new FormControl(this.currentStatus.value, Validators.required),
      lodger: new FormControl(this.reservation.lodger.firstname ? this.reservation.lodger : null, Validators.required),
      property: new FormControl(null),
      nbrAdultes: new FormControl(this.reservation.nbrAdultes),
      nbrChildren: new FormControl(this.reservation.nbrChildren),
      nbrPets: new FormControl(this.reservation.nbrPets)
    });
    this.form.valueChanges
      .subscribe(() => {
        if (this.validStatus !== this.form.valid) {
          this.validStatus = this.form.valid;
          this.validityChange.emit({ form: this.form, contact: this.contact, property: this.currentProperty });
        }
      });
  }

  setProperty(property) {
    this.form.patchValue({ property: property.element.data });
    this.currentProperty = { label: property.element.value, value: property.element.value, data: property.element.data };
    this.propertyChange.emit({ property: property.element.data });
  }

  setStatus(status) {
    this.form.patchValue({ status: status.element.value });
    this.currentStatus = { label: status.element.value, value: status.element.value };
  }

  get description() { return this.form.get('description'); }

  get title() { return this.form.get('title'); }

  get startDate() { return this.form.get('startDate'); }

  get endDate() { return this.form.get('endDate'); }

  get reservationDate() { return this.form.get('reservationDate'); }

  get status() { return this.form.get('status'); }

  get adultes() { return this.form.get('nbrAdultes').value; }

  get children() { return this.form.get('nbrChildren').value; }

  get pets() { return this.form.get('nbrPets').value; }

  get lodger() { return this.form.get('lodger'); }

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
    this.reservation.lodger = value.item;
    this.contact = value.item;
  }

  adultesChanged(number) {
    this.form.patchValue({ nbrAdultes: number });
  }

  childrenChanged(number) {
    this.form.patchValue({ nbrChildren: number });
  }

  petsChanged(number) {
    this.form.patchValue({ nbrPets: number });
  }

  newContact() {
    const m = this.modalService.open(DialogNewContactComponent, { size: 'lg', container: 'nb-layout' });
    m.result.then((result) => {
      this.form.patchValue({ lodger: result });
      this.reservation.lodger = result;
      this.lodgers.push(result);
      this.contact = result;
    }, (reasen) => {
      // console.log(reasen);
    });
    m.componentInstance.type = { label: 'Locataire', value: 'locataire' };
  }

}
