import { Component, OnDestroy, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { ElectricityService } from '../../../@core/data/electricity.service';
import { FinancesService } from '../../../@core/data/finances.service';
import { PropertyService } from '../../../@core/data/property.service';

@Component({
  selector: 'ngx-electricity',
  styleUrls: ['./electricity.component.scss'],
  templateUrl: './electricity.component.html',
})
export class ElectricityComponent implements OnDestroy, OnInit, AfterViewInit {

  data;

  currentYear: Date = new Date();

  currentRevenues;

  type = 'Revenues';
  types = ['Revenues', 'Dépenses'];

  currentTheme: string;
  themeSubscription: any;

  constructor(
    private cdr: ChangeDetectorRef,
    public financesService: FinancesService,
    private propertyService: PropertyService,
    private themeService: NbThemeService) {

  }

  ngOnInit() {
    this.data = this.financesService.getRevenuesByYear(this.propertyService.currentProperty);
    this.data.map(year => {
      if (year.active) {
        this.currentRevenues = year.revenues;
      }
      return year;
    });
  }

  tabChanged(event) {
    this.currentYear = new Date(event.tabTitle);
  }

  typeChanged(t) {
    this.currentYear = new Date();
    this.type = t;
    switch (t) {
      case 'Revenues':
        this.data = this.financesService.getRevenuesByYear(this.propertyService.currentProperty);
        this.data.map(year => {
          if (year.active) {
            this.currentRevenues = year.revenues;
          }
        });
        break;
      case 'Dépenses':
        this.data = this.financesService.getExpensesByYear(this.propertyService.currentProperty);
        this.data.map(year => {
          if (year.active) {
            this.currentRevenues = year.revenues;
          }
        });
        break;
    }
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    //this.themeSubscription.unsubscribe();
  }
}
