import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { PaymentService } from '../../../@core/data/payment.service';
import { Payment, Reservation } from '../../../@core/data/models';
import { ReservationsService } from '../../../@core/data/reservations.service';
import { Subscription } from 'rxjs/Subscription';
import * as dateFns from 'date-fns';
import { ServicesService } from '../../../@core/data/services.service';

@Component({
  selector: 'payments-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() data: Payment[];

  @Input() nomenclature: string;

  @Input() withAdd: boolean = true;

  @Input() withBorders: boolean = true;

  @Input() isBgGrey: boolean = true;

  paymentsSubscription: Subscription;

  toPay: any;

  constructor(
    private modalService: NgbModal,
    private paymentService: PaymentService,
    private servicesService: ServicesService,
    private reservationsService: ReservationsService) { }

  ngOnInit() {
    this.detectPaymentsChanges();
  }

  detectPaymentsChanges() {
    this.paymentsSubscription = this.paymentService.onChanged().subscribe((payment: Payment) => {
      let service = payment.nomenclature.type === 'Réservation' ? this.reservationsService : this.servicesService;
      let nomenclature = service.find(payment.nomenclature.id);
      nomenclature.payments = this.paymentService.findByAndBy({ 'nomenclature.id': payment.nomenclature.id, 'nomenclature.type': payment.nomenclature.type });
      if (payment.nomenclature.type === 'Réservation') {
        nomenclature.balance.value = this.reservationsService.calculateBalance(nomenclature.payments);
        nomenclature.adjusted.value = this.reservationsService.calculateAdjusted(nomenclature.payments);
        nomenclature.nbrNight = dateFns.differenceInDays(nomenclature.end, nomenclature.start) + ' nuitées';
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      this.data = changes.data.currentValue;
    }
  }


  openNewPayment() {
    const modalRef = this.modalService.open(PaymentFormComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.nomenclatureType = this.nomenclature;
  }

}
