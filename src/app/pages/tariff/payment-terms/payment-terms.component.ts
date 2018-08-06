import { Component, OnInit, OnDestroy } from '@angular/core';
import { TariffsService } from '../../../@core/data/tariffs.service';
import { PropertyService } from '../../../@core/data/property.service';

@Component({
  selector: 'payment-terms',
  templateUrl: './payment-terms.component.html',
  styleUrls: ['./payment-terms.component.scss']
})
export class PaymentTermsComponent implements OnInit, OnDestroy {

  isCollapsed = true;

  radioModel;

  tariff;

  deposit;

  constructor(public tariffsService: TariffsService, public propertyService: PropertyService) { }

  ngOnInit() {
    this.tariff = this.tariffsService.findFirstBy('property.id', this.propertyService.currentProperty.id);
    this.deposit = this.tariff.deposit;
    this.radioModel = this.deposit === 0 ? 'onePayment' : 'multiplePayments';
  }

  ngOnDestroy() {
    this.tariff.deposit = this.deposit;
  }

  typeChanged(event) {
    if (event === 'onePayment') {
      this.deposit = 0;
    } else {
      this.deposit = this.tariff.deposit;
    }
  }

}
