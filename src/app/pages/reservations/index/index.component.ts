import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import { PropertyService } from '../../../@core/data/property.service';
import { ReservationsService } from '../../../@core/data/reservations.service';
import { Property } from '../../../@core/data/models/property';
import { Subject } from 'rxjs/Subject';
import { Router, NavigationEnd } from '@angular/router';
import * as dateFns from 'date-fns';
import { DialogCheckInComponent } from '../dialog-check-in/dialog-check-in.component';
import { DeleteConfirmationComponent } from '../../../@theme/components/delete-confirmation/delete-confirmation.component';
import { TableComponent } from '../../payments/table/table.component';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  isSearching = false;

  isFilterCollapsed = true;

  isGridView = false;

  config = {
    header: [
      { title: 'Bien', width: 'col-3' },
      { title: 'Locataire', width: 'col' },
      { title: 'Durée', width: 'col' },
      { title: 'Statut', width: 'col' },
      { title: 'Montant', width: 'col' },
      { title: '', width: 'col-1' }
    ],
    mobileHeader: [
      { title: 'Bien', width: 'col-3' },
      { title: 'Réservation', width: 'col-4' },
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
        width: 'col',
        content: [
          { type: 'text', data: ['lodger.firstname', 'lodger.lastname'] },
          { type: 'text', data: ['lodger.phone'] },
          { type: 'iconText', data: ['fa fa-users', 'nbrAdultes'] },
        ]
      },
      {
        type: 'array',
        width: 'col',
        content: [
          { type: 'date', data: ['startDate', 'endDate'], splitData: true },
          { type: 'text', data: ['nbrNight'] }
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
          { type: 'amount', data: ['amount'], currency: '$' },
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
          { type: 'text', data: ['property.title'] }
        ]
      },
      {
        type: 'array',
        width: 'col-4',
        content: [
          { type: 'text', data: ['nbrNight'] },
          { type: 'badge', data: ['status'] },
          { type: 'iconText', data: ['fa fa-users', 'nbrAdultes'] },
        ]
      },
      {
        type: 'array',
        width: 'col-3',
        content: [
          { type: 'amount', data: ['amount'], currency: '$' },
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

  currentProperty = this.propertyService.currentProperty;

  data: any = [];

  source: LocalDataSource = new LocalDataSource();

  searchFields = ['status', 'lodger.firstname', 'lodger.lastname'];

  withFilters = false;

  constructor(private router: Router, private modalService: NgbModal, private reservationsService: ReservationsService, public propertyService: PropertyService) { }

  ngOnInit() {
    if (this.currentProperty !== null) {
      this.source = this.reservationsService.getPropertyReservations(this.currentProperty);
    }
    this.source.setFilter([]);
    this.source.onChanged().subscribe(value => {
      this.data = [];
      value.elements.map((reservation) => {
        reservation.property = this.currentProperty;
        reservation.nbrNight = dateFns.differenceInDays(reservation.endDate, reservation.startDate) + ' nuitées';
        this.data.push(reservation);
      });
    });
    this.propertyService.refreshCurrentProperty.subscribe(property => {
      if (property !== null) {
        this.currentProperty = property;
        this.source.load(this.currentProperty.reservations);
      } else {
        this.source.load([]);
      }
    });
    this.reservationsService.refresh.subscribe(source => {
      this.source = source;
    });
  }

  handleHeaderEvent(event) {
    this[event.action]();
  }

  handleReservationEvent(event) {
    this[event.action](event.attribute);
  }

  checkin(reservation) {
    const modalRef = this.modalService.open(DialogCheckInComponent, { size: 'lg', container: 'nb-layout' });
  }

  edit(reservation) {
    this.router.navigateByUrl('/pages/reservations/' + reservation.id + '/edit');
  }

  documents(reservation) {
    this.router.navigateByUrl('/pages/documents/reservations/' + reservation.id + '/documents');
  }

  delete(reservation) {
    const modalRef = this.modalService.open(DeleteConfirmationComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.type = 'reservation';
    modalRef.componentInstance.title = reservation.title;
    modalRef.result.then(confirmed => {
      if (confirmed) {
        this.reservationsService.remove(reservation, this.propertyService.currentProperty);
      }
    }, (reason) => {

    });
  }

  handleDropdownEvent(event) {
    this[event.item.action](event.item);
  }

  toggleDisplay() {
    this.isGridView = !this.isGridView;
  }

  sort(element) {
    element.direction = element.direction === 'asc' ? 'desc' : 'asc';
    this.source.setSort([
      {
        field: element.value,
        direction: element.direction
      }
    ]);
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
    this.router.navigateByUrl('/pages/reservations/create');
  }

  hasFilters(filters) {
    const w = filters.filter(f => {
      return f.search !== '';
    });
    this.withFilters = w.length === 0 ? false : true;
  }

}
