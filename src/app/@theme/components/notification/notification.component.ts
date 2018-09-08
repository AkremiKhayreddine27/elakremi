import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from '../../../@core/data';
import * as dateFns from 'date-fns';
import * as frLocale from 'date-fns/locale/fr';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input() notification;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notification.createdAt = dateFns.distanceInWordsToNow(this.notification.createdAt, {locale: frLocale})
  }

  markUsUnread() {
    this.notificationService.markUsRead(this.notification);
  }
}
