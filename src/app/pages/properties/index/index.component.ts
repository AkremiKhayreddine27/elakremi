import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Property } from '../../../@core/data/models/property';
import { PropertyService } from '../../../@core/data/property.service';
import { Router } from '@angular/router';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  isFilterCollapsed = true;

  isSearching = false;

  isGridView = true;

  properties: Property[] = [];

  headerActions = [
    { title: 'Chercher', type: 'link', icon: 'fa fa-search', clickAction: 'search', displayInMobile: true },
    { title: 'Filtrer', type: 'link', icon: 'fa fa-filter', clickAction: 'filter', displayInMobile: false },
    {
      title: 'Trier', type: 'dropdown', icon: 'fa fa-sort', dropdownItems: [
        {
          title: 'Type',
          action: 'sort',
          value: 'type',
          direction: 'asc'
        },
        {
          title: 'Statut',
          action: 'sort',
          value: 'status',
          direction: 'asc',
        },
        {
          title: 'Platform',
          action: 'sort',
          value: 'platform',
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

  total;
  paging;

  constructor(public propertyService: PropertyService, public router: Router) { }

  ngOnInit() {
    this.source = this.propertyService.all();
    this.source.setFilter([]);
    this.source.setPaging(1, 9);
    this.source.setPage(1);
    this.source.onChanged().subscribe(value => {
      if (value.action === 'load') {
        this.total = value.elements.length;
      }
      this.paging = value.paging;
      this.properties = value.elements;
    });
    this.propertyService.refresh.subscribe(properties => {
      this.source = this.propertyService.all();
      this.properties = properties;
    });
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

  sort(element) {
    element.direction = element.direction === 'asc' ? 'desc' : 'asc';
    this.source.setSort([
      {
        field: element.value,
        direction: element.direction
      }
    ]);
  }

  filter() {
    this.isFilterCollapsed = !this.isFilterCollapsed;
    this.isSearching = false;
  }

  add() {
    this.router.navigateByUrl('/pages/properties/create');
  }

  onSearch(query) {
    if (query !== '') {
      this.source.setFilter([
        {
          field: 'title',
          search: query
        },
        {
          field: 'location',
          search: query,
          filter: (cell: any, search: string) => {
            if (cell.address.toLowerCase().indexOf(search) !== -1) {
              return true;
            } else {
              return false;
            }
          }
        }
      ], false);
    } else {
      this.source.setFilter([]);
    }
  }

  hasFilters(filters) {
    const w = filters.filter(f => {
      return f.search !== '';
    });
    this.withFilters = w.length === 0 ? false : true;
  }

}
