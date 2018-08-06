import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { FinancesRoutingModule, routedComponents } from './finances-routing.module';

import { NgxEchartsModule } from 'ngx-echarts';

import { IncomeComponent } from './components/income/income.component';
import { OutgoComponent } from './components/outgo/outgo.component';
import { ProfitsComponent } from './components/profits/profits.component';
import { NetComponent } from './components/profits/net/net.component';
import { PotentielComponent } from './components/profits/potentiel/potentiel.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    NgxEchartsModule,
    FinancesRoutingModule
  ],
  declarations: [...routedComponents, IncomeComponent, OutgoComponent, ProfitsComponent, NetComponent, PotentielComponent]
})
export class FinancesModule { }
