import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../../../../../@core/data/services.service';
@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  @Input() subCategory;

  isCollapsed = true;

  constructor(private servicesService: ServicesService, private router: Router) { }

  ngOnInit() {
  }

  setService(service) {
    this.servicesService.setCurrentService(service);
    this.router.navigateByUrl('/pages/categories/create');
  }

}
