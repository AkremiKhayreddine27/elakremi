import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PropertyService } from '../../../@core/data/property.service';
import { ReservationsService } from '../../../@core/data/reservations.service';
import { DocumentsService } from '../../../@core/data/documents.service';
import { DialogNewDocumentComponent } from '../document-form/document-form.component';
import { SendNotificationComponent } from '../../../@theme/components';
import { FileComponent } from '../file/file.component';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';
import { LocatusAbstractComponent } from '../../../@core/utils/locatusComponent.abstract';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
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
          value: 'type',
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
          value: 'owner.title',
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


  searchFields = ['title', 'description', 'owner.title', 'file.name'];

  properties;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public modalService: NgbModal,
    public dataService: DocumentsService,
    private propertyService: PropertyService,
    private reservationsService: ReservationsService,
    public cdr: ChangeDetectorRef
  ) {
    super(router, modalService, cdr, dataService);
  }

  ngOnInit() {
    this.source.load(this.dataService.all());
    this.detectSourceChanges();
    this.filters = this.dataService.initFilters(this.propertyService);
    this.dataService.initSort(this.source);
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
