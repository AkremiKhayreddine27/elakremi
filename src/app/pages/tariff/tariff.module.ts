import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';

import { TarifRoutingModule, routedComponents } from './tariff-routing.module';
import { TarifSaisonComponent } from './tarif-saison/tarif-saison.component';
import { TarifEventComponent } from './tarif-event/tarif-event.component';
import { FeesComponent } from './fees/fees.component';
import { CautionComponent } from './caution/caution.component';
import { PaymentTermsComponent } from './payment-terms/payment-terms.component';
import { FurtherInfosComponent } from './further-infos/further-infos.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    TarifRoutingModule
  ],
  declarations: [...routedComponents, TarifSaisonComponent, TarifEventComponent, FeesComponent, CautionComponent, PaymentTermsComponent, FurtherInfosComponent]
})
export class TariffModule { }
