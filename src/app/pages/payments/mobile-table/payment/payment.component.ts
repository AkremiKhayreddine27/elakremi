import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentFormComponent } from '../../payment-form/payment-form.component';
import { SendNotificationComponent } from '../../../../@theme/components';
import { DeleteConfirmationComponent } from '../../../../@theme/components/delete-confirmation/delete-confirmation.component';
import * as dateFns from 'date-fns';
import { PaymentService } from '../../../../@core/data/payment.service';
import { MobileDropdownComponent } from '../../../../@theme/components/mobile-dropdown/mobile-dropdown.component';

@Component({
  selector: 'mobile-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class MobilePaymentComponent implements OnInit {

  @Input() payment;

  @Input() toPay;

  options: any[];

  constructor(private modalService: NgbModal, private paymentService: PaymentService) { }


  ngOnInit() {
    this.options = [
      { type: 'option', title: 'Paiement ' + this.payment.id },
      { type: 'divider' },
      { type: 'option', title: 'Envoyer un rappel', icon: 'fa fa-clock-o mr-1', clickAction: 'sendNotification' },
      { type: 'option', title: "Envoyer l'avis d'échéance", icon: 'fa fa-gear mr-1', clickAction: 'sendNotification' },
      { type: 'option', title: 'Document', icon: 'fa fa-calendar mr-1', clickAction: 'sendNotification' },
      { type: 'divider' },
      { type: 'option', title: 'éditer', icon: 'fa fa-edit mr-1', clickAction: 'edit' },
      { type: 'option', title: 'supprimer', icon: 'fa fa-trash mr-1', clickAction: 'delete' }
    ];
  }

  showDropdown(payment) {
    const modalRef = this.modalService.open(MobileDropdownComponent, { windowClass: 'mobile-dropdown', size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.options = this.options;
    modalRef.componentInstance.data = payment;
    modalRef.result.then(result => {
      this.handleAction(result.action, payment);
    }, (reason) => {

    });
  }

  handleAction(action, payment) {
    this[action](payment);
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
      recipient: payment.payer,
      object: 'Relance de paiement ' + payment.id,
      content: 'Sauf erreur de notre part, nous sommes toujours en attente de paiement de la facture n° ' + payment.id + ', datée du ' + dateFns.format(payment.deadlineDate, 'dd MMM YYYY') + ', et d’un montant de ' + payment.amount + '$.'
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
