import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DialogNewEventComponent } from './../dialog-new-event/dialog-new-event.component';
import { PropertyService } from '../../../@core/data/property.service';

@Component({
  selector: 'tarif-event',
  templateUrl: './tarif-event.component.html',
  styleUrls: ['./tarif-event.component.scss']
})
export class TarifEventComponent implements OnInit {


  headerActions = [
    { title: 'add', type: 'link', icon: 'fa fa-plus', clickAction: 'create', displayInMobile: true },
  ];

  public tariffEvent = [];


  constructor(public modalService: NgbModal, public propertyService: PropertyService) { }

  ngOnInit() {
    this.tariffEvent = this.propertyService.currentProperty.tariff.events;
  }

  handleHeaderEvent(event) {
    this[event.action]();
  }

  create() {
    const modalRef = this.modalService.open(DialogNewEventComponent, { size: 'lg', container: 'nb-layout' });
  }

  edit(event) {
    const modalRef = this.modalService.open(DialogNewEventComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.event = event;
  }

}
