import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalInformationsComponent } from './personal-informations/personal-informations.component';
import { SecurityComponent } from './security/security.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { AccountComponent } from './account.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '',
        redirectTo: 'personal-informations',
        pathMatch: 'full',
      },
      {
        path: 'personal-informations',
        component: PersonalInformationsComponent,
      },
      {
        path: 'security',
        component: SecurityComponent
      },
      {
        path: 'preferences',
        component: PreferencesComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {

}

export const routedComponents = [
  AccountComponent,
  PersonalInformationsComponent,
  SecurityComponent,
  PreferencesComponent
];
