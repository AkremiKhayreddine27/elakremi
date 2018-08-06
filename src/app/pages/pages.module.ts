import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { CalendarModule } from 'ngx-calendar';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

import { DialogNewEventComponent } from './calendar/dialog-new-event/dialog-new-event.component';
import { DialogShowEventComponent } from './calendar/dialog-show-event/dialog-show-event.component';
import { DialogImportCalendarComponent } from './calendar/dialog-import-calendar/dialog-import-calendar.component';
import { DialogNewCalendarComponent } from './calendar/dialog-new-calendar/dialog-new-calendar.component';
import { DialogExportCalendarComponent } from './calendar/dialog-export-calendar/dialog-export-calendar.component';
import { DialogShowDayEventsComponent } from './calendar/dialog-show-day-events/dialog-show-day-events.component';
import { CalendarSettingsComponent } from './calendar/calendar-settings/calendar-settings.component';
import { DialogNewSeasonComponent } from './tariff/dialog-new-season/dialog-new-season.component';
import { DialogNewEventComponent as DialogNewTariffEventComponent } from './tariff/dialog-new-event/dialog-new-event.component';
import { DialogNewContactComponent } from './contact/contact-form/contact-form.component';
import { DialogCheckInComponent } from './reservations/dialog-check-in/dialog-check-in.component';
import { DialogNewDocumentComponent } from './documents/document-form/document-form.component';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    CalendarModule.forRoot()
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    DialogNewEventComponent,
    DialogShowEventComponent,
    DialogImportCalendarComponent,
    DialogNewCalendarComponent,
    DialogExportCalendarComponent,
    DialogShowDayEventsComponent,
    CalendarSettingsComponent,
    DialogNewSeasonComponent,
    DialogNewTariffEventComponent,
    DialogNewContactComponent,
    DialogCheckInComponent,
    DialogNewDocumentComponent
  ],
  entryComponents: [
    DialogNewEventComponent,
    DialogShowEventComponent,
    DialogImportCalendarComponent,
    DialogNewCalendarComponent,
    DialogExportCalendarComponent,
    DialogShowDayEventsComponent,
    CalendarSettingsComponent,
    DialogNewSeasonComponent,
    DialogNewTariffEventComponent,
    DialogNewContactComponent,
    DialogCheckInComponent,
    DialogNewDocumentComponent
  ]
})
export class PagesModule {
}
