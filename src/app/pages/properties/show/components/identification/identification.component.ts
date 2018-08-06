import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Property } from '../../../../../@core/data/models/property';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent implements OnInit {

  isCollapsed: boolean = true;

  @Input() property: Property;

  @Input() btnSaveClicked;

  @Output() saveData: EventEmitter<{ form: FormGroup }> = new EventEmitter();

  types = [
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
    { label: "Grange Aménagée", value: "Grange Aménagée" },
    { label: 'Gite', value: 'Gite' },
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
    { label: 'Yacht', value: 'Yacht' }
  ];

  type = { label: 'Choisir un type', value: 'Choisir un type', default: true };

  platforms = [
    { label: 'Airbnb', value: 'Airbnb' },
    { label: 'Abritel', value: 'Abritel' },
    { label: 'Autre', value: 'Autre' },
    { label: 'EasyLocatus', value: 'EasyLocatus' }
  ];

  platform = { label: 'Choisir une platform', value: 'Choisir une platform', default: true };

  owners: Observable<any[]>;

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.owners = this.getContacts();
    this.form = this.formBuilder.group({
      name: [this.property.title ? this.property.title : null, Validators.required],
      description: [this.property.description ? this.property.description : null],
      type: [this.property.type ? this.property.type : null, Validators.required],
      platform: [this.property.platforms[0] ? this.property.platforms[0] : null],
      owner: [this.property.owner, Validators.required]
    });
    this.saveData.emit({ form: this.form });
  }

  getContacts(): Observable<any[]> {
    if (this.property.owner) {
      return of([this.property.owner]).pipe(delay(500));
    } else {
      return of([]).pipe(delay(500));

    }
  }

  setType(type) {
    this.form.patchValue({ type: type });
    this.property.type = type;
    this.saveData.emit({ form: this.form });
  }

  setPlatform(platform) {
    this.form.patchValue({ platform: platform });
    this.property.platforms = platform;
    this.saveData.emit({ form: this.form });
  }

  setName(name) {
    this.property.title = name;
    this.saveData.emit({ form: this.form });
  }

  setOwner(owner) {
    this.form.patchValue({ owner: owner });
    this.saveData.emit({ form: this.form });
  }
}
