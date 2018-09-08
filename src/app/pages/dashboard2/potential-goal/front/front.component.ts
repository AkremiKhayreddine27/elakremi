import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { delay, mergeMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../../../store';

import * as dateFns from 'date-fns';

@Component({
  selector: 'front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss']
})
export class FrontComponent implements AfterViewInit {

  goal: number = 300;

  current: number;

  prorata;

  finances;

  option: any = {};

  themeSubscription: any;

  constructor(
    private theme: NbThemeService,
    private store: Store<fromStore.LocatusState>,
    private cdr: ChangeDetectorRef
  ) { 
    
  }

  ngAfterViewInit() {
    let daysOfyear = dateFns.differenceInDays(dateFns.endOfYear(new Date()), dateFns.startOfYear(new Date()));
    let daysUntilNow = dateFns.differenceInDays(new Date(), dateFns.startOfYear(new Date()));
    this.goal = 300;
    this.store.select<any>(fromStore.getTotalNbrNights).pipe(
      mergeMap(nbrNights => {
        this.current = nbrNights;
        this.prorata = (this.goal / daysOfyear) * daysUntilNow;
        return this.theme.getJsTheme().pipe(delay(1));
      })
    ).subscribe(config => {
      const solarTheme: any = config.variables.solar;
      this.setChartOptions(solarTheme, config)
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
              return v
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
              return v
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
