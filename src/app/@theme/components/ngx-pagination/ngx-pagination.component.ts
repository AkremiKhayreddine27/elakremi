import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-pagination',
  templateUrl: './ngx-pagination.component.html',
  styleUrls: ['./ngx-pagination.component.scss']
})
export class NgxPaginationComponent implements OnInit {

  @Input() source: LocalDataSource;

  paging;

  total;

  filtredTotal;

  isFiltred = false;

  constructor() { }

  ngOnInit() {
    this.source.getAll().then(value => {
      this.total = value.length;
    });
    this.source.setPaging(1, 10);
    this.source.setPage(1);
    this.source.onChanged().subscribe(value => {
      if (value.action === 'filter') {
        this.isFiltred = true;
      }
      let nbrFilters = 0;
      value.filter.filters.map(f => {
        if (f.search !== '') {
          nbrFilters++;
        }
      });
      if (nbrFilters === 0) {
        this.isFiltred = false;
      }
      this.filtredTotal = value.elements.length;
      this.paging = value.paging;
    });
  }

  setPage(page) {
    if (page > 0 && ((page - 1) * this.paging.perPage <= this.total)) {
      this.source.setPage(page);
    }
  }

}
