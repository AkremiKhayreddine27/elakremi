import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { DocumentsRoutingModule, routedComponents } from './documents-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    DocumentsRoutingModule
  ],
  declarations: [
    ...routedComponents
  ]
})
export class DocumentsModule { }
