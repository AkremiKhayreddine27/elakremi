import { AfterViewInit, Component, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FinancesService } from '../../../../@core/data/finances.service';
import { PropertyService } from '../../../../@core/data/property.service';
import { NbThemeService } from '@nebular/theme';
import { delay } from 'rxjs/operators';
import { NgxEchartsDirective } from 'ngx-echarts';
declare const echarts: any;

@Component({
  selector: 'income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild(NgxEchartsDirective) charts: NgxEchartsDirective;

  option: any = {};
  themeSubscription: any;

  public finances;

  constructor(
    public financesService: FinancesService,
    public propertyService: PropertyService,
    private theme: NbThemeService
  ) { }

  ngOnInit() {
    this.finances = this.financesService.getPropertyFinances(this.propertyService.currentProperty);
    this.financesService.refresh.subscribe(finances => {
      this.finances = finances;
      this.themeSubscription = this.theme.getJsTheme().pipe(delay(1)).subscribe(config => {
        const solarTheme: any = config.variables.solar;
        this.charts.setOption({
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
                  value: [this.finances.revenue, this.finances.potentialRevenue],
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
                  value: this.finances.pendingRevenue,
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
                  value: this.finances.inDelayRevenue,
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
        });
      });

    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  ngAfterViewInit() {
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
                value: [this.finances.revenue, this.finances.potentialRevenue],
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
                value: this.finances.pendingRevenue,
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
                value: this.finances.inDelayRevenue,
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
  }
}

