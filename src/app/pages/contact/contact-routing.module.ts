import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactComponent } from './contact.component';
import { LodgersComponent } from './lodgers/lodgers.component';
import { OwnersComponent } from './owners/owners.component';
import { ProvidersComponent } from './providers/providers.component';


const routes: Routes = [
    {
        path: '',
        component: ContactComponent,
        children: [
            {
                path: '',
                redirectTo: 'lodgers',
                pathMatch: 'full',
            },
            {
                path: 'lodgers',
                component: LodgersComponent,
            },
            {
                path: 'owners',
                component: OwnersComponent
            },
            {
                path: 'providers',
                component: ProvidersComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ContactRoutingModule { }

export const routedComponents = [
    ContactComponent
];
