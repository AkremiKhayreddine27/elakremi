import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../../store';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private store: Store<fromStore.LocatusState>) { }

  ngOnInit() {
    this.store.select<any>(fromStore.getSelectedProperty).subscribe(property => {
      const reservationsFiltersConf = {
        filters: [
          {
            field: 'property',
            search: property.id.toString(),
            filter: function (cell: any, search: any) {
              return cell.id.toString() === search;
            }
          }
        ],
        andOperator: false,
      };
      this.store.dispatch(new fromStore.LoadReservations(reservationsFiltersConf));
      const paymentsFiltersConf = {
        filters: [
          {
            field: 'propertyId',
            search: property.id.toString(),
            filter: function (cell: any, search: any) {
              return cell.toString() === search;
            }
          }
        ],
        andOperator: false,
      };
      this.store.dispatch(new fromStore.LoadPayments(paymentsFiltersConf));
    });
  }

}
