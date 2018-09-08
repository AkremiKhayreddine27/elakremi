import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatusFiltersComponent } from './locatus-filters.component';

describe('LocatusFiltersComponent', () => {
  let component: LocatusFiltersComponent;
  let fixture: ComponentFixture<LocatusFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocatusFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatusFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
