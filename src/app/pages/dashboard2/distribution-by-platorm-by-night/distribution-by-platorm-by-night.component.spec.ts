import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionByPlatormByNightComponent } from './distribution-by-platorm-by-night.component';

describe('DistributionByPlatormByNightComponent', () => {
  let component: DistributionByPlatormByNightComponent;
  let fixture: ComponentFixture<DistributionByPlatormByNightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributionByPlatormByNightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributionByPlatormByNightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
