import { Component, OnInit } from '@angular/core';

import { NbThemeService } from '@nebular/theme';
import { delay, mergeMap } from 'rxjs/operators';
import { ReservationsService } from '../../../@core/data';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../../store';

@Component({
  selector: 'distribution-by-platorm-by-revenue',
  templateUrl: './distribution-by-platorm-by-revenue.component.html',
  styleUrls: ['./distribution-by-platorm-by-revenue.component.scss']
})
export class DistributionByPlatormByRevenueComponent implements OnInit {

  option: any = {};

  themeSubscription: any;

  platforms;

  constructor(
    private theme: NbThemeService,
    private store: Store<fromStore.LocatusState>,
    private reservationService: ReservationsService) { }


  ngOnInit() {
    this.store.select<any>(fromStore.getRevenuesByPlatforms(this.reservationService.platforms)).pipe(
      mergeMap(platforms => {
        this.platforms = platforms;
        return this.theme.getJsTheme().pipe(delay(1))
      })
    ).subscribe(config => {
      let colors = [
        config.variables.warning,
        config.variables.success,
        config.variables.danger,
        config.variables.info,
        config.variables.primary,
      ];
      const chartsData = this.platforms.map(platform => {
        return {
          value: platform.revenues,
          name: platform.value,
          itemStyle: {
            normal: {
              color: colors[platform.id],
            },
          },
        };
      });
      this.option = {
        tooltip: {
          trigger: 'item',
          formatter: "{d}% <br/> {c} nuitées",
          position: ['0', '50%']
        },
        series: [
          {
            name: 'Revenue',
            roseType: 'radius',
            type: 'pie',
            radius: '75%',
            center: ['50%', '50%'],
            label: {
              normal: {
                textStyle: {
                  color: config.variables.fgHeading
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: config.variables.fgHeading
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              normal: {
                color: '#c23531',
                shadowBlur: 20,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200;
            },
            dimensions: ['value'],
            data: chartsData
          }
        ]
      };
    });
  }

}
