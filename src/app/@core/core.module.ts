import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';

import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/services/data.module';
import { AnalyticsService } from './utils/analytics.service';

import { AuthGuard } from './utils/auth-guard.service';

import { UtilitiesService } from './utils/utilities.service';

import { AuthService } from './data/services/auth.service';

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole(): any {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS: any = [
  ...DataModule.forRoot().providers,
  AuthService,
  AuthGuard,
  AnalyticsService,
  UtilitiesService
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
