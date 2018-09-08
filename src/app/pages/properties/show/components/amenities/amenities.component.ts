import { Component, OnInit, Self, Optional, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.scss'],
})
export class AmenitiesComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() items = [];

  amenities;

  isCollapsed: boolean = true;

  constructor(@Optional() @Self() public controlDir: NgControl) {
    controlDir.valueAccessor = this;
  }

  ngOnInit() {
    const control = this.controlDir.control;
    let validators = control.validator ? [control.validator] : [];
    control.setValidators(validators);
    control.updateValueAndValidity();
    this.items.map(item => {
      if (this.exist(this.amenities, item)) {
        item.value = true;
      }
    });
  }

  ngOnDestroy() {
    this.items = this.items.map(item => {
      item.value = false;
      return item;
    });
  }

  writeValue(value: any) {
    this.amenities = value;
  }

  exist(items, item) {
    return items.find(i => {
      return i.id == item.id;
    });
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

  checkboxChanged($event) {
    this.amenities = this.items.filter(item => {
      return item.value;
    });
    this.onChange(this.amenities);
  }

}

