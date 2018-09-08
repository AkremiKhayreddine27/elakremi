import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from '../../../../../@core/data';
import { Property } from '../../../../../@core/data/models/property';

@Component({
  selector: 'table-view',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() properties;

  constructor(private service: PropertyService, private router: Router) { }

  ngOnInit() {

  }

  delete(property) {
    this.service.delete(property);
  }

  navigate(link, property: Property) {
    this.service.setCurrentProperty(property.id);
    this.router.navigate(['/pages/' + link]);
  }

}
