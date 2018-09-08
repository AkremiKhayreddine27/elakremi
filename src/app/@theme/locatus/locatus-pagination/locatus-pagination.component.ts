import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { Pagination } from '../../../store/helpers';

@Component({
  selector: 'locatus-pagination',
  templateUrl: './locatus-pagination.component.html',
  styleUrls: ['./locatus-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocatusPaginationComponent implements OnInit, OnChanges {

  @Input()
  paging: Pagination;

  @Input()
  total: number;

  @Output()
  changed: EventEmitter<Pagination> = new EventEmitter<Pagination>();

  totalPages: number = 0;

  constructor() { }

  ngOnInit() {
    this.totalPages = Math.ceil(this.total / this.paging.perPage);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.paging || changes.total) {
      this.totalPages = Math.ceil(this.total / this.paging.perPage);
    }
  }

  setPage(page: number) {
    this.paging.page = page;
    this.changed.emit(this.paging);
  }

}
