import { delay } from 'rxjs/operators';
import { AfterViewInit, Component, OnDestroy, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { FinancesService } from '../../../../@core/data';
import { PropertyService } from '../../../../@core/data';
import * as dateFns from 'date-fns';

declare const echarts: any;

@Component({
  selector: 'ngx-electricity-chart',
  styleUrls: ['./electricity-chart.component.scss'],
  template: `
    <div echarts [options]="option" class="echart"></div>
  `,
})
export class ElectricityChartComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() year = new Date();

  @Input() type;

  option: any;
  data: Array<any>;
  themeSubscription: any;

  constructor(
    private theme: NbThemeService,
    private financesService: FinancesService,
    private propertyService: PropertyService) {


  }

  ngOnInit() {
    this.data = this.financesService.getRevenuesByMonth(this.propertyService.currentProperty, dateFns.startOfYear(this.year), dateFns.endOfYear(this.year)).map(month => ({
      label: month.name,
      value: month.revenues,
    }));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.type === 'Revenues') {
      this.data = this.financesService.getRevenuesByMonth(this.propertyService.currentProperty, dateFns.startOfYear(this.year), dateFns.endOfYear(this.year)).map(month => ({
        label: month.name,
        value: month.revenues,
      }));
    } else if (this.type === 'Dépenses') {
      this.data = this.financesService.getExpensesByMonth(this.propertyService.currentProperty, dateFns.startOfYear(this.year), dateFns.endOfYear(this.year)).map(month => ({
        label: month.name,
        value: month.revenues,
      }));
    }
    this.themeSubscription = this.theme.getJsTheme().pipe(delay(1)).subscribe(config => {
      const eTheme: any = config.variables.electricity;

      this.option = {
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 80,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: eTheme.tooltipLineColor,
              width: eTheme.tooltipLineWidth,
            },
          },
          textStyle: {
            color: eTheme.tooltipTextColor,
            fontSize: 20,
            fontWeight: eTheme.tooltipFontWeight,
          },
          position: 'top',
          backgroundColor: eTheme.tooltipBg,
          borderColor: eTheme.tooltipBorderColor,
          borderWidth: 3,
          formatter: '{c0} $',
          extraCssText: eTheme.tooltipExtraCss,
        },
        xAxis: {
          type: 'category',
          offset: 25,
          data: this.data.map(i => i.label),
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: eTheme.xAxisTextColor,
            fontSize: 18,
          },
          axisLine: {
            lineStyle: {
              color: eTheme.axisLineColor,
              width: '2',
            },
          },
        },
        yAxis: {
          boundaryGap: [0, '5%'],
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: eTheme.yAxisSplitLine,
              width: '1',
            },
          },
        },
        series: [
          {
            type: 'line',
            smooth: true,
            symbolSize: 20,
            itemStyle: {
              normal: {
                opacity: 0,
              },
              emphasis: {
                color: '#ffffff',
                borderColor: eTheme.itemBorderColor,
                borderWidth: 2,
                opacity: 1,
              },
            },
            lineStyle: {
              normal: {
                width: eTheme.lineWidth,
                type: eTheme.lineStyle,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: eTheme.lineGradFrom,
                }, {
                  offset: 1,
                  color: eTheme.lineGradTo,
                }]),
                shadowColor: eTheme.lineShadow,
                shadowBlur: 6,
                shadowOffsetY: 12,
              },
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: eTheme.areaGradFrom,
                }, {
                  offset: 1,
                  color: eTheme.areaGradTo,
                }]),
              },
            },
            data: this.data.map(i => i.value),
          },

          {
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: {
              normal: {
                width: eTheme.lineWidth,
                type: eTheme.lineStyle,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: eTheme.lineGradFrom,
                }, {
                  offset: 1,
                  color: eTheme.lineGradTo,
                }]),
                shadowColor: eTheme.shadowLineDarkBg,
                shadowBlur: 14,
                opacity: 1,
              },
            },
            data: this.data.map(i => i.value),
          },
        ],
      };
    });
  }

  ngAfterViewInit(): void {
    this.themeSubscription = this.theme.getJsTheme().pipe(delay(1)).subscribe(config => {
      const eTheme: any = config.variables.electricity;

      this.option = {
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 80,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: eTheme.tooltipLineColor,
              width: eTheme.tooltipLineWidth,
            },
          },
          textStyle: {
            color: eTheme.tooltipTextColor,
            fontSize: 20,
            fontWeight: eTheme.tooltipFontWeight,
          },
          position: 'top',
          backgroundColor: eTheme.tooltipBg,
          borderColor: eTheme.tooltipBorderColor,
          borderWidth: 3,
          formatter: '{c0} $',
          extraCssText: eTheme.tooltipExtraCss,
        },
        xAxis: {
          type: 'category',
          offset: 25,
          data: this.data.map(i => i.label),
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: eTheme.xAxisTextColor,
            fontSize: 18,
          },
          axisLine: {
            lineStyle: {
              color: eTheme.axisLineColor,
              width: '2',
            },
          },
        },
        yAxis: {
          boundaryGap: [0, '5%'],
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: eTheme.yAxisSplitLine,
              width: '1',
            },
          },
        },
        series: [
          {
            type: 'line',
            smooth: true,
            symbolSize: 20,
            itemStyle: {
              normal: {
                opacity: 0,
              },
              emphasis: {
                color: '#ffffff',
                borderColor: eTheme.itemBorderColor,
                borderWidth: 2,
                opacity: 1,
              },
            },
            lineStyle: {
              normal: {
                width: eTheme.lineWidth,
                type: eTheme.lineStyle,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: eTheme.lineGradFrom,
                }, {
                  offset: 1,
                  color: eTheme.lineGradTo,
                }]),
                shadowColor: eTheme.lineShadow,
                shadowBlur: 6,
                shadowOffsetY: 12,
              },
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: eTheme.areaGradFrom,
                }, {
                  offset: 1,
                  color: eTheme.areaGradTo,
                }]),
              },
            },
            data: this.data.map(i => i.value),
          },

          {
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: {
              normal: {
                width: eTheme.lineWidth,
                type: eTheme.lineStyle,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: eTheme.lineGradFrom,
                }, {
                  offset: 1,
                  color: eTheme.lineGradTo,
                }]),
                shadowColor: eTheme.shadowLineDarkBg,
                shadowBlur: 14,
                opacity: 1,
              },
            },
            data: this.data.map(i => i.value),
          },
        ],
      };
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
