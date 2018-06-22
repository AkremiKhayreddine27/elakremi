import { Component, OnInit, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as dateFns from 'date-fns';
import { PaymentService, Payment } from '../../../@core/data/payment.service';
import { DateService } from '../../../@core/data/date.service';

@Component({
  selector: 'payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {

  @Input() toPay;

  @Input() payment;

  public title;

  public form: FormGroup;

  mode: string = 'Dépense';

  public types: any[];

  public type: any;

  public statuses: any[];

  public status: any;

  public methods: any[];

  public method: any;

  public tvas: any[];

  public tva: any;

  public payers = [];

  public payer: any;

  public contact;

  public contactType;

  public newPayment: Payment;

  public filtredTypes;

  constructor(
    public activeModal: NgbActiveModal,
    public paymentService: PaymentService,
    public dateService: DateService) { }

  ngOnInit() {
    this.title = this.payment ? 'Modifier le paiement ' + this.payment.id : 'Ajouter un paiement';
    this.newPayment = this.payment ? this.paymentService.setPayment(this.payment) : this.paymentService.payment;

    this.types = this.paymentService.types;
    this.type = this.payment ? { label: this.payment.type.label, value: this.payment.type.label } : this.paymentService.defaultType;

    this.methods = this.paymentService.methods;
    this.method = this.payment ? { label: this.payment.method, value: this.payment.method } : this.paymentService.defaultMethod;

    this.statuses = this.paymentService.statuses;
    this.status = this.payment ? { label: this.payment.status, value: this.payment.status } : this.paymentService.defaultStatus;

    this.tvas = this.paymentService.tvas;
    this.tva = this.payment ? { label: this.payment.tva, value: this.payment.tva } : this.paymentService.defaultTva;

    this.payers = this.paymentService.getPayers(this.toPay);
    this.payer = this.paymentService.getDefaultPayer(this.toPay, this.newPayment);

    this.filtredTypes = this.paymentService.getFiltredType(this.mode, this.newPayment);

    this.mode = this.newPayment.type ? this.newPayment.type.isOutgo ? 'Dépense' : 'Revenue' : 'Dépense';

    this.form = new FormGroup({
      description: new FormControl(this.newPayment.description),
      paymentDate: new FormControl(this.newPayment.paymentDate, Validators.required),
      deadlineDate: new FormControl(this.newPayment.deadlineDate, Validators.required),
      status: new FormControl(this.newPayment.status, Validators.required),
      payer: new FormControl(this.newPayment.payer ? this.newPayment.payer : null, Validators.required),
      type: new FormControl(this.newPayment.type ? this.newPayment.type : null, Validators.required),
      amount: new FormControl(this.newPayment.amount, Validators.required),
      tva: new FormControl(this.newPayment.tva, Validators.required),
      method: new FormControl(this.newPayment.method, Validators.required),
    });
  }

  get description() { return this.form.get('description'); }

  get paymentDate() { return this.form.get('paymentDate'); }

  get deadlineDate() { return this.form.get('deadlineDate'); }

  get amount() { return this.form.get('amount'); }

  setStatus(status) {
    this.form.patchValue({ status: status.element.value });
  }

  setPayer(payer) {
    this.form.patchValue({ payer: payer.element.slug });
  }

  setType(type) {
    this.form.patchValue({ type: type.element });
  }

  setTva(tva) {
    this.form.patchValue({ tva: tva.element.value });
  }

  setMethod(method) {
    this.form.patchValue({ method: method.element.value });
  }

  currentMode() {
    return this.mode === 'Dépense';
  }

  toggleMode(checked) {
    if (checked) {
      this.mode = 'Revenu';
      this.filtredTypes = this.types.filter(type => {
        return type.isIncome;
      });
    } else {
      this.mode = 'Dépense';
      this.filtredTypes = this.types.filter(type => {
        return type.isOutgo;
      });
    }
  }

  submit() {
    this.form.patchValue({ paymentDate: dateFns.parse(this.paymentDate.value.year + '-' + this.paymentDate.value.month + '-' + this.paymentDate.value.day) });
    this.form.patchValue({ deadlineDate: dateFns.parse(this.deadlineDate.value.year + '-' + this.deadlineDate.value.month + '-' + this.deadlineDate.value.day) });
    if (!this.payment) {
      this.paymentService.add(this.form.value, this.toPay);
    } else {
      this.paymentService.update(this.payment.id, this.form.value, this.toPay)
    }
    this.activeModal.dismiss();
  }

  close() {
    this.activeModal.dismiss();
  }
}
