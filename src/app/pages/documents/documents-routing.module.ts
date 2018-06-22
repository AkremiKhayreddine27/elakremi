import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';


const routes: Routes = [
    {
        path: '',
        component: IndexComponent
    },
    {
        path: 'reservations/:reservation/documents',
        component: IndexComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DocumentsRoutingModule { }

export const routedComponents = [
    IndexComponent
];
