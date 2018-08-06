import { Component, OnInit, ViewChild } from '@angular/core';
import { FinancesService } from '../../../../../@core/data/finances.service';
import { PropertyService } from '../../../../../@core/data/property.service';
import { NbThemeService } from '@nebular/theme';
import { delay } from 'rxjs/operators';
import { NgxEchartsDirective } from 'ngx-echarts';

@Component({
  selector: 'potentiel',
  templateUrl: './potentiel.component.html',
  styleUrls: ['./potentiel.component.scss']
})
export class PotentielComponent implements OnInit {

  @ViewChild(NgxEchartsDirective) potentialChart: NgxEchartsDirective;
  potentialOption: any = {};

  public finances;
  themeSubscription: any;

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
        this.potentialChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: "{d}% {b} <br/> {c} $",
            position: ['0', '50%']
          },
          series: [
            {
              name: 'A venir',
              clockWise: true,
              hoverAnimation: false,
              type: 'pie',
              center: ['45%', '50%'],
              radius: solarTheme.radius,
              dimensions: ['value', 'potential'],
              data: [
                {
                  value: [this.finances.potentialRevenue, this.finances.potentialRevenue - this.finances.potentialExpenses],
                  name: 'Revenue',
                  label: {
                    normal: {
                      position: 'center',
                      formatter: '{@potential} $ \n A venir',
                      textStyle: {
                        fontSize: '16',
                        fontFamily: 'Exo',
                        fontWeight: '500',
                        color: this.finances.potentialRevenue - this.finances.potentialExpenses > 0 ? config.variables.success : config.variables.danger,
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
                  value: this.finances.potentialExpenses,
                  name: 'Dépenses',
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
      this.potentialOption = {
        tooltip: {
          trigger: 'item',
          formatter: "{d}% {b} <br/> {c} $",
          position: ['0', '50%']
        },
        series: [
          {
            name: 'A venir',
            clockWise: true,
            hoverAnimation: false,
            type: 'pie',
            center: ['45%', '50%'],
            radius: solarTheme.radius,
            dimensions: ['value', 'potential'],
            data: [
              {
                value: [this.finances.potentialRevenue, this.finances.potentialRevenue - this.finances.potentialExpenses],
                name: 'Revenue',
                label: {
                  normal: {
                    position: 'center',
                    formatter: '{@potential} $ \n A venir',
                    textStyle: {
                      fontSize: '16',
                      fontFamily: 'Exo',
                      fontWeight: '500',
                      color: this.finances.potentialRevenue - this.finances.potentialExpenses > 0 ? config.variables.success : config.variables.danger,
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
                value: this.finances.potentialExpenses,
                name: 'Dépenses',
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
