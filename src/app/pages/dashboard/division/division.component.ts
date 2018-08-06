import { Component, OnInit, ViewChild, AfterViewInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { delay } from 'rxjs/operators';
import { NgxEchartsDirective } from 'ngx-echarts';
import { ReservationsService } from '../../../@core/data/reservations.service';
import { PropertyService } from '../../../@core/data/property.service';
import * as faker from 'faker';

@Component({
  selector: 'division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.scss']
})
export class DivisionComponent implements OnInit, AfterViewInit {

  @ViewChild(NgxEchartsDirective) charts: NgxEchartsDirective;

  chartsData;

  option: any = {};

  themeSubscription: any;

  constructor(private theme: NbThemeService, private propertyService: PropertyService, private reservationService: ReservationsService) { }

  tabChanged(event) {
    this.themeSubscription = this.theme.getJsTheme().pipe(delay(1)).subscribe(config => {
      let colors = [
        config.variables.warning,
        config.variables.success,
        config.variables.danger,
        config.variables.info,
        config.variables.primary,
      ];
      let data = event.tabTitle === 'Nuitées' ? event.tabTitle : '$';
      switch (event.tabTitle) {
        case 'Nuitées':
          this.chartsData = this.reservationService.getTotalNbrNightsByPlatforms(this.propertyService.currentProperty.id).map(platform => {
            return {
              value: platform.nbrNights,
              name: platform.value,
              itemStyle: {
                normal: {
                  color: colors[platform.id],
                },
              },
            };
          });
          break;
        case 'Revenues':
          this.chartsData = this.reservationService.getRevenuesByPlatforms(this.propertyService.currentProperty.id).map(platform => {
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
          break;
      }
      this.option = {
        tooltip: {
          trigger: 'item',
          formatter: "{d}% <br/> {c} " + data,
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
            data: this.chartsData
          }
        ]
      };
    });

  }
  ngOnInit() {
    this.themeSubscription = this.theme.getJsTheme().pipe(delay(1)).subscribe(config => {
      let colors = [
        config.variables.warning,
        config.variables.success,
        config.variables.danger,
        config.variables.info,
        config.variables.primary,
      ];
      this.chartsData = this.reservationService.getTotalNbrNightsByPlatforms(this.propertyService.currentProperty.id).map(platform => {
        return {
          value: platform.nbrNights,
          name: platform.value,
          itemStyle: {
            normal: {
              color: colors[platform.id],
            },
          },
        };
      });
    });
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().pipe(delay(1)).subscribe(config => {
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
            data: this.chartsData
          }
        ]
      };
    });
  }

}
