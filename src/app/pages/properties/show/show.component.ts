import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Property } from '../../../@core/data/models/property';
import { PropertyService } from '../../../@core/data/property.service';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  property: Property; 

  btnSaveClicked = false;

  identificationForm: FormGroup;

  localisationForm: FormGroup;

  hasOverlay = false;

  constructor(private route: ActivatedRoute, private propertyService: PropertyService) { }

  ngOnInit() {
    if (this.route.snapshot.params.id) {
      const id = this.route.snapshot.params.id;
      this.property = this.propertyService.find(Number.parseInt(id));
    } else {
      this.property = {
        id: 0,
        title: '',
        type: '',
        images: [],
        location: {
          mapLocation: {},
          userLocation: {},
          isMapAddress: false
        },
        nbr_chambre: 0,
        nbr_cuisine: 0,
        nbr_salon: 0,
        status: '',
        calendars: [],
        platforms: [],
        links: [],
        reservations: [],
        services: [],
        equipements: []
      }
    }
  }

  optionsClicked() {
    this.hasOverlay = !this.hasOverlay;
  }
  saveIdentificationForm(form) {
    this.identificationForm = form;
  }

  saveLocalisationForm(form) {
    this.localisationForm = form;
  }

  addProperty() {
    this.btnSaveClicked = true;

    /*
    if (!this.route.snapshot.params.id) {
      console.log(this.identificationForm);
      if (this.localisationForm.valid && this.identificationForm.valid) {
        this.property.location.address = this.localisationForm.value.address;
        this.property.location.city = this.localisationForm.value.city;
        this.property.location.country = this.localisationForm.value.country;
        this.property.location.latitude = this.localisationForm.value.latitude;
        this.property.location.longitude = this.localisationForm.value.longitude;
        this.property.location.postcode = this.localisationForm.value.postcode;
        this.property.location.state = this.identificationForm.value.state;
        this.property.id = this.propertyService.properties.length + 1;
        this.property.title = this.identificationForm.value.name;
        this.property.type = this.identificationForm.value.type;
        this.property.platforms = [this.identificationForm.value.platform];
        this.propertyService.add(this.property);
      }
    }*/
  }

}
