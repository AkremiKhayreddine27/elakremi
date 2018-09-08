import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { Payment } from '@core/data/models';

@Component({
  selector: 'payments-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() data: Payment[];

  @Input() nomenclature: any;

  @Input() withAdd: boolean = true;

  @Input() withBorders: boolean = true;

  @Input() isBgGrey: boolean = true;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {

  }


  openNewPayment() {
    const modalRef = this.modalService.open(PaymentFormComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.nomenclatureType = this.nomenclature;
  }

}
