import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ContactsService } from '../../../@core/data/contacts.service';

@Component({
  selector: 'dialog-check-in',
  templateUrl: './dialog-check-in.component.html',
  styleUrls: ['./dialog-check-in.component.scss']
})
export class DialogCheckInComponent implements OnInit {

  providers = [];

  provider = {};

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private contactsService: ContactsService) { }

  ngOnInit() {
    this.providers = this.contactsService.all();
  }

  close() {
    this.activeModal.dismiss();
  }

}
