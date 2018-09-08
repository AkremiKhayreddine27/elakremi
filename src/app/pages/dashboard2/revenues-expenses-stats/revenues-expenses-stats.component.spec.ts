import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenuesExpensesStatsComponent } from './revenues-expenses-stats.component';

describe('RevenuesExpensesStatsComponent', () => {
  let component: RevenuesExpensesStatsComponent;
  let fixture: ComponentFixture<RevenuesExpensesStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenuesExpensesStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenuesExpensesStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
