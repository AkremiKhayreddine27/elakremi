import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { PropertyService } from '../../../../@core/data/property.service';
import { ServicesService } from '../../../../@core/data/services.service';
import { Property } from '../../../../@core/data/models/property';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  service;

  @Input() source: LocalDataSource;

  @Output() hasFilters: EventEmitter<{ filters: any[] }> = new EventEmitter();

  public statuses: any[] = [
    { label: 'Status', value: 'Tous' },
    { label: 'validée', value: 'validée' },
    { label: 'provisoire', value: 'provisoire' },
    { label: 'annulée', value: 'annulée' },
    { label: 'terminée', value: 'terminée' }
  ];

  public status = this.statuses[0];

  public payementStatus: any[] = [
    { label: 'Statut de payement', value: 'Tous' },
    { label: 'payé', value: 'payé' },
    { label: 'à payer', value: 'à payer' }
  ];

  public paymentStat = this.payementStatus[0];

  public property = { label: this.propertyService.currentProperty.title, value: this.propertyService.currentProperty.title };

  properties = [];

  filters = [];

  public categories = [];

  public currentCategory;

  public subCategories = [];

  public currentSubCategory;

  public services = [];

  public currentService;

  currentProperty = this.propertyService.currentProperty ? this.propertyService.currentProperty : this.properties[0];

  constructor(public servicesService: ServicesService, private propertyService: PropertyService) { }

  ngOnInit() {
    this.service = this.servicesService.currentService;
    if (!this.currentProperty) {
      this.property = { label: 'Choisir un bien', value: 'Choisir un bien' };
    }
    this.properties = this.propertyService.properties.map(property => {
      return { label: property.title, value: property.title };
    });
    this.categories.push({ label: 'Catégorie', value: 'Tous', slug: 'Catégorie' });
    this.servicesService.getCategories().map(category => {
      this.categories.push({ label: category.title, value: category.title, slug: category });
    });
    if (this.service) {
      this.setFilter('type', this.service.title, {
        field: 'type',
        search: this.service.title,
        filter: (cell: any, search: string) => {
          if (cell.title === search) {
            return true;
          } else {
            return false;
          }
        }
      });
      this.hasFilters.emit({ filters: this.filters });
      this.source.setFilter(this.filters, true);
      this.servicesService.getCategories().map(category => {
        if (this.servicesService.currentService.subCategory.slug === category.slug) {
          this.subCategories = category.services.map(service => {
            if (service.slug === this.servicesService.currentService.slug) {
              this.currentSubCategory = { label: service.title, value: service.title, slug: service.slug };
            }
            return { label: service.title, value: service.title, slug: service.slug };
          });
          this.currentCategory = { label: category.title, value: category.title, slug: category };
        }
      });
    } else {
      this.currentCategory = { label: 'Catégorie', value: 'Tous', slug: 'Catégorie' };
      this.currentSubCategory = { label: 'Sous catégorie', value: 'Tous', slug: 'Sous catégorie' };
    }
  }

  setCategory(category) {
    this.currentCategory = category;
    this.currentSubCategory = { label: 'Sous catégorie', value: 'Tous', slug: 'Sous catégorie' };
    this.subCategories.push({ label: 'Sous catégorie', value: 'Tous', slug: 'Sous catégorie' });
    if (category.value !== 'Tous') {
      category.slug.services.map(category => {
        this.subCategories.push({ label: category.title, value: category.title, slug: category });
      });
    } else {
      this.subCategories = [];
    }

    this.setFilter('type', category.value, {
      field: 'type',
      search: category.value !== 'Tous' ? category.value : '',
      filter: (cell: any, search: string) => {
        if (cell.subCategory.title === search) {
          return true;
        } else {
          return false;
        }
      }
    });
    this.hasFilters.emit({ filters: this.filters });
    this.source.setFilter(this.filters, true);
  }

  setSubCategory(subCategory) {
    this.currentSubCategory = subCategory;
    this.setFilter('type', subCategory.value, {
      field: 'type',
      search: subCategory.value !== 'Tous' ? subCategory.value : '',
      filter: (cell: any, search: string) => {
        if (cell.title === search) {
          return true;
        } else {
          return false;
        }
      }
    });
    this.hasFilters.emit({ filters: this.filters });
    this.source.setFilter(this.filters, true);
  }

  setFilter(filter, selectValue, filtervalue) {
    let fiedlExist = this.filters.find(f => {
      return f.field === filter;
    });
    if (fiedlExist) {
      this.filters = this.filters.map(f => {
        if (f.field === filter) {
          f = filtervalue;
        }
        return f;
      });
    } else {
      this.filters.push(filtervalue);
    }
    if (this.currentCategory && this.currentCategory.value === 'Tous') {
      this.filters = this.filters.filter(f => {
        return f.field !== 'type';
      });
    }
  }

  setType(type) {
    this.currentService = type;
    this.setFilter('type', type.value, {
      field: 'type',
      search: type.value !== 'Tous' ? type.value : '',
      filter: (cell: any, search: string) => {
        if (cell.title === search) {
          return true;
        } else {
          return false;
        }
      }
    });
    this.hasFilters.emit({ filters: this.filters });
    this.source.setFilter(this.filters, true);
  }


  setCurrentProperty(propertyTitle) {
    const property = this.propertyService.properties.filter(p => {
      return p.title === propertyTitle.value;
    })[0];
    this.propertyService.setCurrentProperty(property);
  }

  setStatus(status) {
    this.setFilter('status', status.value, {
      field: 'status',
      search: status.value !== 'Tous' ? status.value : ''
    });
    this.hasFilters.emit({ filters: this.filters });
    this.source.setFilter(this.filters, true);
  }

  setPaymentStatus(paymentStatus) {
    this.setFilter('paymentStatus', paymentStatus.value, {
      field: 'paymentStatus',
      search: paymentStatus.value !== 'Tous' ? paymentStatus.value : '',
      filter: (cell: any, search: string) => {
        if (cell === search) {
          return true;
        } else {
          return false;
        }
      }
    });
    this.hasFilters.emit({ filters: this.filters });
    this.source.setFilter(this.filters, true);
  }

}
