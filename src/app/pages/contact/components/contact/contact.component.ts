import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactsService } from '../../../../@core/data/contacts.service';
import { DialogNewContactComponent } from '../../contact-form/contact-form.component';
import { DeleteConfirmationComponent, SendNotificationComponent } from '../../../../@theme/components';
import { MobileDropdownComponent } from '../../../../@theme/components/mobile-dropdown/mobile-dropdown.component';
@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @Input() contact;

  options: any[] = [
    { type: 'data', title: 'firstname+lastname', clickAction: 'show' },
    { type: 'divider' },
    { type: 'option', title: 'inviter', icon: 'ion ion-ios-personadd-outline ml-1 mr-2', clickAction: 'sendInvitation' },
    { type: 'option', title: 'envoyer un message', icon: 'nb-email mr-1', clickAction: 'sendMail' },
    { type: 'divider' },
    { type: 'option', title: 'éditer', icon: 'fa fa-edit mr-1', clickAction: 'edit' },
    { type: 'option', title: 'supprimer', icon: 'fa fa-trash mr-1', clickAction: 'delete' }
  ];

  constructor(public dataService: ContactsService, public modalService: NgbModal) { }

  ngOnInit() {

  }

  showDropdown(user) {
    const modalRef = this.modalService.open(MobileDropdownComponent, { windowClass: 'mobile-dropdown', size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.options = this.options;
    modalRef.componentInstance.data = user;
    modalRef.result.then(result => {
      this.handleAction(result.action, user);
    }, (reason) => {

    });
  }

  handleAction(action, payment) {
    this[action](payment);
  }

  edit(contact) {
    const modalRef = this.modalService.open(DialogNewContactComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.contact = contact;
  }

  sendMail(contact) {
    const modalRef = this.modalService.open(SendNotificationComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.title = 'Envoyer un message';
    modalRef.componentInstance.mail = {
      recipients: [contact],
      object: '',
      content: '',
      files: []
    };
  }

  sendInvitation(contact) {
    const modalRef = this.modalService.open(SendNotificationComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.title = 'Envoyer un message';
    modalRef.componentInstance.mail = {
      recipients: [contact],
      object: 'Invitation pour rejoindre Easy-Locatus',
      content: contact.firstname + ' vous a envoyé une invitation à joindre Easy-Locatus.',
      files: []
    };
  }

  delete(contact) {
    const modalRef = this.modalService.open(DeleteConfirmationComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.type = 'contact';
    modalRef.componentInstance.title = contact.firstname + ' ' + contact.lastname;
    modalRef.result.then(confirmed => {
      if (confirmed) {
        this.dataService.delete(contact);
      }
    }, (reason) => {

    });
  }

}
