import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { FinancesService } from '../../../../@core/data/finances.service';
import { PropertyService } from '../../../../@core/data/property.service';
@Component({
  selector: 'pie-charts',
  templateUrl: './pie-charts.component.html',
  styleUrls: ['./pie-charts.component.scss']
})
export class PieChartsComponent implements AfterViewInit, OnDestroy {

  options: any = {};
  themeSubscription: any;

  constructor(
    private theme: NbThemeService,
    private propertyService: PropertyService,
    private financesService: FinancesService) {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.infoLight, colors.dangerLight, colors.warningLight, colors.successLight, colors.primaryLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['payé', 'à payer'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Revenues',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [
              { value: this.financesService.getIncomePayedPayments(this.propertyService.currentProperty), name: 'payé' },
              { value: this.financesService.getIncomeNonPayedPayments(this.propertyService.currentProperty), name: 'à payer' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

}
