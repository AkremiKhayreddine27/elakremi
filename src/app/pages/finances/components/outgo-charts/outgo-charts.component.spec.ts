import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutgoChartsComponent } from './outgo-charts.component';

describe('OutgoChartsComponent', () => {
  let component: OutgoChartsComponent;
  let fixture: ComponentFixture<OutgoChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutgoChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutgoChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
