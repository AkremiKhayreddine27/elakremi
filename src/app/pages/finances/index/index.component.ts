import { Component, OnInit, OnDestroy } from '@angular/core';
import { FinancesService } from '../../../@core/data/finances.service';
import { PropertyService } from '../../../@core/data/property.service';
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  source: LocalDataSource = new LocalDataSource();

  public finances;
  public payments = [];
  public total: number;
  public paging;

  constructor(
    public financesService: FinancesService,
    public propertyService: PropertyService
  ) { }

  ngOnInit() {
    this.finances = this.financesService.getPropertyFinances(this.propertyService.currentProperty);
    const propertyPayments = this.financesService.getPropertyPayments(this.propertyService.currentProperty);
    this.source.load(propertyPayments);
    this.source.setPaging(1, 10);
    this.source.setPage(1);
    this.source.onChanged().subscribe(value => {
      console.log(value);
      if (value.action === 'load') {
        this.total = value.elements.length;
      }
      this.paging = value.paging;
      this.payments = [];
      value.elements.map((reservation) => {
        this.payments.push(reservation);
      });
    });
    this.propertyService.refreshCurrentProperty.subscribe(property => {
      if (property !== null) {
        this.finances = this.financesService.getPropertyFinances(property);
        const propertyPayments = this.financesService.getPropertyPayments(property);
        this.source.load(propertyPayments);
      } else {
        this.source.load([]);
      }
    });
  }

  ngOnDestroy() {
    this.source.reset();
  }

  setPage(page) {
    if (page > 0 && ((page - 1) * this.paging.perPage <= this.total)) {
      this.source.setPage(page);
    }
  }

}
