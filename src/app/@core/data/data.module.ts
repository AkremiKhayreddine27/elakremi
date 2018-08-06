import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './users.service';
import { ElectricityService } from './electricity.service';
import { StateService } from './state.service';
import { SmartTableService } from './smart-table.service';
import { PlayerService } from './player.service';
import { PropertyService } from './property.service';
import { ServicesService } from './services.service';
import { EquipementsService } from './equipements.service';
import { DocumentsService } from './documents.service';
import { ReservationsService } from './reservations.service';
import { ContactsService } from './contacts.service';
import { PaymentService } from './payment.service';
import { DateService } from './date.service';
import { CalendarService } from './calendar.service';
import { CalendarSettingsService } from './calendar-settings.service';
import { TariffsService } from './tariffs.service';
import { SeasonalTariffService } from './seasonal-tariff.service';
import { SeasonService } from './season.service';
import { EventService } from './event.service';
import { EventTariffService } from './event-tariff.service';
import { FinancesService } from './finances.service';
import { NotificationService } from './notification.service';
import { AppUserService } from './app-user.service';

const SERVICES = [
  UserService,
  ElectricityService,
  StateService,
  SmartTableService,
  PlayerService,
  PropertyService,
  ServicesService,
  EquipementsService,
  DocumentsService,
  ReservationsService,
  ContactsService,
  PaymentService,
  DateService,
  CalendarService,
  CalendarSettingsService,
  TariffsService,
  FinancesService,
  NotificationService,
  AppUserService,
  SeasonalTariffService,
  SeasonService,
  EventService,
  EventTariffService
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
