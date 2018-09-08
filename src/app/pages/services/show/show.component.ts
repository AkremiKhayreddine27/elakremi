import { Component, OnInit, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServicesService } from '../../../@core/data';
import { PropertyService } from '../../../@core/data';
import { PaymentService } from '../../../@core/data';
import { Property, Service } from '../../../@core/data/models';
import { TableComponent } from '../../payments/table/table.component';
import { DialogNewDocumentComponent } from '../../documents/document-form/document-form.component';
import * as faker from 'faker';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { LocatusAbstractComponent } from '../../../@core/utils/locatusComponent.abstract';
import { Payment } from '../../../@core/data/models/payment';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../../store';
import { Pagination, FilterConf, SortConf } from '../../../store/helpers';

@Component({
  selector: 'show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent extends LocatusAbstractComponent implements OnInit, AfterViewInit, OnDestroy {

  public url: string = '/pages/categories/services';

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
          title: 'Date',
          action: 'sort',
          value: 'start',
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

  config = {
    header: [
      { title: 'Bien', width: 'col-3' },
      { title: 'Prestataire', width: 'col-2' },
      { title: 'Durée', width: 'col' },
      { title: 'Catégorie', width: 'col' },
      { title: 'Statut', width: 'col' },
      { title: 'Montant', width: 'col' },
      { title: '', width: 'col-1' }
    ],
    mobileHeader: [
      { title: 'Bien', width: 'col-3' },
      { title: 'Service', width: 'col-4' },
      { title: 'Montant', width: 'col-3' },
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
        width: 'col-2',
        content: [
          { type: 'text', path: ['provider.firstname', 'provider.lastname'] },
          { type: 'text', path: ['provider.phone'] }
        ]
      },
      {
        type: 'array',
        width: 'col',
        content: [
          { type: 'date', path: ['start', 'end'], splitData: true }
        ]
      },
      {
        type: 'array',
        width: 'col',
        content: [
          { type: 'text', path: ['category.title'] },
          { type: 'text', path: ['type.title'] }
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
          { type: 'amount', path: ['price.value'], currency: 'price.currency.symbol' },
          {
            type: 'collapse',
            label: 'détails',
            path: [null],
            getData: (id) => {
              return this.store.select<any>(fromStore.getPaymentsByNomenclature(id, 'Service'));
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
          { type: 'option', title: 'Document', icon: 'fa fa-upload mr-1', clickAction: 'documents' },
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
        width: 'col-4',
        content: [
          { type: 'date', path: ['start', 'end'], splitData: true },
          { type: 'text', path: ['provider.firstname', 'provider.lastname'] },
          { type: 'badge', path: ['status'] }
        ]
      },
      {
        type: 'array',
        width: 'col-3',
        content: [
          { type: 'amount', path: ['price.value'], currency: 'price.currency.symbol' },
          {
            type: 'collapse',
            label: 'détails',
            path: [null],
            getData: (id) => {
              return this.store.select<any>(fromStore.getPaymentsByNomenclature(id, 'Service'));
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
          { type: 'option', title: 'Document', icon: 'fa fa-upload mr-1', clickAction: 'documents' },
          { type: 'option', title: 'éditer', icon: 'fa fa-edit mr-1', clickAction: 'edit' },
          { type: 'option', title: 'supprimer', icon: 'fa fa-trash mr-1', clickAction: 'delete' }
        ]
      }
    ]
  };

  public categories;

  public category: any;

  public subCategories = [];

  public subCategory: any;

  refreshFilters: Subject<any> = new Subject();

  paymentsSubscription: Subscription;

  searchFields: string[] = ['status.value', 'provider', 'price.value'];

  filtersConf: FilterConf;
  sortConf: SortConf[];
  pagination$: Observable<Pagination>;
  loaded$: Observable<boolean>;
  total$: Observable<number>;

  constructor(
    public cdRef: ChangeDetectorRef,
    public router: Router,
    public dataService: ServicesService,
    public route: ActivatedRoute,
    public modalService: NgbModal,
    public cdr: ChangeDetectorRef,
    public paymentService: PaymentService,
    public propertyService: PropertyService,
    private store: Store<fromStore.LocatusState>) {
    super(router, modalService, cdr, dataService);
  }

  ngOnInit() {
    this.total$ = this.store.select<any>(fromStore.getServicesCount);
    this.pagination$ = this.store.select<any>(fromStore.getServicesPagination);
    this.loaded$ = this.store.select<any>(fromStore.getServicesLoaded);
    this.data = this.store.select<any>(fromStore.getPaginatedSortedFiltredServices);
    this.resetSort();
    this.filters = this.dataService.initFilters(this.propertyService);
    this.store.dispatch(new fromStore.LoadPayments());
  }

  ngOnDestroy() {
    this.dataService.setCurrentType(null);
    this.dataService.setCurrentCategory(null);
  }


  paginate(pagination: Pagination) {
    this.store.dispatch(new fromStore.LoadServices({ ...this.filtersConf }, [...this.sortConf], { ...pagination }));
  }

  applyFilters(filters, config) {
    console.log('filters');
    this.filtersConf = { filters, andOperator: true };
    this.store.dispatch(new fromStore.LoadServices({ ...this.filtersConf }, [...this.sortConf], { page: 1, perPage: 10 }));
  }

  onSearch(filters: FilterConf) {
    this.filtersConf = filters;
    if (filters.filters.length === 0) {
      this.resetFilters();
    }
    this.store.dispatch(new fromStore.LoadServices({ ...this.filtersConf }, [...this.sortConf], { page: 1, perPage: 10 }));
  }

  sort(element) {
    element.direction = element.direction === 'asc' ? 'desc' : 'asc';
    this.sortConf = [
      {
        field: element.value,
        direction: element.direction
      }
    ];
    this.store.dispatch(new fromStore.LoadServices({ ...this.filtersConf }, [...this.sortConf], { page: 1, perPage: 10 }));
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

  onCategoryChange(category) {
    this.filters = this.filters.map(filter => {
      if (filter.name === 'type') {
        filter.element = null;
        if (category) {
          filter.elements = of(this.dataService.getTypes(category.id)).pipe(delay(500));
        } else {
          filter.elements = of([]).pipe(delay(500));
        }
      }
      return filter;
    });
    this.refreshFilters.next(this.filters);
  }

  documents(service) {
    const modalRef = this.modalService.open(DialogNewDocumentComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.document = {
      id: faker.random.number(),
      title: null,
      description: null,
      type: null,
      createdAt: new Date(),
      file: null,
      owner: {
        type: 'Service',
        id: service.id,
        title: service.title,
        serviceCategory: service.type.subCategory,
        serviceType: service.type.slug,
        link: '/pages/categories/services/' + service.id + '/edit'
      }
    };
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }
}
