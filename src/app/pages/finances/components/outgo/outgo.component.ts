import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FinancesService } from '../../../../@core/data/finances.service';
import { PropertyService } from '../../../../@core/data/property.service';
import { NbThemeService } from '@nebular/theme';
import { delay } from 'rxjs/operators';
declare const echarts: any;
import { NgxEchartsDirective } from 'ngx-echarts';


@Component({
  selector: 'outgo',
  templateUrl: './outgo.component.html',
  styleUrls: ['./outgo.component.scss']
})
export class OutgoComponent implements OnInit, AfterViewInit {

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
              name: 'Dépenses',
              clockWise: true,
              hoverAnimation: false,
              type: 'pie',
              center: ['45%', '50%'],
              radius: solarTheme.radius,
              dimensions: ['value', 'potentialExpenses'],
              data: [
                {
                  value: [this.finances.expenses, this.finances.potentialExpenses],
                  name: 'dépensé',
                  label: {
                    normal: {
                      position: 'center',
                      formatter: '{@potentialExpenses} $ \n Total',
                      textStyle: {
                        fontSize: '18',
                        fontFamily: 'Exo',
                        fontWeight: '400',
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
                  value: this.finances.pendingExpenses,
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
                  value: this.finances.inDelayExpenses,
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
            name: 'Dépenses',
            clockWise: true,
            hoverAnimation: false,
            type: 'pie',
            center: ['45%', '50%'],
            radius: solarTheme.radius,
            dimensions: ['value', 'potentialExpenses'],
            data: [
              {
                value: [this.finances.expenses, this.finances.potentialExpenses],
                name: 'dépensé',
                label: {
                  normal: {
                    position: 'center',
                    formatter: '{@potentialExpenses} $ \n Total',
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
                value: this.finances.pendingExpenses,
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
                value: this.finances.inDelayExpenses,
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

