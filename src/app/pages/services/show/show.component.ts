import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/Subscription';
import * as dateFns from 'date-fns';
import { LocalDataSource } from 'ng2-smart-table';
import { ServicesService } from '../../../@core/data/services.service';
import { PropertyService } from '../../../@core/data/property.service';
import { Property } from '../../../@core/data/models/property';
import { TableComponent } from '../../payments/table/table.component';
import { DeleteConfirmationComponent } from '../../../@theme/components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {


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
          { type: 'imageText', data: ['property.images', 'property.title'] }
        ]
      },
      {
        type: 'array',
        width: 'col-2',
        content: [
          { type: 'text', data: ['provider.firstname', 'provider.lastname'] },
          { type: 'text', data: ['provider.phone'] }
        ]
      },
      {
        type: 'array',
        width: 'col',
        content: [
          { type: 'date', data: ['startDate', 'endDate'], splitData: true }
        ]
      },
      {
        type: 'array',
        width: 'col',
        content: [
          { type: 'text', data: ['type.subCategory.title'] },
          { type: 'text', data: ['type.title'] }
        ]
      },
      {
        type: 'badge',
        width: 'col',
        content: [
          { type: 'badge', data: ['status'] }
        ]
      },
      {
        type: 'array',
        width: 'col',
        content: [
          { type: 'amount', data: ['tariff.amount'], currency: '$' },
          { type: 'badge', data: ['paymentStatus'] },
          { type: 'collapse', data: ['détails'], component: TableComponent }
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
          { type: 'text', data: ['property.title'] }
        ]
      },
      {
        type: 'array',
        width: 'col-4',
        content: [
          { type: 'date', data: ['startDate', 'endDate'], splitData: true },
          { type: 'text', data: ['provider.firstname', 'provider.lastname'] },
          { type: 'badge', data: ['status'] }
        ]
      },
      {
        type: 'array',
        width: 'col-3',
        content: [
          { type: 'amount', data: ['tariff.amount'], currency: '$' },
          { type: 'badge', data: ['paymentStatus'] },
          { type: 'collapse', data: ['détails'], component: TableComponent }
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

  isFilterCollapsed = true;

  isSearching = false;

  isGrid = false;

  refreshSubscription: Subscription;

  public statuses: any[] = [
    { text: 'All', value: '' },
    { text: 'provisional', value: 'provisional' },
    { text: 'canceled', value: 'canceled' },
    { text: 'confirmed', value: 'confirmed' },
    { text: 'completed', value: 'completed' }
  ];

  currentStatusFilter = this.statuses[0];

  public payementStatus: string[] = [
    'payé',
    'rembourser',
    'annulé',
  ];

  data: any = [];

  source: LocalDataSource = new LocalDataSource();

  withFilters = false;

  constructor(private router: Router, private servicesService: ServicesService, private route: ActivatedRoute, private modalService: NgbModal, public propertyService: PropertyService) { }

  ngOnInit() {
    if (this.propertyService.currentProperty) {
      this.source = this.servicesService.getAllPropertyServices(this.propertyService.currentProperty);
    }
    this.source.setFilter([]);
    this.source.onChanged().subscribe(value => {
      this.data = [];
      value.elements.map((service) => {
        service.property = {};
        service.property = this.propertyService.currentProperty;
        this.data.push(service);
      });
    });
    this.servicesService.refresh.subscribe(services => {
      this.source.refresh();
      this.source.getElements().then(data => {
        this.data = data;
      });
    });

    this.servicesService.serviceCreated.subscribe(service => {
      service.isNew = true;
      this.source.refresh();
      console.log(this.source);
      this.data.push(service);
      console.log(this.data);
    });

    this.propertyService.refresh.subscribe(value => {
      this.source.refresh();
      this.source.getElements().then(data => {
        this.data = data;
      });
    });

    this.propertyService.refreshCurrentProperty.subscribe(property => {
      if (property) {
        this.source = this.servicesService.getAllPropertyServices(this.propertyService.currentProperty);
      }
    });
  }

  handleHeaderEvent(event) {
    this[event.action]();
  }

  handleServiceEvent(event) {
    this[event.action](event.attribute);
  }

  edit(service) {
    this.router.navigateByUrl('/pages/categories/services/' + service.id + '/edit');
  }

  documents(service) {
    this.router.navigateByUrl('/pages/documents/services/' + service.id + '/documents');
  }

  delete(service) {
    const modalRef = this.modalService.open(DeleteConfirmationComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.type = 'reservation';
    modalRef.componentInstance.title = service.title;
    modalRef.result.then(confirmed => {
      if (confirmed) {
        this.servicesService.remove(service, this.propertyService.currentProperty);
      }
    }, (reason) => {

    });
  }

  search() {
    this.isSearching = !this.isSearching;
    this.isFilterCollapsed = true;
  }

  filter() {
    this.isFilterCollapsed = !this.isFilterCollapsed;
    this.isSearching = false;
  }

  openDialog(action) {
    this[action]();
  }

  import() {
    console.log('import');
  }

  create() {
    this.router.navigateByUrl('/pages/categories/create');
  }

  onSearch(query: string = '') {
    if (query !== '') {
      this.source.setFilter([
        {
          field: 'property',
          search: query
        },
        {
          field: 'startDate',
          search: query
        },
        {
          field: 'endDate',
          search: query
        },
        {
          field: 'lodger',
          search: query,
          filter: (cell: any, search: string) => {
            if (cell.firstname.toLowerCase().indexOf(search) !== -1 ||
              cell.lastname.toLowerCase().indexOf(search) !== -1 ||
              cell.email.toLowerCase().indexOf(search) !== -1 ||
              cell.phone.toLowerCase().indexOf(search) !== -1) {
              return true;
            } else {
              return false;
            }
          }
        },
        {
          field: 'status',
          search: this.currentStatusFilter === '' ? this.currentStatusFilter : query,
          filter: (cell: any, search: string) => {
            if (cell.indexOf(search) !== -1) {
              return true;
            } else {
              return false;
            }
          }
        }
      ], false);
    } else {
      this.source.setFilter([]);
    }
  }

  hasFilters(filters) {
    const w = filters.filter(f => {
      return f.search !== '';
    });
    this.withFilters = w.length === 0 ? false : true;
  }
}
