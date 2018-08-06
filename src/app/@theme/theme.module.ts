import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';

import {
  NbActionsModule,
  NbCardModule,
  NbLayoutModule,
  NbMenuModule,
  NbRouteTabsetModule,
  NbSearchModule,
  NbSidebarModule,
  NbTabsetModule,
  NbThemeModule,
  NbUserModule,
  NbCheckboxModule,
  NbPopoverModule,
  NbContextMenuModule,
} from '@nebular/theme';

import { NbSecurityModule } from '@nebular/security';

import {
  TableComponent as PaymentTableComponent,
  MobileTableComponent as PaymentMobileTableComponent,
  MobileHeaderComponent,
  HeaderComponent as PaymentHeaderComponent,
  PaymentComponent,
  MobilePaymentComponent
} from '../pages/payments';

import { PaymentFormComponent } from '../pages/payments/payment-form/payment-form.component';

import { FileComponent } from '../pages/documents/file/file.component';

import {
  FooterComponent,
  HeaderComponent,
  SearchInputComponent,
  ThemeSettingsComponent,
  SwitcherComponent,
  LayoutDirectionSwitcherComponent,
  ThemeSwitcherComponent,
  TinyMCEComponent,
  ThemeSwitcherListComponent,
  DeleteConfirmationComponent,
  CardHeaderActionsComponent,
  CardHeaderSearchComponent,
  CardMobileHeaderActionsComponent,
  NgxAlertComponent,
  NgxPaginationComponent,
  BtnOptionsComponent,
  NgxSelectComponent,
  NgxTableComponent,
  RowComponent,
  NgxCollapseTableComponent,
  SendNotificationComponent,
  NotificationComponent,
  MobileDropdownComponent,
  NgxDatepickerDropdownComponent,
  FiltersComponent
} from './components';

import { ErrorMessageComponent, NbrInputComponent, TextFieldComponent } from './locatus/forms';

import { NgxTableService } from './components/ngx-table/ngxTableService.service';

import { CapitalizePipe, PluralPipe, RoundPipe, TimingPipe } from './pipes';
import {
  OneColumnLayoutComponent,
  SampleLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
} from './layouts';
import { DEFAULT_THEME } from './styles/theme.default';
import { COSMIC_THEME } from './styles/theme.cosmic';
import { CORPORATE_THEME } from './styles/theme.corporate';

const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule];

const NB_MODULES = [
  NbCardModule,
  NbLayoutModule,
  NbTabsetModule,
  NbRouteTabsetModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbCheckboxModule,
  NbPopoverModule,
  NbContextMenuModule,
  NgbModule,
  NbSecurityModule, // *nbIsGranted directive
  RouterModule,
  NgSelectModule,
  NgxSpinnerModule
];

const LOCATUS = [
  NbrInputComponent,
  ErrorMessageComponent,
  TextFieldComponent
];

const COMPONENTS = [
  SwitcherComponent,
  LayoutDirectionSwitcherComponent,
  ThemeSwitcherComponent,
  ThemeSwitcherListComponent,
  HeaderComponent,
  FooterComponent,
  SearchInputComponent,
  ThemeSettingsComponent,
  TinyMCEComponent,
  OneColumnLayoutComponent,
  SampleLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
  DeleteConfirmationComponent,
  CardHeaderActionsComponent,
  CardMobileHeaderActionsComponent,
  CardHeaderSearchComponent,
  NgxAlertComponent,
  NgxPaginationComponent,
  BtnOptionsComponent,
  NbrInputComponent,
  NgxSelectComponent,
  NgxTableComponent,
  RowComponent,
  NgxCollapseTableComponent,
  SendNotificationComponent,
  PaymentTableComponent,
  PaymentMobileTableComponent,
  PaymentFormComponent,
  MobileHeaderComponent,
  PaymentHeaderComponent,
  PaymentComponent,
  MobilePaymentComponent,
  NotificationComponent,
  FileComponent,
  MobileDropdownComponent,
  NgxDatepickerDropdownComponent,
  FiltersComponent,
];

const ENTRY_COMPONENTS = [
  ThemeSwitcherListComponent,
  PaymentTableComponent,
  PaymentMobileTableComponent,
  SendNotificationComponent,
  PaymentFormComponent,
  DeleteConfirmationComponent,
  FileComponent,
  MobileDropdownComponent
];

const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
];

const NB_THEME_PROVIDERS = [
  ...NbThemeModule.forRoot(
    {
      name: 'default',
    },
    [DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME],
  ).providers,
  ...NbSidebarModule.forRoot().providers,
  ...NbMenuModule.forRoot().providers,
  NgxTableService
];

@NgModule({
  imports: [...BASE_MODULES, ...NB_MODULES],
  exports: [...BASE_MODULES, ...NB_MODULES, ...COMPONENTS, ...LOCATUS, ...PIPES],
  declarations: [...COMPONENTS, ...LOCATUS, ...PIPES],
  entryComponents: [...ENTRY_COMPONENTS],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [...NB_THEME_PROVIDERS],
    };
  }
}
