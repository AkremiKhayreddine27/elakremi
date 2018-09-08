import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactsService } from '../../../@core/data';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.scss']
})
export class SendNotificationComponent implements OnInit {

  @Input() title;

  @Input() mail;

  @ViewChild('form') form: FormGroup;

  edit = false;

  contacts: Observable<any[]>;

  constructor(public activeModal: NgbActiveModal, private contactsService: ContactsService) { }

  ngOnInit() {
    this.contacts = of(this.contactsService.all()).pipe(delay(500));
    this.form = new FormGroup({
      recipients: new FormControl(this.mail.recipients, Validators.required),
      object: new FormControl(this.mail.object, Validators.required),
      content: new FormControl(this.mail.content),
      files: new FormControl(this.mail.files)
    });
  }

  get object(): any { return this.form.get('object'); }

  get content(): any { return this.form.get('content'); }

  get recipients(): any { return this.form.get('recipient'); }

  get files(): any { return this.form.get('files'); }

  removeFile(file) {
    this.mail.files = this.mail.files.filter(f => {
      return f.name !== file.name;
    });
    console.log(this.form.value);
  }

  close() {
    this.activeModal.dismiss();
  }

}
