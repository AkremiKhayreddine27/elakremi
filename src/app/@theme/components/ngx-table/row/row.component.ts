import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnInit {

  @Input() row;

  @Input() config;

  @Output() actionEvent: EventEmitter<{ action: string, attribute?: any }> = new EventEmitter();

  isCollapsed = true;

  collapsedComponent;

  constructor() { }

  ngOnInit() {
  }

  actionClicked(action, attribute) {
    this.actionEvent.emit({ action: action, attribute: attribute });
  }

  collapse(component) {
    this.isCollapsed = !this.isCollapsed;
    this.collapsedComponent = component;
  }

}
