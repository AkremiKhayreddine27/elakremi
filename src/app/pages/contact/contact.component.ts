import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ContactsService } from './../../@core/data/contacts.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DialogNewContactComponent } from './contact-form/contact-form.component';
import { DeleteConfirmationComponent, SendNotificationComponent } from '../../@theme/components';
@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  headerActions = [
    { title: 'add', type: 'link', icon: 'fa fa-plus', clickAction: 'create', displayInMobile: true },
  ];

  contacts = [];

  lodgers = [];

  owners = [];

  serviceProviders = [];

  constructor(private contactsService: ContactsService, private modalService: NgbModal) { }

  ngOnInit() {
    this.contactsService.getLodgers().subscribe(lodger => {
      this.lodgers.push(lodger);
    });
    this.contactsService.getOwners().subscribe(owner => {
      this.owners.push(owner);
    });
    this.contactsService.getServiceProviders().subscribe(serviceProvider => {
      this.serviceProviders.push(serviceProvider);
    });
    this.contactsService.contactAdded.subscribe((contact: any) => {
      switch (contact.role) {
        case 'locataire':
          this.lodgers.push(contact);
          break;
        case 'propriétaire':
          this.owners.push(contact);
          break;
        case 'prestataire de service':
          this.serviceProviders.push(contact);
          break;
      }
    });
    this.contactsService.contactDeleted.subscribe((contact: any) => {
      switch (contact.role) {
        case 'locataire':
          this.lodgers = this.lodgers.filter(c => {
            return c.id !== contact.id;
          });
          break;
        case 'propriétaire':
          this.owners = this.owners.filter(c => {
            return c.id !== contact.id;
          });
          break;
        case 'prestataire de service':
          this.serviceProviders = this.serviceProviders.filter(c => {
            return c.id !== contact.id;
          });
          break;
      }
    });
  }

  handleHeaderEvent(event) {
    this[event.action]();
  }

  create() {
    const modalRef = this.modalService.open(DialogNewContactComponent, { size: 'lg', container: 'nb-layout' });
  }

  edit(contact) {
    const modalRef = this.modalService.open(DialogNewContactComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.contact = contact;
  }

  sendMail(contact) {
    const modalRef = this.modalService.open(SendNotificationComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.title = 'Envoyer un message';
    modalRef.componentInstance.mail = {
      recipient: contact,
      object: '',
      content: ''
    };
  }

  sendInvitation(contact) {
    const modalRef = this.modalService.open(SendNotificationComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.title = 'Envoyer un message';
    modalRef.componentInstance.mail = {
      recipient: contact,
      object: 'Invitation pour rejoindre Easy-Locatus',
      content: contact.firstname + ' vous a envoyé une invitation à joindre Easy-Locatus.'
    };
  }

  delete(contact) {
    const modalRef = this.modalService.open(DeleteConfirmationComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.type = 'contact';
    modalRef.componentInstance.title = contact.firstname + ' ' + contact.lastname;
    modalRef.result.then(confirmed => {
      if (confirmed) {
        this.contactsService.remove(contact);
      }
    }, (reason) => {

    });
  }

}
