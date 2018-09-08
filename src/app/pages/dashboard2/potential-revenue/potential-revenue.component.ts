import { Component } from '@angular/core';

@Component({
  selector: 'potential-revenue',
  templateUrl: './potential-revenue.component.html',
  styleUrls: ['./potential-revenue.component.scss']
})
export class PotentialRevenueComponent {

  flipped = false;

  toggleView() {
    this.flipped = !this.flipped;
  }

}
