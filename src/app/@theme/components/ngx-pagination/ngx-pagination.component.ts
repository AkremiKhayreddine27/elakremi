import { Component, OnInit, Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'ngx-pagination',
  templateUrl: './ngx-pagination.component.html',
  styleUrls: ['./ngx-pagination.component.scss']
})
export class NgxPaginationComponent implements OnInit {

  @Input() source: LocalDataSource;

  @Input() refresh: Subject<any> = new Subject();

  @Input() perPage = 10;

  paging;

  total;

  constructor() { }

  ngOnInit() {
    this.init(this.source);
  }

  init(source: LocalDataSource) {
    source.setPaging(1, this.perPage);
    source.setPage(1);
    source.onChanged().subscribe(value => {
      this.total = source.count();
      this.paging = value.paging;
    });
  }

  setPage(page) {
    if (page > 0 && ((page - 1) * this.paging.perPage <= this.total)) {
      this.source.setPage(page);
    }
  }

}
