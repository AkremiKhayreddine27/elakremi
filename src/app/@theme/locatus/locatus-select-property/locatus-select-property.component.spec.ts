import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatusSelectPropertyComponent } from './locatus-select-property.component';

describe('LocatusSelectPropertyComponent', () => {
  let component: LocatusSelectPropertyComponent;
  let fixture: ComponentFixture<LocatusSelectPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocatusSelectPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatusSelectPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
