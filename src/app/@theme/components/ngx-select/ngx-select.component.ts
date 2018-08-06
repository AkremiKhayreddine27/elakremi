import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'ngx-select',
  templateUrl: './ngx-select.component.html',
  styleUrls: ['./ngx-select.component.scss']
})
export class NgxSelectComponent implements OnInit, OnChanges {

  @Input() elements: any[];

  @Input() id: any;

  @Input() placeholder;

  @Input() groupedSelect: boolean;

  @Input() withAll = false;

  @Input() element;

  @Output() selectChanged: EventEmitter<{ element }> = new EventEmitter();

  @Output() groupSelectChanged: EventEmitter<{ element }> = new EventEmitter();

  @Input() refresh: Subject<any> = new Subject();

  @Input() hasErrors = false;

  constructor() { }

  ngOnInit() {
    if (this.placeholder) {
      const exist = this.elements.find(element => {
        return element.all;
      });
      if (!exist) {
        this.elements.unshift({ id: null, value: this.placeholder, all: true });
      }
    }
    if (!this.element) {
      this.element = { id: null, value: this.placeholder, all: true };
    }
    this.refresh.subscribe(element => {
      this.elements.map(e => {
        if (e.id === element.element.id && element.id === this.id) {
          this.element = element.element;
        }
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.element) {
    }
  }

  setElement(element) {
    this.element = element;
    this.selectChanged.emit({ element });
  }

  setGroupElement(element) {
    this.element = element;
    this.groupSelectChanged.emit({ element });
  }

}
