import { Component, OnInit } from '@angular/core';
import { FinancesService } from '../../../../@core/data/finances.service';
import { PropertyService } from '../../../../@core/data/property.service';

@Component({
  selector: 'outgo',
  templateUrl: './outgo.component.html',
  styleUrls: ['./outgo.component.scss']
})
export class OutgoComponent implements OnInit {

  private finances;

  constructor(
    private financesService: FinancesService,
    private propertyService: PropertyService
  ) { }

  ngOnInit() {
    this.finances = this.financesService.getPropertyFinances(this.propertyService.currentProperty);
    this.propertyService.refreshCurrentProperty.subscribe(property => {
      if (property !== null) {
        this.finances = this.financesService.getPropertyFinances(property);
      }
    });
  }

}
