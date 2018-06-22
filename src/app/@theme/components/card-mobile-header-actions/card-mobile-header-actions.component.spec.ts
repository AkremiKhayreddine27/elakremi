import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMobileHeaderActionsComponent } from './card-mobile-header-actions.component';

describe('CardMobileHeaderActionsComponent', () => {
  let component: CardMobileHeaderActionsComponent;
  let fixture: ComponentFixture<CardMobileHeaderActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardMobileHeaderActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardMobileHeaderActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
