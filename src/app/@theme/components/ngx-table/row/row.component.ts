import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MobileDropdownComponent } from '../../mobile-dropdown/mobile-dropdown.component';
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

  isString(object) {
    return typeof object === 'string';
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  actionClicked(action, attribute) {
    this.actionEvent.emit({ action: action, attribute: attribute });
  }

  collapse(d) {
    this.isCollapsed = !this.isCollapsed;
    this.collapsedComponent = d.component;
    this.collpaseNomenclature = { type: d.nomenclature, id: this.getDataFromObject(this.row, 'id') };
    this.collpaseData = this.getDataFromObject(this.row, d.path[0]);
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
