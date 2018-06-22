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

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.isSearching = !this.isSearching;
    this.source.setFilter([]);
    this.closeSearch.emit();
  }

  onSearch(query) {
    if (query !== '') {
      this.fields.map((field: string) => {
        let subfield;
        if (field.indexOf('.') !== -1) {
          subfield = field.split('.')[1];
          field = field.split('.')[0];
          this.source.setFilter([
            {
              field: field,
              search: query,
              filter: (cell: any, search: string) => {
                if (cell[subfield].toLowerCase().indexOf(search) !== -1) {
                  return true;
                } else {
                  return false;
                }
              }
            }
          ], false);
        } else {
          this.source.setFilter([
            {
              field: field,
              search: query,
            }
          ], false);
        }
      });
    } else {
      this.source.setFilter([]);
    }
  }

}
