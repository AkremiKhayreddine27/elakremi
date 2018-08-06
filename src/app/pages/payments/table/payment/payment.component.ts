import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentFormComponent } from '../../payment-form/payment-form.component';
import { SendNotificationComponent } from '../../../../@theme/components';
import { DeleteConfirmationComponent } from '../../../../@theme/components/delete-confirmation/delete-confirmation.component';
import * as dateFns from 'date-fns';
import { PaymentService } from '../../../../@core/data/payment.service';

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  @Input() payment;

  @Input() toPay;

  constructor(private modalService: NgbModal, private paymentService: PaymentService) { }

  ngOnInit() {

  }

  edit(payment) {
    const modalRef = this.modalService.open(PaymentFormComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.payment = payment;
    modalRef.componentInstance.toPay = this.toPay;
  }

  sendNotification(payment) {
    const modalRef = this.modalService.open(SendNotificationComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.title = 'Envoyer un rappel';
    modalRef.componentInstance.mail = {
      recipients: [payment.payer],
      object: 'Relance de paiement ' + payment.id,
      content: 'Sauf erreur de notre part, nous sommes toujours en attente de paiement de la facture n° ' + payment.id + ', datée du ' + dateFns.format(payment.deadlineDate, 'dd MMM YYYY') + ', et d’un montant de ' + payment.amount + '$.',
      files: []
    };
  }

  delete(payment) {
    const modalRef = this.modalService.open(DeleteConfirmationComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.type = 'paiement';
    modalRef.componentInstance.title = payment.id;
    modalRef.result.then(confirmed => {
      if (confirmed) {
        this.paymentService.delete(payment);
      }
    }, (reason) => {

    });
  }

}
