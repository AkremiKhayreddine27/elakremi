import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FinancesService } from '../../../@core/data/finances.service';
import { PropertyService } from '../../../@core/data/property.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs/Subject';
import { PaymentFormComponent } from '../../payments/payment-form/payment-form.component';
import { Search } from '../../../@theme/components/card-header-search/search.interface';
import * as dateFns from 'date-fns';
import { PaymentService } from '../../../@core/data/payment.service';
import { ReservationsService } from '../../../@core/data/reservations.service';
import { ServicesService } from '../../../@core/data/services.service';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy, Search {

  headerActions = [
    { title: 'Chercher', type: 'link', icon: 'fa fa-search', clickAction: 'onSearch', displayInMobile: true },
    { title: 'Filtrer', type: 'link', icon: 'fa fa-filter', clickAction: 'filter', displayInMobile: false },
    {
      title: 'Trier', type: 'dropdown', icon: 'fa fa-sort', displayInMobile: false, dropdownItems: [
        {
          title: 'Status',
          action: 'sort',
          value: 'status',
          direction: 'asc',
        },
        {
          title: 'Montant',
          action: 'sort',
          value: 'price',
          direction: 'asc',
        },
        {
          title: 'Date',
          action: 'sort',
          value: 'deadlineDate',
          direction: 'asc',
        },
      ]
    },
    { title: 'Ajouter', type: 'link', icon: 'fa fa-plus', clickAction: 'create', displayInMobile: false },
    {
      title: 'Autres', type: 'dropdown', icon: 'fa fa-ellipsis-h', dropdownItems: [
        {
          title: 'Import',
          action: 'settings',
          icon: 'fa fa-upload',
        },
        {
          title: 'Export',
          action: 'settings',
          icon: 'fa fa-download',
        }
      ], displayInMobile: false
    }
  ];

  isFilterCollapsed = true;

  isSearching = false;

  withFilters = false;

  filters: any[] = [];

  refreshPagination: Subject<any> = new Subject();

  source: LocalDataSource = new LocalDataSource();

  public finances;
  public data: any[] = [];

  searchFields = ['status.value', 'type.value', 'method.value', 'payer', 'payee', 'price.value'];

  periods: any[] = [
    { id: "année en cours", value: "année en cours" },
    { id: "année dernière", value: "année dernière" },
  ];

  period = this.periods[0];

  public property = { id: this.propertyService.currentProperty.id, value: this.propertyService.currentProperty.title };

  properties;

  reservations;

  reservation;

  services;

  service;

  types;

  constructor(
    public financesService: FinancesService,
    public propertyService: PropertyService,
    private modalService: NgbModal,
    private paymentService: PaymentService,
    private reservationsService: ReservationsService,
    private servicesService: ServicesService
  ) {
  }

  ngOnInit() {
    this.properties = of(this.propertyService.properties.map(property => {
      return { id: property.id, value: property.title };
    })).pipe(delay(500));
    this.reservations = of(this.reservationsService.findBy('property.id', this.propertyService.currentProperty.id).map(reservation => {
      return { id: reservation.id, value: reservation.title };
    })).pipe(delay(500));
    this.services = of(this.servicesService.findBy('property.id', this.propertyService.currentProperty.id).map(service => {
      return { id: service.id, value: service.title };
    })).pipe(delay(500));
    let statuses = this.paymentService.getStatuses();
    this.types = of(this.paymentService.types).pipe(delay(500));
    this.filters = [
      {
        name: 'reservation',
        type: 'select',
        field: 'nomenclature',
        placeholder: 'Choisir une réservation',
        elements: this.reservations,
        callback: function (cell: any, search: any) {
          if (cell.id.toString() === search && cell.type === 'Réservation') {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        name: 'service',
        type: 'select',
        field: 'nomenclature',
        placeholder: 'Choisir une service',
        elements: this.services,
        callback: function (cell: any, search: string) {
          if (cell.id.toString() === search && cell.type === 'Service') {
            return true;
          } else {
            return false;
          }
        }
      },
      { type: 'datepicker' },
      {
        name: 'status',
        type: 'select',
        field: 'status',
        placeholder: 'Choisir une statut',
        elements: statuses,
        callback: function (cell: any, search: any) {
          if (cell.id.toString() === search) {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        name: 'type',
        type: 'selectGroup',
        field: 'type',
        groupBy: function (item) {
          return item.isOutgo ? 'Dépense' : 'Revenue';
        },
        callback: function (cell: any, search: string) {
          if (search === 'Dépense') {
            return cell.isOutgo;
          } else if (search === 'Revenue') {
            return cell.isIncome;
          } else if (cell.id.toString() === search) {
            return true;
          } else {
            return false;
          }
        },
        placeholder: 'Choisir un type',
        elements: this.types
      }
    ];

    for (let start = 0; start < 12; start++) {
      let date: any = dateFns.subMonths(dateFns.startOfMonth(new Date()), start);
      this.periods.push({
        id: 'Depuis ' + dateFns.format(date, 'MMM YYYY'),
        value: 'Depuis ' + dateFns.format(date, 'MMM YYYY'),
        data: date
      });
    }
    this.setPeriod(this.period);
    this.source.onChanged().subscribe(value => {
      this.refreshPagination.next(this.source);
      this.data = value.elements;
    });
    this.propertyService.refreshCurrentProperty.subscribe(property => {
      if (property !== null) {
        this.setPeriod(this.period);
      } else {
        this.source.load([]);
      }
    });
  }

  setCurrentProperty(title) {
    const property = this.propertyService.properties.filter(p => {
      return p.title === title;
    })[0];
    this.propertyService.setCurrentProperty(property);
  }

  setPeriod(period) {
    this.period = period;
    let start;
    switch (period.value) {
      case "année en cours":
        start = dateFns.startOfYear(new Date());
        this.finances = this.financesService.getPropertyFinances(this.propertyService.currentProperty, start, new Date());
        this.source = this.financesService.getPropertyPayments(this.propertyService.currentProperty, start, new Date());
        break;
      case 'année dernière':
        start = dateFns.startOfYear(dateFns.subYears(new Date(), 1));
        let end = dateFns.endOfYear(dateFns.subYears(new Date(), 1));
        this.finances = this.financesService.getPropertyFinances(this.propertyService.currentProperty, start, end);
        this.source = this.financesService.getPropertyPayments(this.propertyService.currentProperty, start, end);
        break;
      default:
        this.finances = this.financesService.getPropertyFinances(this.propertyService.currentProperty, period.data, new Date());
        this.source = this.financesService.getPropertyPayments(this.propertyService.currentProperty, period.data, new Date());
        break;
    }
  }

  handleHeaderEvent(event) {
    this[event.action]();
  }

  handleDropdownEvent(event) {
    this[event.item.action](event.item);
  }

  onSearch() {
    this.isSearching = !this.isSearching;
    this.isFilterCollapsed = true;
  }

  filter() {
    this.isFilterCollapsed = !this.isFilterCollapsed;
    this.isSearching = false;
  }

  sort(element) {
    element.direction = element.direction === 'asc' ? 'desc' : 'asc';
    this.source.setSort([
      {
        field: element.value,
        direction: element.direction,
        compare: function (direction: any, a: any, b: any) {

          let f = a.value || a.value === 0 ? a.value : a;
          let s = b.value || b.value === 0 ? b.value : b;

          let first = typeof f === 'string' ? f.toLowerCase() : f;
          let second = typeof s === 'string' ? s.toLowerCase() : s;

          if (first < second) {
            return -1 * direction;
          }
          if (first > second) {
            return direction;
          }
          return 0;
        }
      }
    ]);
  }

  create() {
    const modalRef = this.modalService.open(PaymentFormComponent, { size: 'lg', container: 'nb-layout' });
  }

  handleFilter(action, data) {
    this[action](data);
  }

  hasFilters(filters) {
    const w = filters.filter(f => {
      return f.search !== '';
    });
    this.withFilters = w.length === 0 ? false : true;
  }

  ngOnDestroy() {
    this.source.reset();
  }

}
