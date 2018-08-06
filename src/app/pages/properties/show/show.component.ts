import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Property } from '../../../@core/data/models/property';
import { PropertyService } from '../../../@core/data/property.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as faker from 'faker';

@Component({
  selector: 'show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit, AfterViewInit {

  @ViewChild('form') form: FormGroup;

  property: Property;

  btnSaveClicked = false;

  identificationForm: FormGroup;

  localisationForm: FormGroup;

  hasOverlay = false;

  constructor(
    public cdr: ChangeDetectorRef,
    public route: ActivatedRoute,
    public propertyService: PropertyService) { }

  ngOnInit() {
    if (this.route.snapshot.params.id) {
      const id = this.route.snapshot.params.id;
      this.property = this.propertyService.find(Number.parseInt(id));
    } else {

    }
    this.buildForm();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  buildForm() {
    this.form = new FormGroup({
      default: new FormControl({
        id: this.property && this.property.id ? this.property.id : faker.random.number(),
        status: this.property && this.property.status ? this.property.status : this.propertyService.getStatus(2)
      }),
      identification: new FormControl({
        title: this.property && this.property.title ? this.property.title : null,
        description: this.property && this.property.description ? this.property.description : null,
        type: this.property && this.property.type ? this.property.type : null,
        platform: this.property && this.property.platform ? this.property.platform : null,
        owner: this.property && this.property.owner ? this.property.owner : null
      }),
      description: new FormControl({
        nbrRooms: this.property && this.property.nbrRooms ? this.property.nbrRooms : 0,
        nbrKitchens: this.property && this.property.nbrKitchens ? this.property.nbrKitchens : 0,
        nbrLounges: this.property && this.property.nbrLounges ? this.property.nbrLounges : 0,
        capacity: this.property && this.property.capacity ? this.property.capacity : 0,
        nbrBeds: this.property && this.property.nbrBeds ? this.property.nbrBeds : 0,
        nbrBathrooms: this.property && this.property.nbrBathrooms ? this.property.nbrBathrooms : 0,
        suitableForEvents: this.property && this.property.suitableForEvents ? this.property.suitableForEvents : false,
        acceptedAnimals: this.property && this.property.acceptedAnimals ? this.property.acceptedAnimals : false,
        smokingAccommodation: this.property && this.property.smokingAccommodation ? this.property.smokingAccommodation : false,
        language: this.property && this.property.language ? this.property.language : null,
        currency: this.property && this.property.currency ? this.property.currency : null,
        cellar: this.property && this.property.cellar ? this.property.cellar : false,
        terrace: this.property && this.property.terrace ? this.property.terrace : false,
        garage: this.property && this.property.garage ? this.property.garage : false,
        balkon: this.property && this.property.balkon ? this.property.balkon : false,
        garden: this.property && this.property.garden ? this.property.garden : false,
        guardian: this.property && this.property.guardian ? this.property.guardian : false,
      }),
      location: new FormControl(this.property && this.property.location ? this.property.location : null)
    });
  }

  get default(): FormControl { return this.form.get('default') as FormControl }

  get identification(): FormControl { return this.form.get('identification') as FormControl }

  get description(): FormControl { return this.form.get('description') as FormControl }

  get location(): FormControl { return this.form.get('location') as FormControl }

  optionsClicked() {
    this.hasOverlay = !this.hasOverlay;
  }

  save() {
    let property: any = {};
    if (this.form.valid) {
      Object.keys(this.default.value).map(key => {
        property[key] = this.default.value[key];
      });
      Object.keys(this.identification.value).map(key => {
        property[key] = this.identification.value[key];
      });
      Object.keys(this.description.value).map(key => {
        property[key] = this.description.value[key];
      });
      property.location = this.location.value;
      console.log(property);
      if (this.property) {
        this.propertyService.update(this.property, property);
      } else {
        this.propertyService.store(property);
      }
    }
  }

}
