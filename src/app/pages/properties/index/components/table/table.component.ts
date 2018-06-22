import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from '../../../../../@core/data/property.service';

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
    this.service.remove(property);
  }

  navigate(link, property) {
    this.service.setCurrentProperty(property);
    this.router.navigate(['/pages/' + link]);
  }

}
