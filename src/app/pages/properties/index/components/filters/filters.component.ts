import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { PropertyService } from '../../../../../@core/data/property.service';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Output() hasFilters: EventEmitter<{ filters: any[] }> = new EventEmitter();

  types = [
    { label: 'Type', value: 'Tous' },
    { label: 'Appartement', value: 'Appartement' },
    { label: 'Appartement Corporatif', value: 'Appartement Corporatif' },
    { label: 'Bed & Breakfast', value: 'Bed & Breakfast' },
    { label: 'Bungalow', value: 'Bungalow' },
    { label: 'Bateau', value: 'Bateau' },
    { label: 'Camping', value: 'Camping' },
    { label: 'Caravane', value: 'Caravane' },
    { label: 'Chalet', value: 'Chalet' },
    { label: "Chambre d'hotes", value: "Chambre d'hotes" },
    { label: 'Chateau', value: 'Chateau' },
    { label: 'Ferme', value: 'Ferme' },
    { label: 'Gite', value: 'Gite' },
    { label: "Grange Aménagée", value: "Grange Aménagée" },
    { label: 'Hostal', value: 'Hostal' },
    { label: 'Hotel suites', value: 'Hotel suites' },
    { label: 'Hotel/Auberge', value: 'Hotel/Auberge' },
    { label: 'Immeuble', value: 'Immeuble' },
    { label: 'Maison', value: 'Maison' },
    { label: 'Manoir/Chateau', value: 'Manoir/Chateau' },
    { label: 'Mas', value: 'Mas' },
    { label: 'Mobil Home', value: 'Mobil Home' },
    { label: 'Pavillon', value: 'Pavillon' },
    { label: 'Péniche', value: 'Péniche' },
    { label: 'Refuge', value: 'Refuge' },
    { label: 'Riad', value: 'Riad' },
    { label: 'Studio', value: 'Studio' },
    { label: 'Villa', value: 'Villa' },
    { label: 'Village Vacances Tout Compris', value: 'Village Vacances Tout Compris' },
    { label: 'Yacht', value: 'Yacht' },
  ];

  platforms = [
    { label: 'Platform', value: 'Tous' },
    { label: 'Airbnb', value: 'Airbnb' },
    { label: 'Abritel', value: 'Abritel' },
    { label: 'Autre', value: 'Autre' },
    { label: 'EasyLocatus', value: 'EasyLocatus' }
  ];

  statuses = [
    { label: 'Statut', value: 'Tous' },
    { label: 'réservé', value: 'réservé' },
    { label: 'disponible', value: 'disponible' },
    { label: 'indisponible', value: 'indisponible' }
  ];

  filters = [];

  type = this.types[0];

  platform = this.platforms[0];

  status = this.statuses[0];

  source: LocalDataSource = new LocalDataSource();

  constructor(private propertyService: PropertyService) { }

  ngOnInit() {
    this.source = this.propertyService.all();
  }

  setType(type) {
    this.type = type;
    this.setFilter('type', type, {
      field: 'type',
      search: type.value !== 'Tous' ? type.value : ''
    });
    this.hasFilters.emit({ filters: this.filters });
    this.source.setFilter(this.filters, true);
  }

  setPlatform(platform) {
    this.platform = platform;
    this.setFilter('platforms', platform, {
      field: 'platforms',
      search: platform.value !== 'Tous' ? platform.value : '',
      filter: (cell: any, search: string) => {
        const exists = cell.filter(p => {
          return p === search;
        });
        if (exists.length > 0) {
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
    let exist = this.filters.find(f => {
      return f.field === filter
    });
    if (exist) {
      this.filters = this.filters.map(f => {
        if (f.field === filter) {
          f = filtervalue;
        }
        return f;
      });
    } else {
      if (selectValue.value !== 'Tous') {
        this.filters.push(filtervalue);
      }
    }
  }

  setStatus(status) {
    this.status = status;
    this.setFilter('status', status, {
      field: 'status',
      search: status.value !== 'Tous' ? status.value : '',
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
