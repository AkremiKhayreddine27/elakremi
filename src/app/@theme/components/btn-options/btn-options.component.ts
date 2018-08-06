import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'btn-options',
  templateUrl: './btn-options.component.html',
  styleUrls: ['./btn-options.component.scss']
})
export class BtnOptionsComponent implements OnInit {

  @Output() openChange: EventEmitter<{}> = new EventEmitter();

  @Output() saveClicked: EventEmitter<{}> = new EventEmitter();

  @Output() cancelClicked: EventEmitter<{}> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  optionsClicked() {
    this.openChange.emit();
  }

  save() {
    this.saveClicked.emit();
  }

  cancel() {
    this.cancelClicked.emit();
  }

}
