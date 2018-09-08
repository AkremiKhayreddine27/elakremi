import { Component, OnInit, ChangeDetectorRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PropertyService } from '../../../@core/data';
import { ReservationsService } from '../../../@core/data';
import { Router } from '@angular/router';
import { DialogCheckInComponent } from '../dialog-check-in/dialog-check-in.component';
import { TableComponent } from '../../payments/table/table.component';
import { Reservation } from '../../../@core/data/models';
import { DialogNewDocumentComponent } from '../../documents/document-form/document-form.component';
import * as faker from 'faker';
import { PaymentService } from '../../../@core/data';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Payment } from '../../../@core/data/models/payment';
import { LocatusAbstractComponent } from '../../../@core/utils/locatusComponent.abstract';
import { DeleteConfirmationComponent } from '../../../@theme/components/delete-confirmation/delete-confirmation.component';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../../store';
import { Pagination, FilterConf, SortConf } from '../../../store/helpers';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent extends LocatusAbstractComponent implements OnInit {

  url: string = '/pages/reservations';

  config = {
    header: [
      { title: 'Bien', width: 'col-3' },
      { title: 'Locataire', width: 'col' },
      { title: 'Durée', width: 'col' },
      { title: 'Statut', width: 'col' },
      { title: 'Paiements', width: 'col' },
      { title: '', width: 'col-1' }
    ],
    mobileHeader: [
      { title: 'Bien', width: 'col-3' },
      { title: 'Réservation', width: 'col-3' },
      { title: 'Paiements', width: 'col-4' },
      { title: '', width: 'col-2' }
    ],
    rows: [
      {
        type: 'array',
        width: 'col-3',
        content: [
          { type: 'imageText', path: ['property.images', 'property.title'] }
        ]
      },
      {
        type: 'array',
        width: 'col',
        content: [
          { type: 'text', path: ['lodger.firstname', 'lodger.lastname'] },
          { type: 'text', path: ['lodger.phone'] },
          { type: 'iconText', path: ['fa fa-users', 'nbrAdultes'] },
        ]
      },
      {
        type: 'array',
        width: 'col',
        content: [
          { type: 'date', path: ['start', 'end'], splitData: true },
          { type: 'text', path: ['nbrNight'] }
        ]
      },
      {
        type: 'badge',
        width: 'col',
        content: [
          { type: 'badge', path: ['status'] }
        ]
      },
      {
        type: 'array',
        width: 'col',
        content: [
          { type: 'amount', label: 'Solde', path: ['balance.value'], currency: 'balance.currency.symbol' },
          { type: 'amount', label: 'Réglé', path: ['adjusted.value'], currency: 'adjusted.currency.symbol' },
          {
            type: 'collapse',
            label: 'détails',
            path: [null],
            getData: (id) => {
              return this.store.select<any>(fromStore.getPaymentsByNomenclature(id, 'Réservation'));
            },
            component: TableComponent
          }
        ]
      },
      {
        type: 'options',
        width: 'col-1',
        content: [
          { type: 'data', title: 'title' },
          { type: 'divider' },
          { type: 'option', title: 'Check in', icon: 'fa fa-sign-in mr-1', clickAction: 'checkin' },
          { type: 'option', title: 'Check out', icon: 'fa fa-sign-out mr-1', clickAction: 'checkin' },
          { type: 'option', title: 'Commentaire', icon: 'fa fa-comment mr-1', clickAction: 'checkin' },
          { type: 'option', title: 'Document', icon: 'fa fa-upload mr-1', clickAction: 'documents' },
          { type: 'divider' },
          { type: 'option', title: 'éditer', icon: 'fa fa-edit mr-1', clickAction: 'edit' },
          { type: 'option', title: 'supprimer', icon: 'fa fa-trash mr-1', clickAction: 'delete' }
        ]
      }
    ],
    mobileRows: [
      {
        type: 'array',
        width: 'col-3',
        content: [
          { type: 'text', path: ['property.title'] }
        ]
      },
      {
        type: 'array',
        width: 'col-3',
        content: [
          { type: 'text', path: ['nbrNight'] },
          { type: 'badge', path: ['status'] },
          { type: 'iconText', path: ['fa fa-users', 'nbrAdultes'] },
        ]
      },
      {
        type: 'array',
        width: 'col-4',
        content: [
          { type: 'amount', label: 'Solde', path: ['balance.value'], currency: 'balance.currency.symbol' },
          { type: 'amount', label: 'Réglé', path: ['adjusted.value'], currency: 'adjusted.currency.symbol' },
          {
            type: 'collapse',
            label: 'détails',
            path: [null],
            getData: (id) => {
              return this.store.select<any>(fromStore.getPaymentsByNomenclature(id, 'Réservation'));
            },
            component: TableComponent
          }
        ]
      },
      {
        type: 'options',
        width: 'col-2',
        content: [
          { type: 'data', title: 'title' },
          { type: 'divider' },
          { type: 'option', title: 'Check in', icon: 'fa fa-sign-in mr-1', clickAction: 'checkin' },
          { type: 'option', title: 'Check out', icon: 'fa fa-sign-out mr-1', clickAction: 'checkin' },
          { type: 'option', title: 'Commentaire', icon: 'fa fa-comment mr-1', clickAction: 'checkin' },
          { type: 'option', title: 'Document', icon: 'fa fa-upload mr-1', clickAction: 'documents' },
          { type: 'divider' },
          { type: 'option', title: 'éditer', icon: 'fa fa-edit mr-1', clickAction: 'edit' },
          { type: 'option', title: 'supprimer', icon: 'fa fa-trash mr-1', clickAction: 'delete' }
        ]
      }
    ]
  };

  headerActions = [
    { title: 'Chercher', type: 'link', icon: 'fa fa-search', clickAction: 'search', displayInMobile: true },
    { title: 'Filtrer', type: 'link', icon: 'fa fa-filter', clickAction: 'filter', displayInMobile: false },
    {
      title: 'Trier', type: 'dropdown', icon: 'fa fa-sort', displayInMobile: false, dropdownItems: [
        {
          title: 'Status',
          action: 'sort',
          value: 'status.value',
          direction: 'asc',
        },
        {
          title: 'Montant',
          action: 'sort',
          value: 'price.value',
          direction: 'asc',
        },
        {
          title: 'Solde',
          action: 'sort',
          value: 'balance.value',
          direction: 'asc',
        },
        {
          title: 'Date',
          action: 'sort',
          value: 'start',
          direction: 'asc',
        },
      ]
    },
    { title: 'Ajouter', type: 'link', icon: 'fa fa-plus', clickAction: 'create', displayInMobile: false },
    {
      title: 'Affichage',
      type: 'toggle',
      icon: 'nb-grid-a',
      clickAction: 'toggleDisplay',
      displayInMobile: false,
      firstIcon: 'nb-grid-a',
      secondIcon: 'fa fa-list'
    },
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

  paymentsSubscription: Subscription;

  /**
   * to do complex object data handling 
   * just provide object and automatic search fields
   */
  searchFields: string[] = ['status.value', 'lodger', 'price.value', 'balance.value'];

  refreshFilters: Subject<any> = new Subject<any>();

  filtersConf: FilterConf;
  sortConf: SortConf[];
  pagination$: Observable<Pagination>;
  loaded$: Observable<boolean>;
  total$: Observable<number>;

  constructor(
    public router: Router,
    public modalService: NgbModal,
    public dataService: ReservationsService,
    public propertyService: PropertyService,
    public paymentService: PaymentService,
    public cdr: ChangeDetectorRef,
    private store: Store<fromStore.LocatusState>
  ) {
    super(router, modalService, cdr, dataService);
  }

  ngOnInit() {
    this.total$ = this.store.select<any>(fromStore.getReservationsCount);
    this.pagination$ = this.store.select<any>(fromStore.getReservationsPagination);
    this.loaded$ = this.store.select<any>(fromStore.getReservationsLoaded);
    this.data = this.store.select<any>(fromStore.getPaginatedSortedFiltredReservations);
    this.resetSort();
    this.filters = this.dataService.initFilters(this.propertyService);
    this.store.dispatch(new fromStore.LoadPayments());
  }

  paginate(pagination: Pagination) {
    this.store.dispatch(new fromStore.LoadReservations({ ...this.filtersConf }, [...this.sortConf], { ...pagination }));
  }

  applyFilters(filters, config) {
    this.filtersConf = { filters, andOperator: true };
    this.store.dispatch(new fromStore.LoadReservations({ ...this.filtersConf }, [...this.sortConf], { page: 1, perPage: 10 }));
  }

  onSearch(filters: FilterConf) {
    this.filtersConf = filters;
    if (filters.filters.length === 0) {
      this.resetFilters();
    }
    this.store.dispatch(new fromStore.LoadReservations({ ...this.filtersConf }, [...this.sortConf], { page: 1, perPage: 10 }));
  }

  sort(element) {
    element.direction = element.direction === 'asc' ? 'desc' : 'asc';
    this.sortConf = [
      {
        field: element.value,
        direction: element.direction
      }
    ];
    this.store.dispatch(new fromStore.LoadReservations({ ...this.filtersConf }, [...this.sortConf], { page: 1, perPage: 10 }));
  }

  delete(item: any) {
    const modalRef = this.modalService.open(DeleteConfirmationComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.type = 'reservation';
    modalRef.componentInstance.title = item.title;
    modalRef.result.then(confirmed => {
      if (confirmed) {
        this.store.dispatch(new fromStore.DeleteReservation(item.id));
      }
    }, (reason) => {

    });
  }

  resetFilters() {
    this.filtersConf = {
      filters: [
        {
          field: 'property',
          search: this.propertyService.currentProperty.id.toString(),
          filter: function (cell: any, search: any) {
            return cell.id.toString() === search
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

  checkin(reservation) {
    const modalRef = this.modalService.open(DialogCheckInComponent, { size: 'lg', container: 'nb-layout' });
  }

  documents(reservation) {
    const modalRef = this.modalService.open(DialogNewDocumentComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.document = {
      id: faker.random.number(),
      title: null,
      description: null,
      type: null,
      createdAt: new Date(),
      file: null,
      owner: {
        type: 'Réservation',
        id: reservation.id,
        title: reservation.title,
        link: '/pages/reservations/' + reservation.id + '/edit'
      }
    };
  }

  settings(event) {
    console.log(event);
  }

}
