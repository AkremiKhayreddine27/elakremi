import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { PaymentService } from '../../../@core/data/payment.service';

@Component({
  selector: 'payments-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() payments;

  @Input() toPay;

  constructor(private modalService: NgbModal, private paymentService: PaymentService) { }

  ngOnInit() {
    this.paymentService.refresh.subscribe(payments => {
      this.payments = payments;
    })
  }


  openNewPayment() {
    const modalRef = this.modalService.open(PaymentFormComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.toPay = this.toPay;
  }

}
