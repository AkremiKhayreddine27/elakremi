import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {
  PropertyService,
  DocumentsService
} from '@core/data';

import { DialogNewDocumentComponent } from '../document-form/document-form.component';
import { SendNotificationComponent } from '../../../@theme/components';
import { FileComponent } from '../file/file.component';
import { LocatusAbstractComponent } from '@core/utils/locatusComponent.abstract';
import { Document } from '@core/data/models';

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

  config = {
    header: [
      { title: 'Nom', width: 'col-3' },
      { title: 'Type', width: 'col-2' },
      { title: 'Date', width: 'col-2' },
      { title: 'Catégorie', width: 'col-4' },
      { title: '', width: 'col-1' }
    ],
    mobileHeader: [
      { title: 'Nom', width: 'col-4' },
      { title: 'Type', width: 'col-3' },
      { title: 'Catégorie', width: 'col-4' },
      { title: '', width: 'col-1' }
    ],
    rows: [
      {
        type: 'array',
        width: 'col-3',
        content: [
          { type: 'iconImageText', path: ['file.type', 'title'] },
          { type: 'collapse', label: 'file.name', path: ['file'], component: FileComponent }
        ]
      },
      {
        type: 'array',
        width: 'col-2',
        content: [
          { type: 'text', path: ['type.value'] }
        ]
      },
      {
        type: 'array',
        width: 'col-2',
        content: [
          { type: 'date', path: ['createdAt'] }
        ]
      },
      {
        type: 'array',
        width: 'col-4',
        content: [
          { type: 'link', path: ['nomenclature.title'], link: 'nomenclatureLink' },
          { type: 'badge', path: ['nomenclatureType'] }
        ]
      },
      {
        type: 'options',
        width: 'col-1',
        content: [
          { type: 'option', title: 'Télécharger', icon: 'fa fa-download mr-1', clickAction: 'download' },
          { type: 'option', title: 'Partager', icon: 'fa fa-share mr-1', clickAction: 'share' },
          { type: 'option', title: 'éditer', icon: 'fa fa-edit mr-1', clickAction: 'edit' },
          { type: 'option', title: 'supprimer', icon: 'fa fa-trash mr-1', clickAction: 'delete' }
        ]
      }
    ],
    mobileRows: [
      {
        type: 'array',
        width: 'col-4',
        content: [
          { type: 'iconImageText', path: ['file.type', 'title'] },
          { type: 'collapse', label: 'file.name', path: ['file'], component: FileComponent }
        ]
      },
      {
        type: 'array',
        width: 'col-3',
        content: [
          { type: 'text', path: ['type.value'] },
          { type: 'badge', path: ['nomenclatureType'] },
        ]
      },
      {
        type: 'array',
        width: 'col-4',
        content: [
          { type: 'text', path: ['nomenclature.title'] }
        ]
      },
      {
        type: 'options',
        width: 'col-1',
        content: [
          { type: 'option', title: 'Télécharger', icon: 'fa fa-download mr-1', clickAction: 'download' },
          { type: 'option', title: 'Partager', icon: 'fa fa-share mr-1', clickAction: 'share' },
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
          title: 'Titre',
          action: 'sort',
          value: 'title',
          direction: 'asc',
        },
        {
          title: 'Type',
          action: 'sort',
          value: 'type.value',
          direction: 'asc',
        },
        {
          title: 'Date',
          action: 'sort',
          value: 'createdAt',
          direction: 'asc',
        },
        {
          title: 'Catégory',
          action: 'sort',
          value: 'nomenclature.title',
          direction: 'asc',
        }
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


  searchFields = ['title', 'description', 'type.value', 'nomenclatureType.value'];

  properties;

  filtersConf: FilterConf;
  sortConf: SortConf[];
  pagination$: Observable<Pagination>;
  loaded$: Observable<boolean>;
  total$: Observable<number>;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public modalService: NgbModal,
    public dataService: DocumentsService,
    private propertyService: PropertyService,
    public cdr: ChangeDetectorRef,
    private store: Store<fromStore.LocatusState>
  ) {
    super(router, modalService, cdr, dataService);
  }

  ngOnInit() {
    this.total$ = this.store.select<any>(fromStore.getDocumentsCount);
    this.pagination$ = this.store.select<any>(fromStore.getDocumentsPagination);
    this.loaded$ = this.store.select<any>(fromStore.getDocumentsLoaded);
    this.data = this.store.select<any>(fromStore.getAllDocuments);
    this.resetFilters();
    this.resetSort();
    this.store.dispatch(new fromStore.LoadDocuments(this.filtersConf, this.sortConf, { page: 1, perPage: 10 }));
    this.filters = this.dataService.initFilters(this.propertyService);
  }

  paginate(pagination: Pagination) {
    this.store.dispatch(new fromStore.LoadDocuments({ ...this.filtersConf }, [...this.sortConf], { ...pagination }));
  }

  applyFilters(filters, config) {
    this.filtersConf = { filters, andOperator: true };
    this.store.dispatch(new fromStore.LoadDocuments({ ...this.filtersConf }, [...this.sortConf], { page: 1, perPage: 10 }));
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

  onSearch(filters: FilterConf) {
    this.filtersConf = filters;
    if (filters.filters.length === 0) {
      this.resetFilters();
    }
    this.store.dispatch(new fromStore.LoadDocuments({ ...this.filtersConf }, [...this.sortConf], { page: 1, perPage: 10 }));
  }

  sort(element) {
    element.direction = element.direction === 'asc' ? 'desc' : 'asc';
    this.sortConf = [
      {
        field: element.value,
        direction: element.direction
      }
    ];
    this.store.dispatch(new fromStore.LoadDocuments({ ...this.filtersConf }, [...this.sortConf], { page: 1, perPage: 10 }));
  }

  resetSort() {
    this.sortConf = [{
      field: 'createdAt',
      direction: 'desc',
    }];
  }

  create() {
    const modalRef = this.modalService.open(DialogNewDocumentComponent, { size: 'lg', container: 'nb-layout' });
  }

  share(document) {
    const modalRef = this.modalService.open(SendNotificationComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.title = 'Partager le document ' + document.title;
    modalRef.componentInstance.mail = {
      recipients: [],
      object: '',
      content: '',
      files: [document.file]
    };
  }

  edit(document) {
    const modalRef = this.modalService.open(DialogNewDocumentComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.document = document;
  }

}
