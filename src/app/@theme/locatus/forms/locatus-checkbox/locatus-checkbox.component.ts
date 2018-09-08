import { Component, OnInit, Input, Output, EventEmitter, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl, Validator, AbstractControl, Validators, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'locatus-checkbox',
  templateUrl: './locatus-checkbox.component.html',
  styleUrls: ['./locatus-checkbox.component.scss']
})
export class LocatusCheckboxComponent implements OnInit, ControlValueAccessor, Validator {

  @Input() title: string;

  @Input() type: string;

  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();

  on: any;

  constructor(@Optional() @Self() public controlDir: NgControl) {
    controlDir.valueAccessor = this;
  }

  ngOnInit() {
    const control = this.controlDir.control;
    let validators = control.validator ? [control.validator, Validators.required] : Validators.required;
    control.setValidators(validators);
    control.updateValueAndValidity();
  }

  clicked() {
    this.on.value = !this.on.value;
    this.change.emit(this.on);
    this.onChange(this.on);
  }

  writeValue(value: any) {
    this.on = value ? value : { value: false };
  }

  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  onChange(value: any) {

  }

  onTouched() {

  }

  validate(ctrl: AbstractControl): ValidationErrors {
    return Validators.required(ctrl);
  }

}
