import { Component, OnInit, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as dateFns from 'date-fns';
const HOURS_IN_DAY = 48;
@Component({
  selector: 'dialog-new-payment',
  templateUrl: './dialog-new-payment.component.html',
  styleUrls: ['./dialog-new-payment.component.scss']
})
export class DialogNewPaymentComponent implements OnInit {

  @Input() reservation;

  @Input() payment;

  mode: string = 'Dépense';

  public hours: any[] = [];

  private paymentDateHour = { label: 'Heure', value: 'Heure' };
  private deadlineDateHour = { label: 'Heure', value: 'Heure' };

  private types: any[] = [
    {
      label: 'Frais de service',
      value: 'Frais de service',
      isIncome: false,
      isOutgo: true
    },
    {
      label: 'Acompte',
      value: 'Acompte',
      isIncome: true,
      isOutgo: false
    },
    {
      label: 'Caution',
      value: 'Caution',
      isIncome: true,
      isOutgo: false
    },
    {
      label: 'Frais séjour',
      value: 'Frais séjour',
      isIncome: false,
      isOutgo: true
    },
    {
      label: 'Taxe séjour',
      value: 'Taxe séjour',
      isIncome: true,
      isOutgo: false
    },
    {
      label: 'Séjour',
      value: 'Séjour',
      isIncome: true,
      isOutgo: false
    },
    {
      label: 'Frais de retard',
      value: 'Frais de retard',
      isIncome: false,
      isOutgo: true
    },
    {
      label: 'Remise',
      value: 'Remise',
      isIncome: false,
      isOutgo: true
    },
    {
      label: 'Remboursement',
      value: 'Remboursement',
      isIncome: true,
      isOutgo: false
    },
    {
      label: 'Régulation de charge',
      value: 'Régulation de charge',
      isIncome: true,
      isOutgo: false
    },
    {
      label: 'Autre revenu',
      value: 'Autre revenu',
      isIncome: true,
      isOutgo: false
    },
    {
      label: 'Service',
      value: 'Service',
      isIncome: false,
      isOutgo: true
    },
    {
      label: 'Autre dépense',
      value: 'Autre dépense',
      isIncome: false,
      isOutgo: true
    }
  ];

  private type = { label: 'Choisir un Type', value: 'Choisir un Type' };

  private statuses = [
    {
      label: 'payé',
      value: 'payé'
    },
    {
      label: 'à payer',
      value: 'à payer'
    },
    {
      label: 'partiel',
      value: 'partiel'
    },
    {
      label: 'en retard',
      value: 'en retard'
    }
  ];

  private status = { label: 'Choisir une statut', value: 'Choisir une statut' };

  private methods = [
    {
      label: 'Carte de crédit',
      value: 'Carte de crédit'
    },
    {
      label: 'Espèces',
      value: 'Espèces'
    },
    {
      label: 'Chèque',
      value: 'Chèque'
    },
    {
      label: 'Prélèvement',
      value: 'Prélèvement'
    },
    {
      label: 'Virement',
      value: 'Virement'
    }
  ];

  private tvas = [
    {
      label: '3%',
      value: '3%'
    },
    {
      label: '4%',
      value: '4%'
    },
    {
      label: '5%',
      value: '5%'
    },
    {
      label: '6%',
      value: '6%'
    }
  ];

  private tva = this.tvas[0];

  private method = { label: 'Choisir le mode de paiement', value: 'Choisir le mode de paiement' };

  private payers = [];

  private payer = {
    label: 'Choisir le payeur',
    value: 'Choisir le payeur'
  };

  private newPayment;

  private filtredTypes;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.filtredTypes = this.types.filter(type => {
      return type.isOutgo;
    });
    if (!this.payment) {
      this.newPayment = {
        amount: 0,
        date: {
          year: new Date().getFullYear(),
          month: dateFns.getMonth(new Date()) + 1,
          day: new Date().getDate()
        }
      };
    } else {
      this.newPayment = { ...this.payment };
      this.paymentDateHour =
        {
          label: dateFns.format(dateFns.setMinutes(this.newPayment.paymentDate, 0), 'HH:mm'),
          value: dateFns.format(dateFns.setMinutes(this.newPayment.paymentDate, 0), 'HH:mm')
        };
      this.deadlineDateHour =
        {
          label: dateFns.format(dateFns.setMinutes(this.newPayment.deadlineDate, 0), 'HH:mm'),
          value: dateFns.format(dateFns.setMinutes(this.newPayment.deadlineDate, 0), 'HH:mm')
        };
      this.newPayment.paymentDate = {
        year: this.newPayment.paymentDate.getFullYear(),
        month: dateFns.getMonth(this.newPayment.paymentDate) + 1,
        day: this.newPayment.paymentDate.getDate()
      };
      this.newPayment.deadlineDate = {
        year: this.newPayment.deadlineDate.getFullYear(),
        month: dateFns.getMonth(this.newPayment.deadlineDate) + 1,
        day: this.newPayment.deadlineDate.getDate()
      };
      this.type = {
        label: this.payment.type.label,
        value: this.payment.type.label
      };
      this.method = {
        label: this.payment.method,
        value: this.payment.method
      };
      this.status = {
        label: this.payment.status,
        value: this.payment.status
      };
      if (this.reservation.lodger.firstname === this.payment.payer.firstname && this.reservation.lodger.lastname === this.payment.payer.lastname) {
        this.payer = {
          label: this.reservation.lodger.firstname + ' ' + this.reservation.lodger.lastname + ' ( Locataire )',
          value: this.reservation.lodger.firstname + ' ' + this.reservation.lodger.lastname + ' ( Locataire )'
        };
      } else {
        this.payer = {
          label: this.reservation.property.owner.firstname + ' ' + this.reservation.property.owner.lastname + ' ( Propriétaire )',
          value: this.reservation.property.owner.firstname + ' ' + this.reservation.property.owner.lastname + ' ( Propriétaire )',
        };
      }

    }
    let startHour = dateFns.startOfDay(new Date());
    for (let i = 0; i < HOURS_IN_DAY; i++) {
      this.hours.push({ label: dateFns.format(startHour, 'HH:mm'), value: dateFns.format(startHour, 'HH:mm') });
      startHour = dateFns.addMinutes(startHour, 30);
    }
    this.payers.push({
      label: this.reservation.lodger.firstname + ' ' + this.reservation.lodger.lastname + ' ( Locataire )',
      value: this.reservation.lodger.firstname + ' ' + this.reservation.lodger.lastname + ' ( Locataire )'
    });
    this.payers.push({
      label: this.reservation.property.owner.firstname + ' ' + this.reservation.property.owner.lastname + ' ( Propriétaire )',
      value: this.reservation.property.owner.firstname + ' ' + this.reservation.property.owner.lastname + ' ( Propriétaire )',
    });
  }

  currentMode() {
    return this.mode === 'Dépense';
  }

  toggleMode(checked) {
    if (checked) {
      this.mode = 'Revenu';
      this.filtredTypes = this.types.filter(type => {
        return type.isIncome;
      });
    } else {
      this.mode = 'Dépense';
      this.filtredTypes = this.types.filter(type => {
        return type.isOutgo;
      });
    }
  }

  close() {
    this.activeModal.dismiss();
  }



}
