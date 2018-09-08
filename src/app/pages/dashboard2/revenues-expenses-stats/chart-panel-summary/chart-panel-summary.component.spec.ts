import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPanelSummaryComponent } from './chart-panel-summary.component';

describe('ChartPanelSummaryComponent', () => {
  let component: ChartPanelSummaryComponent;
  let fixture: ComponentFixture<ChartPanelSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartPanelSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPanelSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
