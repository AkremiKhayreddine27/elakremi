import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../../store';

@Component({
  selector: 'revenues-expenses-stats',
  templateUrl: './revenues-expenses-stats.component.html',
  styleUrls: ['./revenues-expenses-stats.component.scss']
})
export class RevenuesExpensesStatsComponent implements OnInit {

  revenueSummary = [];

  expenseSummary = [];

  period: string = 'Mois';

  year = new Date();

  chartData: Observable<any[]>;

  constructor(private store: Store<fromStore.LocatusState>) { }

  ngOnInit() {
    this.store.select<any>(fromStore.getFinances).subscribe(finances => {
      this.expenseSummary = [
        {
          title: 'Réglé',
          value: finances.expenses,
        },
        {
          title: 'En attente',
          value: finances.pendingExpenses,
        },
        {
          title: 'En retard',
          value: finances.inDelayExpenses,
        },
        {
          title: 'Total',
          value: finances.potentialExpenses,
        },
      ];
      this.revenueSummary = [
        {
          title: 'Réglé',
          value: finances.revenue,
        },
        {
          title: 'En attente',
          value: finances.pendingRevenue,
        },
        {
          title: 'En retard',
          value: finances.inDelayRevenue,
        },
        {
          title: 'Total',
          value: finances.potentialRevenue,
        },
      ];
    });
    this.chartData = this.store.select(fromStore.getStatsByMonth());
  }

  setPeriodAndGetChartData(period) {
    switch (period) {
      case 'Mois':
        this.chartData = this.store.select(fromStore.getStatsByMonth());
        break;
      case 'Année':
        this.chartData = this.store.select(fromStore.getStatsByYear());
        console.log(period);
        break;
    }
  }

}
