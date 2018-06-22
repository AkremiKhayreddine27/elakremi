import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'card-mobile-header-actions',
  templateUrl: './card-mobile-header-actions.component.html',
  styleUrls: ['./card-mobile-header-actions.component.scss']
})
export class CardMobileHeaderActionsComponent implements OnInit {

  @Input() actions;

  @Input() isFilterCollapsed;

  @Output() actionEvent: EventEmitter<{ action : string }> = new EventEmitter();

  @Output() dropdownItemEvent: EventEmitter<{ item: any }> = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  actionClicked(action) {
    this.actionEvent.emit({action: action});
  }

  toggleClicked(action) {
    action.icon = action.firstIcon === action.icon ? action.secondIcon : action.firstIcon;
    this.actionEvent.emit({ action: action.clickAction });
  }

  dropdownItemClicked(item) {
    this.dropdownItemEvent.emit({ item: item });
  }

}
