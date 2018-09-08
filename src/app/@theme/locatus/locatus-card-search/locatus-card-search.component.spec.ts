import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatusCardSearchComponent } from './locatus-card-search.component';

describe('LocatusCardSearchComponent', () => {
  let component: LocatusCardSearchComponent;
  let fixture: ComponentFixture<LocatusCardSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocatusCardSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatusCardSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
