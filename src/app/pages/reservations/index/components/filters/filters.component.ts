import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { PropertyService } from '../../../../../@core/data/property.service';
import { ReservationsService } from '../../../../../@core/data/reservations.service';
import { Property } from '../../../../../@core/data/models/property';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Output() hasFilters: EventEmitter<{ filters: any[] }> = new EventEmitter();

  public statuses: any[] = [
    { label: 'Status', value: 'Tous' },
    { label: 'validée', value: 'validée' },
    { label: 'provisoire', value: 'provisoire' },
    { label: 'annulée', value: 'annulée' },
    { label: 'terminée', value: 'terminée' }
  ];

  public status = this.statuses[0];

  public payementStatus: any[] = [
    { label: 'Statut de payement', value: 'Tous' },
    { label: 'payé', value: 'payé' },
    { label: 'à payer', value: 'à payer' }
  ];

  public paymentStat = this.payementStatus[0];

  public property = { label: this.propertyService.currentProperty.title, value: this.propertyService.currentProperty.title };

  properties = [];

  filters = [];

  currentProperty = this.propertyService.currentProperty ? this.propertyService.currentProperty : this.properties[0];

  source: LocalDataSource = new LocalDataSource();

  constructor(public reservationsService: ReservationsService, private propertyService: PropertyService) { }

  ngOnInit() {
    if (this.currentProperty) {
      this.source = this.reservationsService.getPropertyReservations(this.currentProperty);
    } else {
      this.property = { label: 'Choisir un bien', value: 'Choisir un bien' };
    }
    this.properties = this.propertyService.properties.map(property => {
      return { label: property.title, value: property.title };
    });
  }

  setFilter(filter, selectValue, filtervalue) {
    let exist = this.filters.find(f => {
      return f.field === filter
    });
    if (exist) {
      this.filters = this.filters.map(f => {
        if (f.field === filter) {
          f = filtervalue;
        }
        return f;
      });
    } else {
      if (selectValue.value !== 'Tous') {
        this.filters.push(filtervalue);
      }
    }
  }

  setCurrentProperty(propertyTitle) {
    const property = this.propertyService.properties.filter(p => {
      return p.title === propertyTitle.value;
    })[0];
    this.propertyService.setCurrentProperty(property);
  }

  setStatus(status) {
    this.setFilter('status', status, {
      field: 'status',
      search: status.value !== 'Tous' ? status.value : ''
    });
    this.hasFilters.emit({ filters: this.filters });
    this.source.setFilter(this.filters, true);
  }

  setPaymentStatus(paymentStatus) {
    this.setFilter('paymentStatus', paymentStatus, {
      field: 'paymentStatus',
      search: paymentStatus.value !== 'Tous' ? paymentStatus.value : '',
      filter: (cell: any, search: string) => {
        if (cell === search) {
          return true;
        } else {
          return false;
        }
      }
    });
    this.hasFilters.emit({ filters: this.filters });
    this.source.setFilter(this.filters, true);
  }

}
