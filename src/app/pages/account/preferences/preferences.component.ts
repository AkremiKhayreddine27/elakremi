import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  languages = [
    { label: 'Arabe', value: 'Arabe' },
    { label: 'Espagnol', value: 'Espagnol' },
    { label: 'Français', value: 'Français' },
    { label: 'Italien', value: 'Italien' },
    { label: 'Portugais', value: 'Portugais' },
    { label: 'Anglais', value: 'Anglais' }
  ];

  currencies = [
    { label: 'Euro', value: 'Euro' },
    { label: 'Bitcoin', value: 'Bitcoin' },
    { label: 'Dollar', value: 'Dollar' }
  ]

  constructor() { }

  ngOnInit() {
  }

}
