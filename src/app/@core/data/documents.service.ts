import { Injectable } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Property } from './models/property';
import { Subject } from 'rxjs/Subject';
import { PropertyService } from './property.service';
 
@Injectable()
export class DocumentsService {

    refresh: Subject<any> = new Subject();

    source: LocalDataSource = new LocalDataSource();

    documents = [];

    constructor(private propertyService: PropertyService) { }

    getPropertyDocuments(property: Property) {
        property.documents.map(document => {
            document.owner = {
                type: 'bien',
                id: property.id,
                title: property.title
            };
            this.documents.push(document);
        });
        property.reservations.map(reservation => {
            reservation.documents.map(document => {
                document.owner = {
                    type: 'réservation',
                    id: reservation.id,
                    title: reservation.title
                };
                this.documents.push(document);
            });
        });
        property.services.map(service => {
            service.documents.map(document => {
                document.owner = {
                    type: 'service',
                    id: service.id,
                    title: service.title,
                    serviceCategory: service.type.subCategory,
                    serviceType: service.type.slug
                };
                this.documents.push(document);
            })
        });
        return this.documents.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });
    }

}