import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DialogNewEventComponent } from '../dialog-new-event/dialog-new-event.component';
import { TariffsService } from '../../../@core/data';
import * as dateFns from 'date-fns';
import { EventTariffService } from '../../../@core/data';
import { EventService } from '../../../@core/data';
import { PropertyService } from '../../../@core/data';

@Component({
  selector: 'tarif-event',
  templateUrl: './tarif-event.component.html',
  styleUrls: ['./tarif-event.component.scss']
})
export class TarifEventComponent implements OnInit, AfterViewInit {


  headerActions = [
    { title: 'add', type: 'link', icon: 'fa fa-plus', clickAction: 'create', displayInMobile: true },
  ];

  public tariff;
  public eventTariffs;


  constructor(public modalService: NgbModal,
    public cdr: ChangeDetectorRef,
    public propertyService: PropertyService,
    public eventTariffService: EventTariffService,
    public eventService: EventService,
    public tariffsService: TariffsService) { }

  ngOnInit() {
    this.tariff = this.tariffsService.findFirstBy('property.id', this.propertyService.currentProperty.id);
    this.eventTariffs = this.eventTariffService.findBy('tariff.id', this.tariff.id);
    this.eventTariffService.onChanged().subscribe(eventTariff => {
      this.eventTariffs = this.eventTariffService.findBy('tariff.id', this.tariff.id);
    });
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  isActiveEvent(event) {
    return dateFns.isWithinRange(new Date(), event.event.start, event.event.end);
  }

  handleHeaderEvent(event) {
    this[event.action]();
  }

  create() {
    const modalRef = this.modalService.open(DialogNewEventComponent, { size: 'lg', container: 'nb-layout' });
  }

  edit(event) {
    const modalRef = this.modalService.open(DialogNewEventComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.eventTariff = event;
  }

}
