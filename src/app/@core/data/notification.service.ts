import { Injectable } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Property } from './models/property';
import { Subject } from 'rxjs/Subject';
import { PropertyService } from './property.service';
import * as dateFns from 'date-fns';

@Injectable()
export class NotificationService {

    refreshUnread: Subject<any> = new Subject();

    source: LocalDataSource = new LocalDataSource();

    notifications = [];

    constructor(private propertyService: PropertyService) { }

    all(property: Property = this.propertyService.currentProperty) {
        this.getPropertyNotifications(property)
        return this.notifications;
    }

    add(notification) {
        this.notifications.push(notification);
        this.refreshUnread.next(this.unread());
    }

    unread() {
        return this.notifications.filter(notification => {
            return notification.unread;
        });
    }

    markUsRead(notification) {
        notification.unread = false;
        this.refreshUnread.next(this.unread());
    }

    getPropertyNotifications(property: Property) {

    }
}