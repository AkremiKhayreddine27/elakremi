import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Property } from '../../../../../@core/data/models/property';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as dateFns from 'date-fns';
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
    'Appartement',
    'Appartement Corporatif',
    'Bed & Breakfast',
    'Bungalow',
    'Bateau',
    'Camping',
    'Caravane',
    'Chalet',
    "Chambre d'hotes",
    'Chateau',
    'Ferme',
    "Grange Aménagée",
    'Gite',
    'Hostal',
    'Hotel suites',
    'Hotel/Auberge',
    'Immeuble',
    'Maison',
    'Manoir/Chateau',
    'Mas',
    'Mobil Home',
    'Pavillon',
    'Péniche',
    'Refuge',
    'Riad',
    'Studio',
    'Villa',
    'Village Vacances Tout Compris',
    'Yacht'
  ];

  platforms = [
    'Airbnb',
    'Abritel',
    'Autre',
    'EasyLocatus'
  ];

  owners = [
    'Jhon Doe',
    'Jane Doe'
  ];

  owner = this.owners[0];

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [this.property.title ? this.property.title : null, Validators.required],
      description: [this.property.description ? this.property.description : null],
      type: [this.property.type ? this.property.type : null, Validators.required],
      platform: [this.property.platforms[0] ? this.property.platforms[0] : null],
      owner: [null, Validators.required]
    });
    this.saveData.emit({ form: this.form });
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
