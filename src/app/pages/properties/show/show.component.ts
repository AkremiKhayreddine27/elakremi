import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '../../../@core/data/models/property';
import { PropertyService } from '../../../@core/data';
import { FormGroup, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import * as faker from 'faker';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../../store';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('form') form: FormGroup;

  property: Property;

  hasOverlay = false;

  isSubmitted: boolean = false;

  amenties = [];

  selectedPropertySubscription: Subscription;

  constructor(
    private store: Store<fromStore.LocatusState>,
    public cdr: ChangeDetectorRef,
    public route: ActivatedRoute,
    public router: Router,
    public propertyService: PropertyService) { }

  ngOnInit() {
    this.amenties = Object.assign([], this.propertyService.amenties);
    if (this.route.snapshot.params.id) {
      const id = this.route.snapshot.params.id;
      this.store.dispatch(new fromStore.SelectProperty((Number.parseInt(id))));
      this.selectedPropertySubscription = this.store.select<any>(fromStore.getSelectedProperty)
        .subscribe((property: Property) => {
          this.property = property;
        });
      this.selectedPropertySubscription = this.store.select<any>(fromStore.getPropertiesError)
        .subscribe((error) => {
          if(error) {
            this.router.navigate(['/pages/properties']);
          }
        });
      //this.property = this.propertyService.find(Number.parseInt(id));
    }
    this.buildForm();
  }

  ngOnDestroy() {
    if (this.selectedPropertySubscription) {
      this.selectedPropertySubscription.unsubscribe();
    }
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
      }, this.isIdentificationValid()),
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
      location: new FormControl(this.property && this.property.location ? this.property.location : null),
      images: new FormControl(this.property && this.property.images ? this.property.images : []),
      links: new FormControl(this.property && this.property.links ? this.property.links : []),
      amenities: new FormControl(this.property && this.property.amenities ? this.property.amenities : [])
    });
  }

  get default(): FormControl { return this.form.get('default') as FormControl }

  get identification(): FormControl { return this.form.get('identification') as FormControl }

  isIdentificationValid(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const identification = control.value;
      const valid = identification && identification !== null && identification.title && identification.type && identification.platform && identification.owner;
      return !valid ? { 'invalidIdentification': { value: control.value } } : null;
    };
  }

  get description(): FormControl { return this.form.get('description') as FormControl }

  get location(): FormControl { return this.form.get('location') as FormControl }

  get images(): FormControl { return this.form.get('images') as FormControl }

  get links(): FormControl { return this.form.get('links') as FormControl }

  get amenities(): FormControl { return this.form.get('amenities') as FormControl }

  optionsClicked() {
    this.hasOverlay = !this.hasOverlay;
  }

  save() {
    this.isSubmitted = true;
    let property: any = {};
    console.log(this.identification.valid);
    console.log(this.form);
    if (this.form.valid) {
      console.log('valid form');
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
      property.images = this.images.value;
      property.links = this.links.value;
      property.amenities = this.amenities.value;
      if (this.property) {
        this.propertyService.update(this.property, property);
      } else {
        this.propertyService.store(property);
      }
    } else {
      console.log('invalid form');
    }
  }

}
