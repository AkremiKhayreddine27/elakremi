import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

import { ContactsService } from '../../../@core/data/contacts.service';
import { DialogNewContactComponent } from '../../contact/contact-form/contact-form.component';

@Component({
  selector: 'dialog-check-in',
  templateUrl: './dialog-check-in.component.html',
  styleUrls: ['./dialog-check-in.component.scss']
})
export class DialogCheckInComponent implements OnInit {

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  checkin = {
    date: new Date(),
    provider: { firstname: '', lastname: '' }
  };

  providers = [];

  provider = {};

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private contactsService: ContactsService) { }

  ngOnInit() {
    this.contactsService.getServiceProviders().subscribe(provider => {
      this.providers.push(provider);
    });
  }

  formatter = (x: any) => x.firstname + ' ' + x.lastname;

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.focus$)
      .merge(this.click$.filter(() =>
        !this.instance.isPopupOpen())
      )
      .map(term => (term === '' ?
        this.providers :
        this.providers.filter(v => v.firstname.toLowerCase().indexOf(term.toLowerCase()) > -1)
      ).slice(0, 10));

  newContact() {
    const m = this.modalService.open(DialogNewContactComponent, { size: 'lg', container: 'nb-layout' });
    m.result.then((result) => {
      //this.form.patchValue({ provider: result });
      this.checkin.provider = result;
      this.providers.push(result);
    }, (reasen) => {
      // console.log(reasen);
    });
    m.componentInstance.type = { label: 'Prestataire de service', value: 'prestataire de service' };
  }

  assignContact(value) {
    this.checkin.provider = value.item;
  }

  close() {
    this.activeModal.dismiss();
  }

}
