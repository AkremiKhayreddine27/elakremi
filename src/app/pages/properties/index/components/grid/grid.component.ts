import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from '../../../../../@core/data/property.service';
import { ServicesService } from '../../../../../@core/data/services.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmationComponent } from '../../../../../@theme/components/delete-confirmation/delete-confirmation.component';
import { MobileDropdownComponent } from '../../../../../@theme/components/mobile-dropdown/mobile-dropdown.component';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  @Input() properties;

  options: any[] = [
    { type: 'data', title: 'title', clickAction: 'show' },
    { type: 'divider' },
    { type: 'option', title: 'Réservations', icon: 'fa fa-clock-o mr-1', clickAction: 'navigateToReservations' },
    { type: 'option', title: 'Services', icon: 'fa fa-gear mr-1', clickAction: 'navigateToServices' },
    { type: 'option', title: 'Calendriers', icon: 'fa fa-calendar mr-1', clickAction: 'navigateToCalendars' },
    { type: 'option', title: 'Finances', icon: 'fa fa-bar-chart mr-1', clickAction: 'navigateToFinances' },
    { type: 'divider' },
    { type: 'option', title: 'éditer', icon: 'fa fa-edit mr-1', clickAction: 'edit' },
    { type: 'option', title: 'supprimer', icon: 'fa fa-trash mr-1', clickAction: 'delete' }
  ];

  constructor(private service: PropertyService, private servicesService: ServicesService, private modalService: NgbModal, private router: Router) { }

  ngOnInit() {

  }

  showDropdown(property) {
    const modalRef = this.modalService.open(MobileDropdownComponent, { windowClass: 'mobile-dropdown', size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.options = this.options;
    modalRef.componentInstance.data = property;
    modalRef.result.then(result => {
      this.handleAction(result.action, property);
    }, (reason) => {

    });
  }

  handleAction(action, property) {
    this[action](property);
  }

  show(property) {
    this.router.navigate(['/pages/properties/' + property.id]);
  }

  navigateToReservations(property) {
    this.service.setCurrentProperty(property);
    this.router.navigate(['/pages/reservations']);
  }

  navigateToServices(property) {
    this.service.setCurrentProperty(property);
    this.router.navigate(['/pages/categories/services']);
  }

  navigateToCalendars(property) {
    this.service.setCurrentProperty(property);
    this.router.navigate(['/pages/calendars']);
  }

  navigateToFinances(property) {
    this.service.setCurrentProperty(property);
    this.router.navigate(['/pages/finances']);
  }

  edit(property) {
    this.router.navigate(['/pages/properties/' + property.id]);
  }

  delete(property) {
    const modalRef = this.modalService.open(DeleteConfirmationComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.type = 'bien';
    modalRef.componentInstance.title = property.title;
    modalRef.result.then(confirmed => {
      if (confirmed) {
        this.service.remove(property);
      }
    }, (reason) => {

    });
  }

  navigate(link, property) {
    this.service.setCurrentProperty(property);
    this.router.navigate(['/pages/' + link]);
  }
}
