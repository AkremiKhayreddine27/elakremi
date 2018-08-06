import { Component, Input, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { NotificationService } from '../../../@core/data/notification.service';
import { getDeepFromObject } from '../../../@core/utils/helpers';


import { NbAuthService, NB_AUTH_OPTIONS, NbAuthResult, NbAuthJWTToken } from '@nebular/auth';
import * as faker from 'faker';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: any = {
    id: 1,
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    role: 'locataire',
    phone: faker.phone.phoneNumber(),
    location: {
      country: 'France',
      city: 'Issy-les-Moulineaux',
      state: 'Ile-de-France',
      address: 'Info Municipale, Chemin de Bretagne',
      longitude: 2.2582740783036575,
      latitude: 48.82377450294101,
      postcode: '92130',
      isValid: true
    }
  };

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  public notifications = [];

  public unreadNotificationsNbr = 0;

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    protected router: Router,
    @Inject(NB_AUTH_OPTIONS) protected config = {},
    protected authService: NbAuthService,
    private notificationService: NotificationService,
    private analyticsService: AnalyticsService) {
  }

  ngOnInit() {
    this.notifications = this.notificationService.all();
    this.unreadNotificationsNbr = this.notificationService.unread().length;
    this.notificationService.refreshUnread.subscribe(unread => {
      this.unreadNotificationsNbr = unread.length;
    });
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        //this.user = token.getPayload(); // here we receive a payload from the token and assigne it to our `user` variable 
      }
    });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  logout() {
    const redirectDelay = this.getConfigValue('forms.logout.redirectDelay');
    this.authService.logout('email').subscribe((result: NbAuthResult) => {
      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl('auth');
        }, redirectDelay);
      }
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }
}
