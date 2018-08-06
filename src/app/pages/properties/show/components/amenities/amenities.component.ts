import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.scss']
})
export class AmenitiesComponent implements OnInit {

  isCollapsed: boolean = true;

  public amenties = [
    { id: 1, name: 'Parking' },
    { id: 2, name: 'Salle de sport' },
    { id: 3, name: 'Jacuzzi' },
    { id: 4, name: 'Piscine' },
    { id: 5, name: 'Ascenseur' },
    { id: 6, name: 'Interphone' },
    { id: 7, name: 'Air de jeux' },
    { id: 8, name: 'accés internet' },
    { id: 9, name: 'Chauffage collectif' },
    { id: 10, name: 'laverie' },
    { id: 11, name: 'Climatisation' },
    { id: 12, name: 'Serrure Connecté' }
  ];

  constructor() { }

  ngOnInit() {
  }

}

