import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { CalendarRoutingModule, routedComponents } from './calendar-routing.module';
import { CalendarModule } from 'ngx-calendar';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { BtnNewEventComponent } from './btn-new-event/btn-new-event.component';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { MyCalendarsComponent } from './my-calendars/my-calendars.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
    CalendarRoutingModule,
    NgbDatepickerModule,
    CalendarModule.forRoot()
  ],
  declarations: [
    ...routedComponents,
    BtnNewEventComponent,
    CalendarHeaderComponent,
    MyCalendarsComponent
  ]
})
export class AppCalendarModule { }
