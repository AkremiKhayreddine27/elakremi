import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { TariffsService } from '@core/data';
import { delay, mergeMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../../../store';
 
import * as numeral from 'numeral';
import * as dateFns from 'date-fns';

@Component({
  selector: 'front-side',
  templateUrl: './front-side.component.html',
  styleUrls: ['./front-side.component.scss']
})
export class FrontSideComponent implements AfterViewInit {

  goal: number = 300;

  current: number;

  prorata;

  option: any = {};

  themeSubscription: any;

  constructor(
    private theme: NbThemeService,
    private tariffService: TariffsService,
    private store: Store<fromStore.LocatusState>,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    let daysOfyear = dateFns.differenceInDays(dateFns.endOfYear(new Date()), dateFns.startOfYear(new Date()));
    let daysUntilNow = dateFns.differenceInDays(new Date(), dateFns.startOfYear(new Date()));
    this.goal = 300 * this.tariffService.findActiveTariff().price;
    this.store.select<any>(fromStore.getFinances).pipe(
      mergeMap((finances) => {
        this.current = finances.revenue - finances.expenses;
        this.prorata = (this.goal / daysOfyear) * daysUntilNow;
        return this.theme.getJsTheme().pipe(delay(1))
      })
    ).subscribe(config => {
      const solarTheme: any = config.variables.solar;
      this.setChartOptions(solarTheme, config);
    });
    this.cdr.detectChanges();
  }

  setChartOptions(solarTheme, config) {
    this.option = {
      series: [
        {
          name: 'Revenue',
          radius: '90%',
          type: 'gauge',
          min: 0,
          max: this.goal,
          splitNumber: 4,
          center: ['50%', '50%'],
          detail: {
            offsetCenter: [0, '80%'],
            formatter: function (v) {
              return numeral(v).format('0.0a $')
            },
            fontSize: 17
          },
          title: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: [[(this.prorata / this.goal), config.variables.danger], [1, config.variables.success]],
              width: 10
            }
          },
          splitLine: {
            show: true,
            length: 10,
            lineStyle: {
              color: '#eee',
              width: 2,
              type: 'solid'
            }
          },
          axisLabel: {
            show: true,
            formatter: function (v) {
              return numeral(v).format('0.0a $')
            },
            fontSize: 10
          },
          data: [
            {
              value: [this.current],
              name: 'nuitées',
            }
          ]
        }
      ]
    };
  }

}
