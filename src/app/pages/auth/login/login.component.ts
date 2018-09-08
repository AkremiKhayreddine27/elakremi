/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@core/data/services/auth.service';

@Component({
  selector: 'nb-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbLoginComponent {

  user: any = {};
  submitted: boolean = false;
  showMessages: any = {};
  errors: string[] = [];
  messages: string[] = [];
  socialLinks = [];

  constructor(protected service: AuthService,
    protected cd: ChangeDetectorRef,
    protected router: Router) {

  }

  login(): void {
    this.submitted = true;
    this.service.emailPasswordLogin(this.user.email, this.user.password).then(() => {
      console.log('Logged in !!');
      this.router.navigate(['/']);
    }).catch(error => {
      this.submitted = false;
    });
  }

  loginWithGoogle(): void {
    this.service.googleLogin().then(() => {
      this.router.navigate(['/']);
    });
  }

}
