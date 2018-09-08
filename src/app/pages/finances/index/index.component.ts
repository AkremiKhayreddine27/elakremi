import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FinancesService } from '../../../@core/data';
import { PropertyService } from '../../../@core/data';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs/Subject';
import { PaymentFormComponent } from '../../payments/payment-form/payment-form.component';
import * as dateFns from 'date-fns';
import { PaymentService } from '../../../@core/data';
import { ReservationsService } from '../../../@core/data';
import { ServicesService } from '../../../@core/data';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../../store';
import { Pagination, FilterConf, SortConf } from '../../../store/helpers';
import { Payment } from '@core/data/models';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

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


  searchFields = ['status.value', 'type.value', 'method.value', 'payer', 'payee', 'price.value'];

  periods: any[] = [
    { id: "année en cours", value: "année en cours" },
    { id: "année dernière", value: "année dernière" },
  ];

  period = this.periods[0];

  properties;

  reservations;

  reservation;

  services;

  service;

  types;

  data$: Observable<Payment[]>;
  filtersConf: FilterConf;
  sortConf: SortConf[];
  pagination$: Observable<Pagination>;
  loaded$: Observable<boolean>;
  total$: Observable<number>;

  constructor(
    public financesService: FinancesService,
    public propertyService: PropertyService,
    private modalService: NgbModal,
    private paymentService: PaymentService,
    private reservationsService: ReservationsService,
    private servicesService: ServicesService,
    private store: Store<fromStore.LocatusState>
  ) {
  }

  ngOnInit() {
    this.properties = of(this.propertyService.all().map(property => {
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
        name: 'property',
        type: 'select',
        field: 'propertyId',
        placeholder: 'Choisir une bien',
        elements: this.properties,
        element: { id: this.propertyService.currentProperty.id, value: this.propertyService.currentProperty.title },
        callback: function (cell: any, search: any) {
          return cell.toString() === search;
        }
      },
      {
        name: 'reservation',
        type: 'select',
        field: 'nomenclature',
        placeholder: 'Choisir une réservation',
        elements: this.reservations,
        callback: function (cell: any, search: any) {
          return cell.id.toString() === search && cell.type === 'Réservation';
        }
      },
      {
        name: 'service',
        type: 'select',
        field: 'nomenclature',
        placeholder: 'Choisir une service',
        elements: this.services,
        callback: function (cell: any, search: string) {
          return cell.id.toString() === search && cell.type === 'Service';
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
          return cell.id.toString() === search;
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

    this.resetSort();
    for (let start = 0; start < 12; start++) {
      let date: any = dateFns.subMonths(dateFns.startOfMonth(new Date()), start);
      this.periods.push({
        id: 'Depuis ' + dateFns.format(date, 'MMM YYYY'),
        value: 'Depuis ' + dateFns.format(date, 'MMM YYYY'),
        data: date
      });
    }

    this.setPeriod(this.period);

    this.total$ = this.store.select<any>(fromStore.getPaymentsCount);
    this.pagination$ = this.store.select<any>(fromStore.getPaymentsPagination);
    this.loaded$ = this.store.select<any>(fromStore.getPaymentsLoaded);
    this.data$ = this.store.select<any>(fromStore.getPaginatedSortedFiltredPayments);
  }

  paginate(pagination: Pagination) {
    this.store.dispatch(new fromStore.LoadPayments({ ...this.filtersConf }, [...this.sortConf], { ...pagination }));
  }

  applyFilters(filters, config) {
    this.filtersConf = { filters, andOperator: true };
    this.store.dispatch(new fromStore.LoadPayments({ ...this.filtersConf }, [...this.sortConf], { page: 1, perPage: 10 }));
  }

  onSearch(filters: FilterConf) {
    this.filtersConf = filters;
    if (filters.filters.length === 0) {
      this.resetFilters();
    }
    this.store.dispatch(new fromStore.LoadPayments({ ...this.filtersConf }, [...this.sortConf], { page: 1, perPage: 10 }));
  }

  sort(element) {
    element.direction = element.direction === 'asc' ? 'desc' : 'asc';
    this.sortConf = [
      {
        field: element.value,
        direction: element.direction
      }
    ];
    this.store.dispatch(new fromStore.LoadPayments({ ...this.filtersConf }, [...this.sortConf], { page: 1, perPage: 10 }));
  }

  resetFilters() {
    this.filtersConf = {
      filters: [
        {
          field: 'propertyId',
          search: this.propertyService.currentProperty.id.toString(),
          filter: function (cell: any, search: any) {
            return cell.toString() === search
          }
        }
      ],
      andOperator: false,
    };
  }

  resetSort() {
    this.sortConf = [{
      field: 'start',
      direction: 'desc',
    }];
  }

  setPeriod(period) {
    this.period = period;
    let start;
    switch (period.value) {
      case "année en cours":
        start = dateFns.startOfYear(new Date());
        this.filtersConf = {
          filters: [
            {
              field: 'propertyId',
              search: this.propertyService.currentProperty.id.toString(),
              filter: function (cell: any, search: any) {
                return cell.toString() === search
              }
            },
            {
              field: 'deadlineDate',
              search: start.toString(),
              filter: function (cell: any, search: any) {
                return dateFns.isWithinRange(cell, start, new Date());
              }
            }
          ],
          andOperator: true,
        };
        this.store.dispatch(new fromStore.LoadPayments({ ...this.filtersConf }, [...this.sortConf], { page: 1, perPage: 10 }));
        break;
      case 'année dernière':
        start = dateFns.startOfYear(dateFns.subYears(new Date(), 1));
        let end = dateFns.endOfYear(dateFns.subYears(new Date(), 1));
        this.filtersConf = {
          filters: [
            {
              field: 'propertyId',
              search: this.propertyService.currentProperty.id.toString(),
              filter: function (cell: any, search: any) {
                return cell.toString() === search
              }
            },
            {
              field: 'deadlineDate',
              search: start.toString(),
              filter: function (cell: any, search: any) {
                return dateFns.isWithinRange(cell, start, end);
              }
            }
          ],
          andOperator: true,
        };
        this.store.dispatch(new fromStore.LoadPayments({ ...this.filtersConf }, [...this.sortConf], { page: 1, perPage: 10 }));
        break;
      default:
        this.filtersConf = {
          filters: [
            {
              field: 'propertyId',
              search: this.propertyService.currentProperty.id.toString(),
              filter: function (cell: any, search: any) {
                return cell.toString() === search
              }
            },
            {
              field: 'deadlineDate',
              search: period.data.toString(),
              filter: function (cell: any, search: any) {
                return dateFns.isWithinRange(cell, period.data, new Date());
              }
            }
          ],
          andOperator: true,
        };
        this.store.dispatch(new fromStore.LoadPayments({ ...this.filtersConf }, [...this.sortConf], { page: 1, perPage: 10 }));
        break;
    }
  }

  handleHeaderEvent(event) {
    this[event.action]();
  }

  handleDropdownEvent(event) {
    this[event.item.action](event.item);
  }

  filter() {
    this.isFilterCollapsed = !this.isFilterCollapsed;
    this.isSearching = false;
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

}
