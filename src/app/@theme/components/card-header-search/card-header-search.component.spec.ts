import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHeaderSearchComponent } from './card-header-search.component';

describe('CardHeaderSearchComponent', () => {
  let component: CardHeaderSearchComponent;
  let fixture: ComponentFixture<CardHeaderSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardHeaderSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardHeaderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
