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

  constructor(public servicesService: ServicesService, private router: Router) { }

  ngOnInit() {
  }

  navigate(route, type) {
    this.servicesService.setCurrentType(type);
    this.servicesService.setCurrentCategory(this.subCategory);
    this.router.navigateByUrl('/pages/categories/' + route);
  }

}
