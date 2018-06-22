import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nbr-input',
  templateUrl: './nbr-input.component.html',
  styleUrls: ['./nbr-input.component.scss']
})
export class NbrInputComponent implements OnInit {

  @Input()
  number: number;

  @Output()
  numberChanged: EventEmitter<{ number }> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  increment() {
    this.number++;
    this.numberChanged.emit({ number: this.number });
  }

  decrement() {
    if (this.number > 0) {
      this.number--;
      this.numberChanged.emit({ number: this.number });
    }
  }

}
