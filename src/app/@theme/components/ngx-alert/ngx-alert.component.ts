import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-alert',
  templateUrl: './ngx-alert.component.html',
  styleUrls: ['./ngx-alert.component.scss']
})
export class NgxAlertComponent implements OnInit {

  @Input() message;

  @Input() actions;

  @Output() actionClicked: EventEmitter<{ action: string }> = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

}
