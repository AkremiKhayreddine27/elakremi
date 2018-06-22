import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { PropertyService } from '../../../@core/data/property.service';
import { ReservationsService } from '../../../@core/data/reservations.service';
import { ServicesService } from '../../../@core/data/services.service';
import * as faker from 'faker';
import { FineUploader } from 'fine-uploader';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'dialog-new-document',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.scss']
})
export class DialogNewDocumentComponent implements OnInit {

  private uploader;

  private types: any[] = [
    {
      label: 'facture',
      value: 'facture'
    },
    {
      label: 'contrat',
      value: 'contrat'
    },
    {
      label: 'paiement',
      value: 'paiement'
    },
    {
      label: 'autre',
      value: 'autre'
    }
  ];

  private type = { label: 'Choisir un Type', value: 'Choisir un Type' };

  private associations = [
    { label: 'Bien', value: 'Bien' },
    { label: 'Réservation', value: 'Réservation' },
    { label: 'Service', value: 'Service' },
    { label: 'Paiement', value: 'Paiement' }
  ];

  private currentAssociation = this.associations[0];

  private currentAssociationValue;

  document = {
    title: null,
    description: null,
    type: null
  }

  private owner;

  form: FormGroup;

  properties = [];

  reservations = [];

  services = [];

  currentProperty = { label: this.propertyService.currentProperty.title, value: this.propertyService.currentProperty.title, data: this.propertyService.currentProperty };

  constructor(
    public activeModal: NgbActiveModal,
    private propertyService: PropertyService,
    private reservationsService: ReservationsService,
    private servicesService: ServicesService) { }

  ngOnInit() {
    this.uploader = new FineUploader({
      element: document.getElementById('uploader'),
      autoUpload: false,
      text: {
        defaultResponseError: 'Le téléchargement a échoué'
      },
      callbacks: {
        onComplete: (id, name, responseJSON, xhr) => {
          console.log(responseJSON);
          if (responseJSON.success) {
            this.close();
          }
        }
      }
    });
    this.form = new FormGroup({
      id: new FormControl(faker.random.number()),
      title: new FormControl(this.document.title),
      description: new FormControl(this.document.description),
      type: new FormControl(this.document.type)
    });
    this.properties = this.propertyService.properties.map(property => {
      return { label: property.title, value: property.title, data: property };
    });
    this.currentAssociationValue = { label: this.propertyService.currentProperty.title, value: this.propertyService.currentProperty.title, data: this.propertyService.currentProperty };
  }

  get description() { return this.form.get('description'); }

  get title() { return this.form.get('title'); }

  setType(type) {
    this.form.patchValue({ type: type.element.value });
  }

  setProperty(property) {
    this.currentProperty = property.element;
    switch (this.currentAssociation.value) {
      case 'Réservation':
        this.services = [];
        this.reservations = this.currentProperty.data.reservations.map(reservation => {
          return { label: reservation.title, value: reservation.title, data: reservation };
        });
        break;
      case 'Service':
        this.reservations = [];
        this.services = this.currentProperty.data.services.map(service => {
          return { label: service.title, value: service.title, data: service };
        });
        break;
    }
  }

  setAssociation(association) {
    this.currentProperty = { label: this.propertyService.currentProperty.title, value: this.propertyService.currentProperty.title, data: this.propertyService.currentProperty };
    this.currentAssociation = association.element;
    const unOrUne = association.element.value === 'Réservation' ? 'une' : 'un';
    this.currentAssociationValue = {
      label: 'Choisir ' + unOrUne + ' ' + association.element.value,
      value: 'Choisir ' + unOrUne + ' ' + association.element.value
    }
    switch (association.element.value) {
      case 'Réservation':
        this.services = [];
        this.reservations = this.currentProperty.data.reservations.map(reservation => {
          return { label: reservation.title, value: reservation.title, data: reservation };
        });
        break;
      case 'Service':
        this.reservations = [];
        this.services = this.currentProperty.data.services.map(service => {
          return { label: service.title, value: service.title, data: service };
        });
        break;
      case 'Bien':
        this.reservations = [];
        this.services = [];
        this.properties = this.propertyService.properties.map(property => {
          return { label: property.title, value: property.title, data: property };
        });
        break;
      case 'Paiement':
        break;
    }
  }

  setOwner(owner) {
    this.owner = owner.element.data;

  }

  close() {
    this.activeModal.dismiss();
  }

  save() {
    this.uploader.uploadStoredFiles();
    if (this.owner) {
      this.owner.documents.push(this.form.value);
    }
  }

}
