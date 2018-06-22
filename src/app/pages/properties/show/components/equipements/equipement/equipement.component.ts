import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-equipement',
  templateUrl: './equipement.component.html',
  styleUrls: ['./equipement.component.scss']
})
export class EquipementComponent implements OnInit {

  @Input() equipements;

  @Input() title: string;
  @Input() type: string;
  on = false;

  @Output() clickEvent: EventEmitter<{ on: boolean }> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    if (this.equipements && this.equipements.length > 0) {
      this.equipements.map(equipement => {
        if (this.title === equipement.name) {
          this.on = true;
        }
      });
    }
  }

  clicked() {
    this.on = !this.on;
    this.clickEvent.emit({ on: this.on });
  }


}
