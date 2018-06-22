import { Component, OnInit } from '@angular/core';
import { FinancesService } from '../../../../@core/data/finances.service';
import { PropertyService } from '../../../../@core/data/property.service';

@Component({
  selector: 'income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

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
