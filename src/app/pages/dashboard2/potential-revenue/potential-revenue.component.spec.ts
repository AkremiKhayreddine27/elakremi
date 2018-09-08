import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialRevenueComponent } from './potential-revenue.component';

describe('PotentialRevenueComponent', () => {
  let component: PotentialRevenueComponent;
  let fixture: ComponentFixture<PotentialRevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotentialRevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotentialRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
