import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IndexComponent as Dashboard2Component } from './dashboard2/index/index.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'dashboard2',
      component: Dashboard2Component,
    },
    {
      path: 'miscellaneous',
      loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
    }, {
      path: 'properties',
      loadChildren: './properties/properties.module#PropertiesModule',
    }, {
      path: 'calendar',
      //loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
      loadChildren: './calendar/app-calendar.module#AppCalendarModule',
    }, {
      path: 'tariff',
      loadChildren: './tariff/tariff.module#TariffModule',
    }, {
      path: 'reservations',
      loadChildren: './reservations/reservations.module#ReservationsModule'
    }, {
      path: 'categories',
      loadChildren: './services/services.module#ServicesModule'
    }, {
      path: 'finances',
      //loadChildren: './under-construction/under-construction.module#UnderConstructionModule'
      loadChildren: './finances/finances.module#FinancesModule'
    }, {
      path: 'contacts',
      loadChildren: './contact/contact.module#ContactModule'
    }, {
      path: 'documents',
      loadChildren: './documents/documents.module#DocumentsModule'
    }, {
      path: 'account',
      loadChildren: './account/account.module#AccountModule'
    }, {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    }, {
      path: '**',
      component: NotFoundComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
