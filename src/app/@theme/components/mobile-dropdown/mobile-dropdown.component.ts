import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'mobile-dropdown',
  templateUrl: './mobile-dropdown.component.html',
  styleUrls: ['./mobile-dropdown.component.scss']
})
export class MobileDropdownComponent implements OnInit {

  @Input() data;

  @Input() options;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  actionClicked(action, data) {
    this.activeModal.close({ action: action, data: data });
  }

}
