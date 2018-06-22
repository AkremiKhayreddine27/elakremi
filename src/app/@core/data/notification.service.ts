import { Injectable } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Property } from './models/property';
import { Subject } from 'rxjs/Subject';
import { PropertyService } from './property.service';

@Injectable()
export class NotificationService {

    refreshUnread: Subject<any> = new Subject();

    source: LocalDataSource = new LocalDataSource();

    notifications = [
        {
            id: 1,
            title: 'Contrat de gaz',
            content: 'il reste seulement un jour pour payer votre contrat de gaz',
            unread: true
        },
        {
            id: 2,
            title: "Contrat d'électricité",
            content: "Vous avez dépassé la date limite pour payer votre contrat d'électricité",
            unread: true
        },
        {
            id: 3,
            title: "Contrat d'électricité",
            content: "il reste seulement un jour pour payer votre contrat d'électricité",
            unread: false
        }
    ];

    constructor(private propertyService: PropertyService) { }

    all() {
        return this.notifications;
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
}