import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactsService } from '../../../@core/data';

@Component({
  selector: 'dialog-new-contact',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class DialogNewContactComponent implements OnInit {

  @Input() contact;

  newContact;

  submitted = false;

  types = [
    { label: 'Locataire', value: 'locataire' },
    { label: 'Propriétaire', value: 'propriétaire' },
    { label: 'Prestataire de service', value: 'prestataire de service' }
  ];

  availabilities = [
    'Matin: 8h-12h',
    'Aprés-midi: 12h-16h',
    'Soir: 16h-20h',
    'Toute la journée'
  ];

  @Input() type = this.types[0];

  constructor(public activeModal: NgbActiveModal, private contactsService: ContactsService) { }

  ngOnInit() {
    if (!this.contact) {
      this.newContact = {
        firstname: '',
        lastname: '',
        phone: '',
        role: 'locataire', 
        picture: '',
        profil: '',
        availability: '',
        website: '',
        location: {
          address: '',
          postcode: '',
          city: '',
          state: '',
          country: ''
        }
      };
    } else {
      this.newContact = { ...this.contact };
    }
  }

  setType(type) {
    this.newContact.role = type.value;
  }

  close() {
    this.activeModal.dismiss();
  }

  save() {
    console.log(this.newContact);
    this.submitted = true;
    /** 
    if (this.contact) {
      this.contactsService.update(this.newContact);
    } else {
      this.contactsService.add(this.newContact);
      this.activeModal.close(this.newContact);
    }*/
  }

}
