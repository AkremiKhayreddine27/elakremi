import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogNewSeasonComponent } from '../dialog-new-season/dialog-new-season.component';
import { PropertyService } from '../../../@core/data/property.service';
import { TariffsService } from '../../../@core/data/tariffs.service';
import * as dateFns from 'date-fns';
import { SeasonalTariffService } from '../../../@core/data/seasonal-tariff.service';
import { SeasonService } from '../../../@core/data/season.service';
import { EventTariffService } from '../../../@core/data/event-tariff.service';

@Component({
  selector: 'tarif-saison',
  templateUrl: './tarif-saison.component.html',
  styleUrls: ['./tarif-saison.component.scss'],
})
export class TarifSaisonComponent implements OnInit, AfterViewInit {

  seasonHeaderActions = [
    { title: 'add', type: 'link', icon: 'fa fa-plus', clickAction: 'create', displayInMobile: true },
  ];

  public tariff;
  public seasons = this.seasonService.all();
  public periods = this.seasonalTariffService.periods;
  public seasonalTariffs;

  currentPeriod = '';

  constructor(
    public modalService: NgbModal,
    public cdr: ChangeDetectorRef,
    public propertyService: PropertyService,
    public seasonalTariffService: SeasonalTariffService,
    public seasonService: SeasonService,
    public eventTariffService: EventTariffService,
    public tariffsService: TariffsService) { }

  ngOnInit() {
    this.tariff = this.tariffsService.findFirstBy('property.id', this.propertyService.currentProperty.id);
    this.seasonalTariffs = this.seasonalTariffService.findBy('tariff.id', this.tariff.id);
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  isActiveSeason(season) {
    return !this.eventTariffService.hasActiveEvent() && dateFns.isWithinRange(new Date(), season.start, season.end);
  }

  isActivePeriod(period) {
    let isActive = false;
    this.seasonalTariffs.map(season => {
      if (period.id === 3 && dateFns.isWeekend(new Date())) {
        this.seasonalTariffService.findPeriodBy('id', 4).active = true;
        this.seasonalTariffService.findPeriodBy('id', 3).active = false;
      }
      if (season.period.id === period.id && period.active) {
        isActive = true;
      }
    });
    return isActive;
  }

  tabChange(tab) {
    if (tab.active) {
      const period = this.seasonalTariffService.findPeriodBy('value', tab.tabTitle);
      this.seasonalTariffs = this.seasonalTariffs.map(season => {
        if (season.period.active) {
          season.period.active = false;
        }
        return season;
      });
      this.seasonalTariffs = this.seasonalTariffs.map(season => {
        if (season.period.id === period.id) {
          season.period.active = true;
        }
        return season;
      });
    }
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
    modalRef.componentInstance.tariff = season;
  }

}
