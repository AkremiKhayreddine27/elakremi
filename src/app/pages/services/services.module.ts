import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { PaymentsModule } from '../payments/payments.module';
import { ServicesRoutingModule, routedComponents } from './services-routing.module';
import { CategoryComponent } from './index/components/category/category.component';
import { FiltersComponent } from './show/filters/filters.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    ServicesRoutingModule,
    PaymentsModule
  ],
  declarations: [
    ...routedComponents,
    CategoryComponent,
    FiltersComponent
  ]
})
export class ServicesModule { }
