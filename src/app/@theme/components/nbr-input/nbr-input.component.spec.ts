import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbrInputComponent } from './nbr-input.component';

describe('NbrInputComponent', () => {
  let component: NbrInputComponent;
  let fixture: ComponentFixture<NbrInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbrInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbrInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
