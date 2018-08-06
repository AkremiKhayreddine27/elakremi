import { Component, OnInit } from '@angular/core';
import { TariffsService } from '../../../@core/data/tariffs.service';
import { PropertyService } from '../../../@core/data/property.service';
@Component({
  selector: 'caution',
  templateUrl: './caution.component.html',
  styleUrls: ['./caution.component.scss']
})
export class CautionComponent implements OnInit {

  isCollapsed = true;

  tariff;

  constructor(public tariffsService: TariffsService, public propertyService: PropertyService) { }

  ngOnInit() {
    this.tariff = this.tariffsService.findFirstBy('property.id', this.propertyService.currentProperty.id);
  }

}
