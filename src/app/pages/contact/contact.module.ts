import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { ContactRoutingModule, routedComponents } from './contact-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    ContactRoutingModule
  ],
  declarations: [...routedComponents]
})
export class ContactModule { }
