import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { ContactRoutingModule, routedComponents } from './contact-routing.module';
import { LodgersComponent } from './lodgers/lodgers.component';
import { OwnersComponent } from './owners/owners.component';
import { ProvidersComponent } from './providers/providers.component';
import { ContactComponent } from './components/contact/contact.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    ContactRoutingModule
  ],
  declarations: [...routedComponents, LodgersComponent, OwnersComponent, ProvidersComponent, ContactComponent]
})
export class ContactModule { }
