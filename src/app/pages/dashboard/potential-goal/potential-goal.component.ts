import { Component, OnInit, ViewChild } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { delay } from 'rxjs/operators';
import { NgxEchartsDirective } from 'ngx-echarts';
import { ReservationsService, FinancesService, PropertyService, TariffsService } from '@core/data';

@Component({
  selector: 'potential-goal',
  templateUrl: './potential-goal.component.html',
  styleUrls: ['./potential-goal.component.scss']
})
export class PotentialGoalComponent implements OnInit {

  @ViewChild(NgxEchartsDirective) charts: NgxEchartsDirective;

  goal: number = 300;

  current: number;

  finances;

  option: any = {};

  themeSubscription: any;

  constructor(
    private theme: NbThemeService,
    private tariffService: TariffsService,
    private financesService: FinancesService,
    private propertyService: PropertyService,
    private reservationService: ReservationsService) { }

  ngOnInit() {
    this.current = this.reservationService.getTotalNbrNights(this.propertyService.currentProperty.id);
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().pipe(delay(1)).subscribe(config => {
      const solarTheme: any = config.variables.solar;
      this.setChartOptions(solarTheme, config, '{d}% <br/> {c} nuitées', 'nuitées', '{@value} \n Nuitées', this.current, this.goal - this.current)
    });
  }

  tabChanged(event) {
    let tooltip = '';
    let data1 = '';
    let label1;
    switch (event.tabTitle) {
      case 'Nuitées':
        tooltip = '{d}% <br/> {c} nuitées';
        data1 = 'nuitées';
        label1 = '{@value} \n Nuitées';
        this.goal = 300;
        this.current = this.reservationService.getTotalNbrNights(this.propertyService.currentProperty.id);
        break;
      case 'Revenues':
        tooltip = '{d}% <br/> {c} $';
        data1 = 'revenues';
        label1 = '{@value} $';
        this.goal = 300 * this.tariffService.findActiveTariff().price;
        this.finances = this.financesService.getPropertyFinances(this.propertyService.currentProperty);
        this.current = this.finances.revenue - this.finances.expenses;
        break;
    }
    this.themeSubscription = this.theme.getJsTheme().pipe(delay(1)).subscribe(config => {
      const solarTheme: any = config.variables.solar;
      this.setChartOptions(solarTheme, config, tooltip, data1, label1, this.current, this.goal - this.current)
    });
  }

  setChartOptions(solarTheme, config, tooltip, data1, label1, value1, value2) {
    this.option = {
      tooltip: {
        trigger: 'item',
        formatter: tooltip,
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
          dimensions: ['value'],
          data: [
            {
              value: [value1],
              name: data1,
              label: {
                normal: {
                  position: 'center',
                  formatter: label1,
                  textStyle: {
                    fontSize: '24',
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
              value: value2,
              name: 'Reste',
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
            }
          ]
        }
      ]
    };
  }

}
