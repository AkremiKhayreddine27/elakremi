import { Component, OnInit, Input, Output, EventEmitter, ComponentFactoryResolver, ViewContainerRef, ViewChild, TemplateRef } from '@angular/core';
@Component({
  selector: 'ngx-table',
  templateUrl: './ngx-table.component.html',
  styleUrls: ['./ngx-table.component.scss']
})
export class NgxTableComponent implements OnInit {

  @Input() config;

  @Input() data;

  @Output() actionEvent: EventEmitter<{ action: string, attribute?: any }> = new EventEmitter();

  constructor() {

  }

  ngOnInit() {
  }

  actionClicked(event) {
    this.actionEvent.emit({ action: event.action, attribute: event.attribute });
  }

}
