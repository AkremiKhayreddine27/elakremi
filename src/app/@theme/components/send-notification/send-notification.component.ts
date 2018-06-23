import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { ContactsService } from '../../../@core/data/contacts.service';

@Component({
  selector: 'send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.scss']
})
export class SendNotificationComponent implements OnInit {

  @Input() title;

  @Input() mail;

  @ViewChild('form') form: FormGroup;

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  edit = false;

  lodgers = [];

  constructor(public activeModal: NgbActiveModal, private contactsService: ContactsService) { }

  ngOnInit() {
    this.contactsService.getLodgers().subscribe(lodger => {
      this.lodgers.push(lodger);
    });
    this.form = new FormGroup({
      recipient: new FormControl(this.mail.recipient, Validators.required),
      object: new FormControl(this.mail.object, Validators.required),
      content: new FormControl(this.mail.content)
    });
  }

  get object(): any { return this.form.get('object'); }

  get content(): any { return this.form.get('content'); }

  get recipient(): any { return this.form.get('recipient'); }

  formatter = (x: any) => x.firstname + ' ' + x.lastname;

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.focus$)
      .merge(this.click$.filter(() =>
        !this.instance.isPopupOpen())
      )
      .map(term => (term === '' ?
        this.lodgers :
        this.lodgers.filter(v => v.firstname.toLowerCase().indexOf(term.toLowerCase()) > -1)
      ).slice(0, 10));


  close() {
    this.activeModal.dismiss();
  }

}
