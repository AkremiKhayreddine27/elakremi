import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialGoalComponent } from './potential-goal.component';

describe('PotentialGoalComponent', () => {
  let component: PotentialGoalComponent;
  let fixture: ComponentFixture<PotentialGoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotentialGoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotentialGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
