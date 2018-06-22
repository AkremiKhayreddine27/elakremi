import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'further-infos',
  templateUrl: './further-infos.component.html',
  styleUrls: ['./further-infos.component.scss']
})
export class FurtherInfosComponent implements OnInit {

  isCollapsed = true;

  constructor() { }

  ngOnInit() {
  }

}
