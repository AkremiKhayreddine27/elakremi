import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import * as dateFns from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { LocatusFilter } from './locatus-filter';


@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() filters: LocatusFilter[];

  @Input() source: LocalDataSource;

  refreshSelect: Subject<any> = new Subject();

  @Input() refreshFilters: Subject<any> = new Subject();

  @ViewChild('ngxDateDrop')
  private ngxDateDrop;

  @Output() hasFilters: EventEmitter<{ filters: any[], config: any[] }> = new EventEmitter();

  @Output() action: EventEmitter<{ action: string, data: any }> = new EventEmitter();

  sourceFilters = [];

  constructor() { }

  ngOnInit() {
    this.refreshFilters.subscribe((filters) => {
      this.filters = filters;
      this.initFilters();
    });
    this.initFilters();
  }

  initFilters() {
    this.filters.map(filter => {
      if (filter.element || filter.elements) {
        this.setFilter(filter.field, filter.callback, filter.element, filter.name);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  ngAfterViewInit() {

  }

  onClear(filter: LocatusFilter) {
    this.setFilter(filter.field, filter.callback, null, filter.name);
    if (filter.action) {
      this.callAction(filter.action, null);
    }
  }

  reset() {
    this.filters = this.filters.map(filter => {
      if (filter.elements) {
        filter.element = filter.elements[0];
        this.refreshSelect.next({ id: filter.name, element: filter.element });
      }
      return filter;
    });
    if (this.ngxDateDrop) {
      this.ngxDateDrop.cancel();
    }
    this.source.setFilter([]);
  }

  callActionAndSetFilter(field, callback, action, filter, name) {
    this.callAction(action, filter);
    this.setFilter(field, callback, filter, name);
  }

  callAction(action, property) {
    if (property) {
      this.action.emit({ action: action, data: property });
    }
  }

  applyFilter(filter, selectValue, filtervalue) {
    let exist = this.sourceFilters.find(f => {
      return f.field === filter
    });
    if (exist) {
      this.sourceFilters = this.sourceFilters.map(f => {
        if (f.field === filter) {
          f = filtervalue;
        }
        return f;
      });
    } else {
      if (selectValue) {
        this.sourceFilters.push(filtervalue);
      }
    }
  }

  setFilter(field, callback, filter, name) {
    this.filters = this.filters.map(f => {
      if (f.name === name) {
        f.element = filter;
      }
      return f;
    });
    const query = filter && filter.id ? filter.id.toString() : '';
    this.applyFilter(field, filter, {
      field: field,
      search: query,
      filter: callback
    });
    this.hasFilters.emit({ filters: this.sourceFilters, config: this.filters });
    this.source.setFilter(this.sourceFilters, true);
  }

  setGroupFilter(field, callback, filter, name) {
    this.filters = this.filters.map(f => {
      if (f.name === name) {
        f.element = filter;
      }
      return f;
    });
    const query = filter && filter.id ? filter.id.toString() : filter ? filter.value : '';
    this.applyFilter(field, filter, {
      field: field,
      search: query,
      filter: callback
    });
    this.hasFilters.emit({ filters: this.sourceFilters, config: this.filters });
    this.source.setFilter(this.sourceFilters, true);
  }

  dateChanged(from: Date, to: Date) {
    if (from || to) {
      from = dateFns.parse(from.getFullYear() + '-' + from.getMonth() + '-' + from.getDate());
      if (to) {
        to = dateFns.parse(to.getFullYear() + '-' + to.getMonth() + '-' + to.getDate());
      }
      let toDate = to ? to : from;
      this.applyFilter('createdAt', { value: from.toString() }, {
        field: 'createdAt',
        search: from.toString(),
        filter: (cell: Date, search: any) => {
          cell = dateFns.parse(cell.getFullYear() + '-' + cell.getMonth() + '-' + cell.getDate());
          if (new Date(cell.toString()) >= from && new Date(cell.toString()) <= toDate) {
            return true;
          } else {
            return false;
          }
        }
      });
      this.hasFilters.emit({ filters: this.sourceFilters, config: this.filters });
      this.source.setFilter(this.sourceFilters, true);
    } else if (!from && !to) {
      this.sourceFilters = this.sourceFilters.filter(f => {
        return f.field !== 'createdAt'
      });
      this.hasFilters.emit({ filters: this.sourceFilters, config: this.filters });
      this.source.setFilter(this.sourceFilters, true);
    }
  }

}
