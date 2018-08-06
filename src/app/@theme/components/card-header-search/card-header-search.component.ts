import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'card-header-search',
  templateUrl: './card-header-search.component.html',
  styleUrls: ['./card-header-search.component.scss']
})
export class CardHeaderSearchComponent implements OnInit {

  @Input() isSearching;

  @Output() closeSearch: EventEmitter<string> = new EventEmitter();

  @Input() source: LocalDataSource = new LocalDataSource();

  @Input() fields;

  filters: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.isSearching = !this.isSearching;
    this.source.setFilter([]);
    this.closeSearch.emit();
  }

  getDataFromObject(object, path) {
    let parts = path.split(".");
    if (parts.length == 1) {
      return object[parts[0]];
    }
    return this.getDataFromObject(object[parts[0]], parts.slice(1).join("."));
  }

  onSearch(query) {
    if (query !== '') {
      this.filters = [];
      this.fields.map((f: string) => {
        let field = f.split('.').length > 0 ? f.split('.')[0] : f;
        let subfield = f.split('.').length > 0 ? f.split('.')[1] : null;
        this.filters.push(
          {
            field: field,
            search: query,
            filter: (cell: any, search: any) => {
              if (subfield) {
                return (cell[subfield].toString().toLowerCase().includes(search));
              }
              if (typeof cell === 'object') {
                let exist = Object.keys(cell).map(key => {
                  return (cell[key].toString().toLowerCase().includes(search));
                }).find(e => {
                  return e;
                });
                if (exist) {
                  return true;
                } else {
                  return false;
                }
              }
            }
          });
      });
      this.source.setFilter(this.filters, false);
    } else {
      this.source.setFilter([]);
    }
  }

}
