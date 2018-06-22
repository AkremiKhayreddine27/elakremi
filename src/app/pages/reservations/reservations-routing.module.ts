import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { NewReservationComponent } from './show/show.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'create',
    component: NewReservationComponent,
  },
  {
    path: ':reservation/edit',
    component: NewReservationComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationsRoutingModule {

}

export const routedComponents = [
  IndexComponent,
  NewReservationComponent
];
