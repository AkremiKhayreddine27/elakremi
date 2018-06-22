import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { AccountRoutingModule, routedComponents } from './account-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    AccountRoutingModule
  ],
  declarations: [
    ...routedComponents
  ]
}) 
export class AccountModule { }
