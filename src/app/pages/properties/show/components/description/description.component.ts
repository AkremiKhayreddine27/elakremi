import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  isCollapsed: boolean = true;

  @Input() property;

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
  ];

  language = this.languages[0];

  currency = this.currencies[0];


  constructor() { }

  ngOnInit() {
  }

}
