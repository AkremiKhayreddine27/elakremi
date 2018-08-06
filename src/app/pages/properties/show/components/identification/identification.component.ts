import { Component, OnInit, ViewChild, forwardRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';
import { ContactsService } from '../../../../../@core/data/contacts.service';
import { PropertyService } from '../../../../../@core/data/property.service';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IdentificationComponent),
      multi: true
    }
  ]
})
export class IdentificationComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  @ViewChild('form') form: FormGroup;

  isCollapsed: boolean = true;

  isSubmitted: boolean = false;

  types;
  platforms;
  owners;

  constructor(
    public cdr: ChangeDetectorRef,
    public contactsService: ContactsService,
    public propertyService: PropertyService) {

  }

  ngOnInit() {
    this.owners = of(this.contactsService.findBy('role.id', 1)).pipe(delay(500));
    this.types = of(this.propertyService.types).pipe(delay(500));
    this.platforms = of(this.propertyService.platforms).pipe(delay(500));
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      platform: new FormControl(null, Validators.required),
      owner: new FormControl(null, Validators.required)
    });
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  writeValue(value: any) {
    value && this.form.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: (value: any) => void) {
    this.form.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean) {
    disabled ? this.form.disable() : this.form.enable();
  }

  onTouched() {

  }

  get title(): FormControl { return this.form.get('title') as FormControl }

  get description(): FormControl { return this.form.get('description') as FormControl }

  get type(): FormControl { return this.form.get('type') as FormControl }

  get platform(): FormControl { return this.form.get('platform') as FormControl }

  get owner(): FormControl { return this.form.get('owner') as FormControl }

}
