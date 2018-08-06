import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { PropertyService } from '../../../@core/data/property.service';
import { ReservationsService } from '../../../@core/data/reservations.service';
import { ServicesService } from '../../../@core/data/services.service';
import * as faker from 'faker';
import { FineUploader } from 'fine-uploader';
import { DOCUMENT } from '@angular/common';
import { DocumentsService } from '../../../@core/data/documents.service';

@Component({
  selector: 'dialog-new-document',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.scss']
})
export class DialogNewDocumentComponent implements OnInit {

  @Input() document;

  public uploader;

  public types: any[] = [
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

  public type = { label: 'Choisir un Type', value: 'Choisir un Type' };

  public associations = [
    { label: 'Bien', value: 'Bien' },
    { label: 'Réservation', value: 'Réservation' },
    { label: 'Service', value: 'Service' },
    { label: 'Paiement', value: 'Paiement' }
  ];

  public currentAssociation = this.associations[0];

  public currentAssociationValue;

  public owner: any;

  public previousOwner: any;

  form: FormGroup;

  properties: any[] = [];

  reservations: any[] = [];

  services: any[] = [];

  currentProperty: any = { label: this.propertyService.currentProperty.title, value: this.propertyService.currentProperty.title, data: this.propertyService.currentProperty };

  constructor(
    public activeModal: NgbActiveModal,
    public propertyService: PropertyService,
    public reservationsService: ReservationsService,
    public servicesService: ServicesService,
    public documentsService: DocumentsService) { }

  ngOnInit() {
    this.uploader = new FineUploader({
      element: document.getElementById('uploader'),
      autoUpload: false,
      text: {
        defaultResponseError: 'Le téléchargement a échoué'
      },
      callbacks: {
        onComplete: (id, name, responseJSON, xhr) => {
          if (responseJSON.success) {
            this.close();
          }
        }
      }
    });
    this.form = new FormGroup({
      id: new FormControl(this.document ? this.document.id : faker.random.number()),
      title: new FormControl(this.document ? this.document.title : null),
      description: new FormControl(this.document ? this.document.description : null),
      type: new FormControl(this.document ? this.document.type : null),
      createdAt: new FormControl(new Date()),
      file: new FormControl(this.document ? this.document.file : null)
    });
    this.properties = this.propertyService.properties.map(property => {
      return { label: property.title, value: property.title, data: property };
    });
    this.currentAssociationValue = { label: this.propertyService.currentProperty.title, value: this.propertyService.currentProperty.title, data: this.propertyService.currentProperty };
    if (this.document) {
      if (this.document.file) {
        this.uploader.addInitialFiles([this.document.file]);
      }
      this.type = { label: this.document.type, value: this.document.type };
      this.currentAssociation = { label: this.document.owner.type, value: this.document.owner.type };
      this.currentAssociationValue = { label: this.document.owner.title, value: this.document.owner.title };
      switch (this.document.owner.type) {
        case 'Réservation':
          this.services = [];
          this.reservations = this.currentProperty.data.reservations.map(reservation => {
            if (this.document.owner.id === reservation.id) {
              this.owner = { label: reservation.title, value: reservation.title, data: reservation };
              this.previousOwner = reservation;
            }
            return { label: reservation.title, value: reservation.title, data: reservation };
          });
          break;
        case 'Service':
          this.reservations = [];
          this.services = this.currentProperty.data.services.map(service => {
            if (this.document.owner.id === service.id) {
              this.owner = { label: service.title, value: service.title, data: service };
              this.previousOwner = service;
            }
            return { label: service.title, value: service.title, data: service };
          });
          break;
        case 'Bien':
          this.reservations = [];
          this.services = [];
          this.properties = this.propertyService.properties.map(property => {
            if (this.document.owner.id === property.id) {
              this.owner = { label: property.title, value: property.title, data: property };
              this.previousOwner = property;
            }
            return { label: property.title, value: property.title, data: property };
          });
          break;
        case 'Paiement':
          break;
      }
    }
  }

  get description(): any { return this.form.get('description'); }

  get title(): any { return this.form.get('title'); }

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
    if (this.document) {
      //this.documentsService.update(this.currentProperty.data, this.previousOwner, this.owner, this.form.value);
    } else {
      if (this.owner) {
        this.form.patchValue({ file: this.uploader.getUploads()[0].file });
        this.uploader.uploadStoredFiles();
        //this.documentsService.add(this.currentProperty.data, this.owner, this.form.value);
      }
    }
  }

}
