import { Component, OnInit, Output, EventEmitter, Input, NgZone } from '@angular/core';
import { FilterConf } from '../../../store/helpers';

@Component({
  selector: 'locatus-card-search',
  templateUrl: './locatus-card-search.component.html',
  styleUrls: ['./locatus-card-search.component.scss']
})
export class LocatusCardSearchComponent implements OnInit {

  _timeout: any = null;

  @Input() isSearching;

  @Input() fields;

  @Output() closeSearch: EventEmitter<string> = new EventEmitter();

  @Output() searchChange: EventEmitter<FilterConf> = new EventEmitter()

  filters: FilterConf = { filters: [], andOperator: false };

  constructor(public lc: NgZone) { }

  ngOnInit() {
  }

  close() {
    this.isSearching = !this.isSearching;
    this.closeSearch.emit();
    this.filters.filters = [];
    this.filters.andOperator = true;
    this.searchChange.emit(this.filters);
  }

  getDataFromObject(object, path) {
    let parts = path.split(".");
    if (parts.length == 1) {
      return object[parts[0]];
    }
    return this.getDataFromObject(object[parts[0]], parts.slice(1).join("."));
  }

  search(query) {
    if (this._timeout) {
      window.clearTimeout(this._timeout);
    }
    this._timeout = window.setTimeout(() => {
      this._timeout = null;
      this.lc.run(() => {
        this.filters.filters = [];
        if (query !== '') {
          this.filters.andOperator = false;
          this.filters.filters = this.fields.map((field: string) => {
            return {
              field: field,
              search: query
            };
          });
        } else {
          this.filters.andOperator = true;
        }
        this.searchChange.emit(this.filters);
      });
    }, 1000);
  }

}
