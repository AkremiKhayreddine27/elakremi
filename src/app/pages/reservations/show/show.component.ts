import { Component, OnInit } from '@angular/core';
import * as dateFns from 'date-fns';
import { FormGroup, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { PropertyService } from '../../../@core/data/property.service';
import { ReservationsService } from '../../../@core/data/reservations.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as faker from 'faker';

@Component({
  selector: 'show-reservation',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class NewReservationComponent implements OnInit {

  contact;

  public reservation = {
    id: faker.random.number(100),
    title: null,
    status: null,
    description: null,
    amount: 0,
    nbrAdultes: 0,
    nbrChildren: 0,
    nbrPets: 0,
    lodger: {},
    startDate: new Date(),
    endDate: new Date(),
    reservationDate: new Date(),
    payments: [
      {
        description: '',
        amount: this.propertyService.currentProperty.tariff.caution,
        status: 'à payer',
        method: 'Cash',
        type: {
          label: 'Caution',
          value: 'Caution',
          isIncome: true,
          isOutgo: false
        },
        paymentDate: new Date(),
        deadlineDate: new Date(),
        payer: this.contact
      }
    ],
    paymentStatus: 'à payer',
    createdAt: new Date(),
    documents: []
  };

  public reservationForm: FormGroup;

  public reservationFormValid: boolean;

  public id;

  public property;

  public pageTitle;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public propertyService: PropertyService,
    public reservationsService: ReservationsService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.reservation;
    this.pageTitle = this.id ? 'Modifier la réservation ' + this.id : 'Ajouter une réservation';
    if (this.id) {
      this.reservation = this.reservationsService.getReservation(this.propertyService.currentProperty, this.id);
    }
  }

  formChanged(data) {
    this.reservationForm = data.form;
    this.reservationFormValid = data.form.valid;
    this.contact = data.contact;
    this.property = data.property.data;
  }

  propertyChange(property) {
    if (this.id) {
      this.reservationsService.remove(this.reservation, this.property);
      this.reservationsService.add(this.reservation, property);
      this.property = property;
    }
  }

  /**
   * to do not current property but selected property
   */
  save() {
    this.reservation.status = this.reservationForm.get('status').value;
    this.reservation.startDate = dateFns.parse(this.reservationForm.get('startDate').value.year + '-' + this.reservationForm.get('startDate').value.month + '-' + this.reservationForm.get('startDate').value.day);
    this.reservation.endDate = dateFns.parse(this.reservationForm.get('endDate').value.year + '-' + this.reservationForm.get('endDate').value.month + '-' + this.reservationForm.get('endDate').value.day);
    this.reservation.reservationDate = dateFns.parse(this.reservationForm.get('reservationDate').value.year + '-' + this.reservationForm.get('reservationDate').value.month + '-' + this.reservationForm.get('reservationDate').value.day);
    this.reservation.description = this.reservationForm.get('description').value;
    this.reservation.title = this.reservationForm.get('title').value;
    this.reservation.nbrAdultes = this.reservationForm.get('nbrAdultes').value;
    this.reservation.nbrChildren = this.reservationForm.get('nbrChildren').value;
    this.reservation.nbrPets = this.reservationForm.get('nbrPets').value;
    this.reservation.lodger = this.contact;
    const amount = dateFns.differenceInDays(this.reservation.endDate, this.reservation.startDate) * this.propertyService.currentProperty.tariff.seasons[0].seasons[0].amount;
    this.reservation.payments[0].payer = this.contact;
    if (!this.id) {
      this.reservation.payments.push({
        description: '',
        amount: amount,
        status: 'à payer',
        method: 'Cash',
        type: {
          label: 'Séjour',
          value: 'Séjour',
          isIncome: true,
          isOutgo: false
        },
        paymentDate: new Date(),
        deadlineDate: new Date(),
        payer: this.contact
      });
      this.reservation.payments.map(payment => {
        this.reservation.amount += payment.amount;
      });
      this.reservationsService.add(this.reservation, this.property);
    }
    this.propertyService.setCurrentProperty(this.property);
    this.router.navigateByUrl('/pages/reservations');
  }

}
