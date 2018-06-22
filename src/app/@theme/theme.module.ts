import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

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
  NbrInputComponent,
  NgxSelectComponent,
  NgxTableComponent,
  RowComponent,
  NgxCollapseTableComponent,
  SendNotificationComponent
} from './components';

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
  RouterModule
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
  MobilePaymentComponent
];

const ENTRY_COMPONENTS = [
  ThemeSwitcherListComponent,
  PaymentTableComponent,
  PaymentMobileTableComponent,
  SendNotificationComponent,
  PaymentFormComponent,
  DeleteConfirmationComponent
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
  exports: [...BASE_MODULES, ...NB_MODULES, ...COMPONENTS, ...PIPES],
  declarations: [...COMPONENTS, ...PIPES],
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
