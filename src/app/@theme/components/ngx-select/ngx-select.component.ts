import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ngx-select',
  templateUrl: './ngx-select.component.html',
  styleUrls: ['./ngx-select.component.scss']
})
export class NgxSelectComponent implements OnInit, OnChanges {

  @Input() elements;

  @Input() default;


  @Input() withActive;

  @Input() element;

  @Output() selectChanged: EventEmitter<{ element }> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.elements && !changes.elements.firstChange) {

    }
  }

  setElement(element) {
    this.element = element;
    this.selectChanged.emit({ element });
  }

}
