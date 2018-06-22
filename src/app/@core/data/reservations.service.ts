import { Injectable } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Property } from './models/property';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ReservationsService {

    refresh: Subject<any> = new Subject();

    source: LocalDataSource = new LocalDataSource();

    getPropertyReservations(property: Property) {
        this.source.load(property.reservations.sort((a, b) => {
            return b.createdAt - a.createdAt;
        }));
        return this.source;
    }

    getReservation(property: Property, id) {
        return property.reservations.filter(reservation => {
            return reservation.id === Number.parseInt(id);
        })[0];
    }

    add(reservation, property: Property) {
        property.reservations.push(reservation);
        this.source.load(property.reservations.sort((a, b) => {
            return b.createdAt - a.createdAt;
        }));
        this.refresh.next(this.source);
    }

    remove(reservation, property: Property) {
        property.reservations = property.reservations.filter(r => {
            return reservation.id !== r.id;
        });
        this.source.load(property.reservations.sort((a, b) => {
            return b.createdAt - a.createdAt;
        }));
        this.refresh.next(this.source);
    }

}