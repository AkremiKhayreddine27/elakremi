import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowComponent } from './show/show.component';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: ':property/services',
    component: ShowComponent
  },
  {
    path: 'services/:service/edit',
    component: CreateComponent,
  },
  {
    path: ':category/:subCategory/:type/create',
    component: CreateComponent
  },
  {
    path: 'services',
    component: ShowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesRoutingModule {

}

export const routedComponents = [
  ShowComponent,
  IndexComponent,
  CreateComponent
];
