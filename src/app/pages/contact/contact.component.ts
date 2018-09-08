import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ContactsService } from '../../@core/data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogNewContactComponent } from './contact-form/contact-form.component';

@Component({
  selector: 'contacts',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  tabs: any[] = [
    {
      title: 'Locataires',
      route: '/pages/contacts/lodgers',
    },
    {
      title: 'Propriétaires',
      route: '/pages/contacts/owners',
    },
    {
      title: 'Prestataires de services',
      route: '/pages/contacts/providers',
    },
  ];

  headerActions = [
    { title: 'add', type: 'link', icon: 'fa fa-plus', clickAction: 'create', displayInMobile: true },
  ];

  constructor(
    public router: Router,
    public cdr: ChangeDetectorRef,
    public dataService: ContactsService,
    public modalService: NgbModal) {

  }

  ngOnInit() {

  }

  handleAction(action, payment) {
    this[action](payment);
  }

  handleHeaderEvent(event) {
    this[event.action]();
  }

  create() {
    const modalRef = this.modalService.open(DialogNewContactComponent, { size: 'lg', container: 'nb-layout' });
  }

}
