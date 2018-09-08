import { Component, OnInit } from '@angular/core';
import { TariffsService } from '../../../@core/data';
import { PropertyService } from '../../../@core/data';

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
