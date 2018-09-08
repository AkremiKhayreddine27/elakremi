import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Property } from '../../../@core/data/models/property';
import { PropertyService } from '../../../@core/data';
import { Router } from '@angular/router';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../../store';
import { Pagination, FilterConf, SortConf } from '../../../store/helpers';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent implements OnInit {

  isFilterCollapsed = true;

  isSearching = false;

  isGridView = true;

  properties$: Observable<Property[]>;
  pagination$: Observable<Pagination>;
  total$: Observable<number>;

  headerActions = [
    { title: 'Chercher', type: 'link', icon: 'fa fa-search', clickAction: 'search', displayInMobile: true },
    { title: 'Filtrer', type: 'link', icon: 'fa fa-filter', clickAction: 'filter', displayInMobile: false },
    {
      title: 'Trier', type: 'dropdown', icon: 'fa fa-sort', dropdownItems: [
        {
          title: 'Type',
          action: 'sort',
          value: 'type.value',
          direction: 'asc'
        },
        {
          title: 'Statut',
          action: 'sort',
          value: 'status.value',
          direction: 'asc',
        },
        {
          title: 'Platform',
          action: 'sort',
          value: 'platform.value',
          direction: 'asc',
        }
      ], displayInMobile: false
    },
    { title: 'Ajouter', type: 'link', icon: 'fa fa-plus', clickAction: 'add', displayInMobile: false },
    {
      title: 'Autres', type: 'dropdown', icon: 'fa fa-ellipsis-h', dropdownItems: [
        {
          title: 'Import',
          action: 'settings',
          icon: 'fa fa-upload',
        },
        {
          title: 'Export',
          action: 'settings',
          icon: 'fa fa-download',
        }
      ], displayInMobile: false
    }
  ];

  searchFields = ['title', 'location.address'];

  source: LocalDataSource = new LocalDataSource();

  withFilters = false;

  filters = [];

  filtersConf: FilterConf;
  sortConf: SortConf[] = [];

  constructor(
    private store: Store<fromStore.LocatusState>,
    public propertyService: PropertyService,
    public router: Router) { }

  ngOnInit() {
    this.filters = [
      {
        name: 'type',
        type: 'select',
        field: 'type',
        placeholder: 'Choisir un type',
        elements: this.propertyService.getTypes(),
        callback: function (cell: any, search: any) {
          if (cell.id.toString() === search) {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        name: 'platforms',
        type: 'select',
        field: 'platforms',
        placeholder: 'Choisir une platform',
        elements: this.propertyService.getPlatforms(),
        callback: function (cell: any, search: any) {
          const exist = cell.find(c => {
            return c.id.toString() === search;
          });
          return exist;
        }
      },
      {
        name: 'status',
        type: 'select',
        placeholder: 'Choisir un statut',
        field: 'status',
        callback: function (cell: any, search: any) {
          if (cell.id.toString() === search) {
            return true;
          } else {
            return false;
          }
        },
        elements: this.propertyService.getStatuses(),
      }
    ];

    this.total$ = this.store.select<any>(fromStore.getPropertiesCount);
    this.pagination$ = this.store.select<any>(fromStore.getPropertiesPagination);
    this.properties$ = this.store.select<any>(fromStore.getPaginatedSortedFiltredProperties);
    this.filtersConf = { filters: [], andOperator: true };
    this.store.dispatch(new fromStore.LoadProperties(this.filtersConf, [], { page: 1, perPage: 3 }));
    /*
    this.source.load(this.propertyService.all());
    this.source.setFilter([]);
    this.source.onChanged().subscribe(value => {
      this.properties = of(value.elements).pipe(delay(500));
    });
    this.propertyService.refresh.subscribe(properties => {
      this.source.load(this.propertyService.all());
      this.properties = of(properties).pipe(delay(500));
    });
    */
  }

  paginate(pagination: Pagination) {
    this.store.dispatch(new fromStore.LoadProperties({ ...this.filtersConf }, [...this.sortConf], { ...pagination }));
  }

  applyFilters(filters, config) {
    this.filtersConf = { filters, andOperator: true };
    this.store.dispatch(new fromStore.LoadProperties({ ...this.filtersConf }, [...this.sortConf], { page: 1, perPage: 3 }));
  }

  onSearch(filters: FilterConf) {
    this.filtersConf = filters;
    if (filters.filters.length === 0) {
      this.resetFilters();
    }
    this.store.dispatch(new fromStore.LoadProperties({ ...this.filtersConf }, [...this.sortConf], { page: 1, perPage: 3 }));
  }

  sort(element) {
    element.direction = element.direction === 'asc' ? 'desc' : 'asc';
    this.sortConf = [
      {
        field: element.value,
        direction: element.direction
      }
    ];
    this.store.dispatch(new fromStore.LoadProperties({ ...this.filtersConf }, [...this.sortConf], { page: 1, perPage: 10 }));
  }

  resetFilters() {
    this.filtersConf = { filters: [], andOperator: true };
  }

  handleFilter(action, data) {
    this[action](data);
  }

  handleHeaderEvent(event) {
    this[event.action]();
  }

  handleDropdownEvent(event) {
    this[event.item.action](event.item);
  }

  toggleDisplay() {
    this.isGridView = !this.isGridView;
  }

  search() {
    this.isSearching = !this.isSearching;
    this.isFilterCollapsed = true;
  }

  import(item) {
    console.log('import');
  }

  export(item) {
    console.log('export');
  }

  filter() {
    this.isFilterCollapsed = !this.isFilterCollapsed;
    this.isSearching = false;
  }

  add() {
    this.router.navigateByUrl('/pages/properties/create');
  }

  hasFilters(filters) {
    const w = filters.filter(f => {
      return f.search !== '';
    });
    this.withFilters = w.length === 0 ? false : true;
  }

}
