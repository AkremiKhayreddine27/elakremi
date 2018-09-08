import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatusCheckboxComponent } from './locatus-checkbox.component';

describe('LocatusCheckboxComponent', () => {
  let component: LocatusCheckboxComponent;
  let fixture: ComponentFixture<LocatusCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocatusCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatusCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
