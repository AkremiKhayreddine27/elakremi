import { Component, OnInit, Self, Optional, ElementRef, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NgControl, Validator, AbstractControl, Validators, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'locatus-text',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  providers: [
  ]
})
export class TextFieldComponent implements OnInit, OnChanges, ControlValueAccessor, Validator {

  @Input() label;

  @Input() type = 'text';

  @Input() addons;

  @Input() isFormSubmitted: boolean;

  @ViewChild('input') input: ElementRef;

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

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isFormSubmitted) {
      this.isFormSubmitted = changes.isFormSubmitted.currentValue;
    }
  }

  writeValue(value: any) {
    this.input.nativeElement.value = value;
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

  validate(ctrl: AbstractControl): ValidationErrors {
    return Validators.required(ctrl);
  }

  onChange(value: any) {

  }

  onTouched() {

  }


}
