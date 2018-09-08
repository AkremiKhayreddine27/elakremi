import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { delay } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../../../store';

@Component({
  selector: 'income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  option: any = {};
  themeSubscription: any;

  finances;
  constructor(
    private theme: NbThemeService,
    private store: Store<fromStore.LocatusState>
  ) { }

  ngOnInit() {
    this.store.select<any>(fromStore.getFinances).subscribe(finances => {
      this.finances = finances;
      this.themeSubscription = this.theme.getJsTheme().pipe(delay(1)).subscribe(config => {
        const solarTheme: any = config.variables.solar;
        this.option = {
          tooltip: {
            trigger: 'item',
            formatter: "{d}% {b} <br/> {c} $",
            position: ['0', '50%']
          },
          series: [
            {
              name: 'Revenue',
              clockWise: true,
              hoverAnimation: false,
              type: 'pie',
              center: ['45%', '50%'],
              radius: solarTheme.radius,
              dimensions: ['value', 'potentialRevenue'],
              data: [
                {
                  value: [finances.revenue, finances.potentialRevenue],
                  name: 'encaissé',
                  label: {
                    normal: {
                      position: 'center',
                      formatter: '{@potentialRevenue} $ \n Total',
                      textStyle: {
                        fontSize: '18',
                        fontFamily: 'Exo',
                        fontWeight: '500',
                        color: config.variables.fgHeading,
                      },
                    },
                  },
                  itemStyle: {
                    normal: {
                      color: config.variables.success,
                    },
                  },
                },
                {
                  value: finances.pendingRevenue,
                  name: 'en attente',
                  label: {
                    normal: {
                      position: 'inner',
                      show: false,
                    },
                  },
                  itemStyle: {
                    normal: {
                      color: '#dee2e8',
                    },
                  },
                },
                {
                  value: finances.inDelayRevenue,
                  name: 'en retards',
                  label: {
                    normal: {
                      position: 'inner',
                      show: false,
                    },
                  },
                  itemStyle: {
                    normal: {
                      color: config.variables.danger,
                    },
                  },
                }
              ]
            }
          ]
        };
      });

    });
  }
}

