import { Component, Input, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { NotificationService } from '../../../@core/data';

import * as faker from 'faker';
import { Observable } from 'rxjs/Observable';
import { User } from '@core/data/models';

import { Store } from '@ngrx/store';
import * as fromStore from '../../../store';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: Observable<User>;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  public notifications = [];

  public unreadNotificationsNbr = 0;

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    protected router: Router,
    private store: Store<fromStore.LocatusState>,
    private notificationService: NotificationService,
    private analyticsService: AnalyticsService) {
  }

  ngOnInit() {
    this.notifications = this.notificationService.all();
    this.unreadNotificationsNbr = this.notificationService.unread().length;
    this.notificationService.refreshUnread.subscribe(unread => {
      this.unreadNotificationsNbr = unread.length;
    });
    this.user = this.store.select<User>(fromStore.getAuth);
    this.store.dispatch(new fromStore.Check());
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
    //this.authService.signOut();
  }
}
