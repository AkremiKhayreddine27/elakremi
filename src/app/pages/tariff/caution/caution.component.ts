import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'caution',
  templateUrl: './caution.component.html',
  styleUrls: ['./caution.component.scss']
})
export class CautionComponent implements OnInit {

  isCollapsed = true;

  tariff = {
    caution : 0
  };
  
  constructor() { }

  ngOnInit() {
  }

}
