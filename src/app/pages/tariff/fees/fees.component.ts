import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.scss']
})
export class FeesComponent implements OnInit {

  isCollapsed = true;

  tariff = {
    caution : 0,
    byNight: 0,
    inclusive: 0
  };

  constructor() { }

  ngOnInit() {
  }

}
