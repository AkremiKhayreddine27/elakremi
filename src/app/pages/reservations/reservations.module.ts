import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { ToasterModule } from 'angular2-toaster';
import { PaymentsModule } from '../payments/payments.module';
import { ReservationsRoutingModule, routedComponents } from './reservations-routing.module';
import { GridComponent } from './index/components/grid/grid.component';

@NgModule({
  imports: [
    CommonModule,
    ReservationsRoutingModule,
    Ng2SmartTableModule,
    ThemeModule,
    PaymentsModule,
    ToasterModule.forRoot()
  ],
  declarations: [
    ...routedComponents,
    GridComponent
  ]
}) 
export class ReservationsModule { }
