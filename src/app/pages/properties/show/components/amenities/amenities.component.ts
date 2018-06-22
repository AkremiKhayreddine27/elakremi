import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.scss']
})
export class AmenitiesComponent implements OnInit {

  isCollapsed: boolean = true;

  private amenties = [
    { name: 'Parking' },
    { name: 'Salle de sport' },
    { name: 'Jacuzzi' },
    { name: 'Piscine' },
    { name: 'Ascenseur' },
    { name: 'Interphone' },
    { name: 'Air de jeux' },
    { name: 'accés internet' },
    { name: 'Chauffage collectif' },
    { name: 'laverie' },
    { name: 'Climatisation' },
    { name: 'Serrure Connecté' }
  ];

  constructor() { }

  ngOnInit() {
  }

}

