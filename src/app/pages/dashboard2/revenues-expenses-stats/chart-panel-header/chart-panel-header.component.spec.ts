import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPanelHeaderComponent } from './chart-panel-header.component';

describe('ChartPanelHeaderComponent', () => {
  let component: ChartPanelHeaderComponent;
  let fixture: ComponentFixture<ChartPanelHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartPanelHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPanelHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
