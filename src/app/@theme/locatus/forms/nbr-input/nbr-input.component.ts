import { Component, OnInit, Input, Self, Optional, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NgControl, Validator, AbstractControl, Validators, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-nbr-input',
  templateUrl: './nbr-input.component.html',
  styleUrls: ['./nbr-input.component.scss']
})
export class NbrInputComponent implements OnInit, ControlValueAccessor, Validator {

  @Input()
  number: number;

  @Output()
  numberChanged: EventEmitter<{ number }> = new EventEmitter();

  disabled: boolean;

  constructor(@Optional() @Self() public controlDir: NgControl) {
    controlDir.valueAccessor = this;
  }

  ngOnInit() {
    const control = this.controlDir.control;
    let validators = control.validator ? [control.validator, Validators.required] : Validators.required;
    control.setValidators(validators);
    control.updateValueAndValidity();
  }

  increment() {
    this.number++;
    this.onChange(this.number);
  }

  decrement() {
    if (this.number > 0) {
      this.number--;
      this.onChange(this.number);
    }
  }

  writeValue(value: any) {
    this.number = value;
  }

  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  onChange(value: any) {

  }

  onTouched() {

  }

  validate(ctrl: AbstractControl): ValidationErrors {
    return Validators.required(ctrl);
  }

}
