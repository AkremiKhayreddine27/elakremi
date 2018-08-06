import { Component, OnInit, ViewChild, forwardRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, FormGroup, FormControl, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PropertyService } from '../../../../../@core/data/property.service';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DescriptionComponent),
      multi: true
    }
  ],
})
export class DescriptionComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  @ViewChild('form') form: FormGroup;
  languages;
  currencies;

  isCollapsed: boolean = true;

  constructor(
    public cdr: ChangeDetectorRef,
    public propertyService: PropertyService
  ) { }

  ngOnInit() {
    this.languages = of(this.propertyService.languages).pipe(delay(500));
    this.currencies = of(this.propertyService.currencies).pipe(delay(500));
    this.form = new FormGroup({
      nbrRooms: new FormControl(null, Validators.required),
      nbrKitchens: new FormControl(null, Validators.required),
      nbrLounges: new FormControl(null, Validators.required),
      capacity: new FormControl(null, Validators.required),
      nbrBeds: new FormControl(null, Validators.required),
      nbrBathrooms: new FormControl(null, Validators.required),
      suitableForEvents: new FormControl(null, Validators.required),
      acceptedAnimals: new FormControl(null, Validators.required),
      smokingAccommodation: new FormControl(null, Validators.required),
      language: new FormControl(null, Validators.required),
      currency: new FormControl(null, Validators.required),
      cellar: new FormControl(null, Validators.required),
      terrace: new FormControl(null, Validators.required),
      garage: new FormControl(null, Validators.required),
      balkon: new FormControl(null, Validators.required),
      garden: new FormControl(null, Validators.required),
      guardian: new FormControl(null, Validators.required),
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

}
