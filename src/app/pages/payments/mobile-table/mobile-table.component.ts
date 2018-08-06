import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentFormComponent } from '../payment-form/payment-form.component';

@Component({
  selector: 'mobile-payments-table',
  templateUrl: './mobile-table.component.html',
  styleUrls: ['./mobile-table.component.scss']
})
export class MobileTableComponent implements OnInit {

  @Input() payments;

  @Input() toPay;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }


  openNewPayment() {
    const modalRef = this.modalService.open(PaymentFormComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.toPay = this.toPay;
  }

}
