import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../@core/data/models/service';
import { ServicesService } from '../../../@core/data/services.service';
import { PropertyService } from '../../../@core/data/property.service';
@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  headerActions = [
    { title: 'List', type: 'link', icon: 'fa fa-list', clickAction: 'show', displayInMobile: true },
  ];

  public categories;

  constructor(private router: Router, public servicesService: ServicesService, private propertyService: PropertyService) { }

  ngOnInit() {
    this.categories = this.servicesService.categories;
  }

  handleHeaderEvent(event) {
    this[event.action]();
  }

  show() {
    this.router.navigate(['/pages/categories/services']);
  }

}
