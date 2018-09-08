import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionByPlatormByRevenueComponent } from './distribution-by-platorm-by-revenue.component';

describe('DistributionByPlatormByRevenueComponent', () => {
  let component: DistributionByPlatormByRevenueComponent;
  let fixture: ComponentFixture<DistributionByPlatormByRevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributionByPlatormByRevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributionByPlatormByRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
