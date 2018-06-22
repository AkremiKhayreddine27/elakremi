import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { PaymentsModule } from '../payments/payments.module';
import { ReservationsRoutingModule, routedComponents } from './reservations-routing.module';
import { FiltersComponent } from './index/components/filters/filters.component';
import { GridComponent } from './index/components/grid/grid.component';
import { ReservationComponent as FormReservationComponent } from './show/reservation/reservation.component';

@NgModule({
  imports: [
    CommonModule,
    ReservationsRoutingModule,
    Ng2SmartTableModule,
    ThemeModule,
    PaymentsModule
  ],
  declarations: [
    ...routedComponents,
    FiltersComponent,
    GridComponent,
    FormReservationComponent
  ]
}) 
export class ReservationsModule { }
