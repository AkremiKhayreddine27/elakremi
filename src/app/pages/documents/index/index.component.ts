import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import { PropertyService } from '../../../@core/data/property.service';
import { ReservationsService } from '../../../@core/data/reservations.service';
import { DocumentsService } from '../../../@core/data/documents.service';
import { DialogNewDocumentComponent } from '../document-form/document-form.component';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  isSearching = false;

  isFilterCollapsed = true;

  data: LocalDataSource = new LocalDataSource();
  documents = [];
  total;
  paging;

  private id;

  private reservation;

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
          { type: 'iconImageText', data: ['format', 'title'] },
        ]
      },
      {
        type: 'array',
        width: 'col-2',
        content: [
          { type: 'text', data: ['type'] }
        ]
      },
      {
        type: 'array',
        width: 'col-2',
        content: [
          { type: 'date', data: ['createdAt'] }
        ]
      },
      {
        type: 'array',
        width: 'col-4',
        content: [
          { type: 'text', data: ['owner.title'] },
          { type: 'badge', data: ['owner.type'] }
        ]
      },
      {
        type: 'options',
        width: 'col-1',
        content: [
          { type: 'option', title: 'Télécharger', icon: 'fa fa-download mr-1', clickAction: 'download' },
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
          { type: 'iconImageText', data: ['format', 'title'] },
        ]
      },
      {
        type: 'array',
        width: 'col-3',
        content: [
          { type: 'text', data: ['type'] },
          { type: 'badge', data: ['owner.type'] },
        ]
      },
      {
        type: 'array',
        width: 'col-4',
        content: [
          { type: 'text', data: ['owner.title'] }
        ]
      },
      {
        type: 'options',
        width: 'col-1',
        content: [
          { type: 'option', title: 'Document', icon: 'fa fa-upload mr-1', clickAction: 'documents' },
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

  searchFields = ['title', 'description', 'type'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private documentsService: DocumentsService,
    private propertyService: PropertyService,
    private reservationsService: ReservationsService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.reservation;
    if (this.id) {
      this.reservation = this.reservationsService.getReservation(this.propertyService.currentProperty, this.id);
      this.documents = this.reservation.documents;
    } else {
      this.data.load(this.documentsService.getPropertyDocuments(this.propertyService.currentProperty));
      this.data.setPaging(1, 12);
      this.data.setPage(1);
      this.data.onChanged().subscribe(value => {
        if (value.action === 'load') {
          this.total = value.elements.length;
        }
        this.paging = value.paging;
        this.documents = [];
        value.elements.map((reservation) => {
          this.documents.push(reservation);
        });
      });
      this.propertyService.refreshCurrentProperty.subscribe(property => {
        this.data.load(this.documentsService.getPropertyDocuments(property));
      });
    }
  }


  handleHeaderEvent(event) {
    this[event.action]();
  }

  handleDropdownEvent(event) {
    this[event.item.action](event.item);
  }

  search() {
    this.isSearching = !this.isSearching;
    this.isFilterCollapsed = true;
  }

  sort(element) {
    element.direction = element.direction === 'asc' ? 'desc' : 'asc';
    this.data.setSort([
      {
        field: element.value,
        direction: element.direction
      }
    ]);
  }

  create() {
    const modalRef = this.modalService.open(DialogNewDocumentComponent, { size: 'lg', container: 'nb-layout' });
  }

}
