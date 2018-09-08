import { NgModule } from '@angular/core';
import { EntityMetadataMap, NgrxDataModule } from 'ngrx-data';


export const entityMetadata: EntityMetadataMap = {
  Property: {},
  Reservation: {},
  Service: {},
  Document: {},
};

export const pluralNames = {
  Property: 'Properties',
  Reservation: 'Reservations',
  Service: 'Services',
  Document: 'Documents',
};

@NgModule({
  imports: [
    NgrxDataModule.forRoot({
      entityMetadata: entityMetadata,
      pluralNames: pluralNames
    })
  ]
})
export class EntityStoreModule { }
