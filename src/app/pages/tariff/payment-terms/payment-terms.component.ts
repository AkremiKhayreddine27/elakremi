import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'payment-terms',
  templateUrl: './payment-terms.component.html',
  styleUrls: ['./payment-terms.component.scss']
})
export class PaymentTermsComponent implements OnInit {

  isCollapsed = true;

  constructor() { }

  ngOnInit() {
  }

}
