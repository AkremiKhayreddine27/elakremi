import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutgoComponent } from './outgo.component';

describe('OutgoComponent', () => {
  let component: OutgoComponent;
  let fixture: ComponentFixture<OutgoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutgoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
