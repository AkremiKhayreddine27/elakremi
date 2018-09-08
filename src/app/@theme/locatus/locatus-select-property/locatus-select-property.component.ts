import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Property } from '@core/data/models';

@Component({
  selector: 'locatus-select-property',
  templateUrl: './locatus-select-property.component.html',
  styleUrls: ['./locatus-select-property.component.scss']
})
export class LocatusSelectPropertyComponent implements OnInit {

  @Input()
  currentProperty: Property;

  @Input()
  properties: Property[];

  @Output()
  propertyChanged: EventEmitter<Property> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  setCurrentProperty(property: Property) {
    this.propertyChanged.emit(property)
  }

}
