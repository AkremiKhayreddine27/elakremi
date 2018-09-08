import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MobileDropdownComponent } from '../../mobile-dropdown/mobile-dropdown.component';
import * as dateFns from 'date-fns';
import { of } from 'rxjs/observable/of';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnInit, AfterViewInit {

  @Input() row;

  @Input() config;

  @Output() actionEvent: EventEmitter<{ action: string, attribute?: any }> = new EventEmitter();

  isCollapsed = true;

  collapsedComponent;

  collpaseData;

  collpaseNomenclature;

  constructor(private cdRef: ChangeDetectorRef, private modalService: NgbModal) { }

  ngOnInit() {

  }

  getDataFromObject(object, path) {
    let parts = path.split(".");
    if (parts.length == 1) {
      return object[parts[0]];
    }
    return this.getDataFromObject(object[parts[0]], parts.slice(1).join("."));
  }

  isDate(date) {
    return dateFns.isDate(date);
  }

  isString(object) {
    return typeof object === 'string';
  }

  isArray(object) {
    return Array.isArray(object);
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  actionClicked(action, attribute) {
    this.actionEvent.emit({ action: action, attribute: attribute });
  }

  collapse(d) {
    this.isCollapsed = !this.isCollapsed;
    if (!this.isCollapsed) {
      this.collapsedComponent = d.component;
      if (d.getData) {
        this.collpaseData = d.getData(this.getDataFromObject(this.row, 'id'));
      }
      if (d.path[0]) {
        this.collpaseData = of(this.getDataFromObject(this.row, d.path[0]));
      }
      this.collpaseNomenclature = { id: this.getDataFromObject(this.row, 'id'), type: this.getDataFromObject(this.row, 'kind') };
    }
  }

  showDropdown(data, options) {
    const modalRef = this.modalService.open(MobileDropdownComponent, { windowClass: 'mobile-dropdown', size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.options = options;
    modalRef.result.then(result => {
      this.actionEvent.emit({ action: result.action, attribute: result.data });
    }, (reason) => {

    });
  }

}
