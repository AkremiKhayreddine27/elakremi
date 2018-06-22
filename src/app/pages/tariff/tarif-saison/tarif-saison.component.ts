import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DialogNewSeasonComponent } from './../dialog-new-season/dialog-new-season.component';
import { PropertyService } from '../../../@core/data/property.service';

@Component({
  selector: 'tarif-saison',
  templateUrl: './tarif-saison.component.html',
  styleUrls: ['./tarif-saison.component.scss']
})
export class TarifSaisonComponent implements OnInit {

  seasonHeaderActions = [
    { title: 'add', type: 'link', icon: 'fa fa-plus', clickAction: 'create', displayInMobile: true },
  ];

  private tariffSaison = [];

  currentPeriod = '';

  constructor(private modalService: NgbModal, private propertyService: PropertyService) { }

  ngOnInit() {
    this.tariffSaison = this.propertyService.currentProperty.tariff.seasons;
  }

  tabChange(tab) {
    this.currentPeriod = tab.tabTitle;
  }

  handleHeaderEvent(event) {
    this[event.action]();
  }

  create() {
    const modalRef = this.modalService.open(DialogNewSeasonComponent, { size: 'lg', container: 'nb-layout' });
  }

  edit(season) {
    const modalRef = this.modalService.open(DialogNewSeasonComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.currentPeriod = this.currentPeriod;
    modalRef.componentInstance.season = season;
  }

}
