import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'potential-goal',
  templateUrl: './potential-goal.component.html',
  styleUrls: ['./potential-goal.component.scss']
})
export class PotentialGoalComponent {

  flipped = false;

  toggleView() {
    this.flipped = !this.flipped;
  }

}
