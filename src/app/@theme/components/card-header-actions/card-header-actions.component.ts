import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'card-header-actions',
  templateUrl: './card-header-actions.component.html',
  styleUrls: ['./card-header-actions.component.scss']
})
export class CardHeaderActionsComponent implements OnInit {

  @Input() actions;

  @Input() defaultView;

  @Input() isFilterCollapsed;

  @Output() actionEvent: EventEmitter<{ action: string }> = new EventEmitter();

  @Output() dropdownItemEvent: EventEmitter<{ item: any }> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  actionClicked(action) {
    this.actionEvent.emit({ action: action });
  }
 
  toggleClicked(action) {
    action.icon = action.firstIcon === action.icon ? action.secondIcon : action.firstIcon;
    this.actionEvent.emit({ action: action.clickAction });
  }

  dropdownItemClicked(item) {
    this.dropdownItemEvent.emit({ item: item });
  }
}
