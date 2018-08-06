import { Component, OnInit, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServicesService } from '../../../@core/data/services.service';
import { PropertyService } from '../../../@core/data/property.service';
import { PaymentService } from '../../../@core/data/payment.service';
import { Property, Service } from '../../../@core/data/models';
import { TableComponent } from '../../payments/table/table.component';
import { DialogNewDocumentComponent } from '../../documents/document-form/document-form.component';
import * as faker from 'faker';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { LocatusAbstractComponent } from '../../../@core/utils/locatusComponent.abstract';
import { Payment } from '../../../@core/data/models/payment';

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
          value: 'status',
          direction: 'asc',
        },
        {
          title: 'Montant',
          action: 'sort',
          value: 'amount',
          direction: 'asc',
        },
        {
          title: 'Date',
          action: 'sort',
          value: 'startDate',
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
          { type: 'collapse', label: 'détails', nomenclature: 'Service', path: ['payments'], component: TableComponent }
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
          { type: 'collapse', label: 'détails', nomenclature: 'Service', path: ['payments'], component: TableComponent }
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

  constructor(
    public cdRef: ChangeDetectorRef,
    public router: Router,
    public dataService: ServicesService,
    public route: ActivatedRoute,
    public modalService: NgbModal,
    public cdr: ChangeDetectorRef,
    public paymentService: PaymentService,
    public propertyService: PropertyService) {
    super(router, modalService, cdr, dataService);
  }

  ngOnInit() {
    this.filters = this.dataService.initFilters(this.propertyService);
    this.source.load(this.dataService.all());
    this.dataService.initSort(this.source);
    this.detectSourceChanges();
    this.detectPaymentsChanges();
    this.detectPropertyChanges();
  }

  ngOnDestroy() {
    this.dataService.setCurrentType(null);
    this.dataService.setCurrentCategory(null);
  }

  detectSourceChanges() {
    this.sourceSubscription = this.source.onChanged().subscribe(value => {
      this.data = of(value.elements.map((service: Service) => {
        service.payments = this.paymentService.findByAndBy({ 'nomenclature.id': service.id, 'nomenclature.type': 'Service' }).sort((a: Payment, b: Payment) => {
          return b.deadlineDate - a.deadlineDate;
        });
        return service;
      })).pipe(delay(5));
    });
  }

  detectPaymentsChanges() {
    this.paymentsSubscription = this.paymentService.onChanged().subscribe((payment: Payment) => {
      this.source.load(this.dataService.all());
    })
  }

  detectPropertyChanges() {
    this.propertyService.refreshCurrentProperty.subscribe(property => {
      if (property !== null) {
        this.filters = this.filters.map(filter => {
          if (filter.name === 'property') {
            filter.element = { id: property.id, value: property.title };
          }
          return filter;
        });
        this.refreshFilters.next(this.filters);
      } else {
        this.source.load([]);
      }
    });
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
