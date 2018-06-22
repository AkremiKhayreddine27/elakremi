import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TariffComponent } from './tariff.component';


const routes: Routes = [
    {
        path: '',
        component: TariffComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TarifRoutingModule { }

export const routedComponents = [
    TariffComponent
];
