import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from '../../@theme/theme.module';
import { NgxEchartsModule } from 'ngx-echarts';

import { IndexComponent } from './index/index.component';
import { PotentialGoalComponent } from './potential-goal/potential-goal.component';
import { FrontComponent } from './potential-goal/front/front.component';
import { BackComponent } from './potential-goal/back/back.component';
import { PotentialRevenueComponent } from './potential-revenue/potential-revenue.component';
import { FrontSideComponent } from './potential-revenue/front-side/front-side.component';
import { BackSideComponent } from './potential-revenue/back-side/back-side.component';
import { DistributionByPlatormByNightComponent } from './distribution-by-platorm-by-night/distribution-by-platorm-by-night.component';
import { DistributionByPlatormByRevenueComponent } from './distribution-by-platorm-by-revenue/distribution-by-platorm-by-revenue.component';
import { RevenuesExpensesStatsComponent } from './revenues-expenses-stats/revenues-expenses-stats.component';
import { ChartPanelSummaryComponent } from './revenues-expenses-stats/chart-panel-summary/chart-panel-summary.component';
import { ChartPanelHeaderComponent } from './revenues-expenses-stats/chart-panel-header/chart-panel-header.component';
import { RevenuesChartComponent } from './revenues-expenses-stats/revenues-chart/revenues-chart.component';
import { ChartLegendComponent } from './revenues-expenses-stats/chart-panel-header/chart-legend/chart-legend.component';
 
@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    NgxEchartsModule
  ],
  declarations: [IndexComponent, PotentialGoalComponent, FrontComponent, BackComponent, PotentialRevenueComponent, FrontSideComponent, BackSideComponent, DistributionByPlatormByNightComponent, DistributionByPlatormByRevenueComponent, RevenuesExpensesStatsComponent, ChartPanelSummaryComponent, ChartPanelHeaderComponent, RevenuesChartComponent, ChartLegendComponent],
  exports: [IndexComponent]
})
export class Dashboard2Module { }
