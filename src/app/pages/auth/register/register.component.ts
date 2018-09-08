/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/data/services/auth.service';


@Component({
  selector: 'nb-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbRegisterComponent {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  constructor(protected service: AuthService,
    protected cd: ChangeDetectorRef,
    protected router: Router) {

  }

  register(): void {
    this.service.register(this.user).then(() => {
      this.router.navigate(['/']);
    });
  }

  loginWithGoogle(): void {
    this.service.googleLogin().then(() => {
      this.router.navigate(['/']);
    });
  }
}
