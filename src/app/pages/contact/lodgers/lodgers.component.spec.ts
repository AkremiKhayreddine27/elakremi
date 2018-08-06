import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LodgersComponent } from './lodgers.component';

describe('LodgersComponent', () => {
  let component: LodgersComponent;
  let fixture: ComponentFixture<LodgersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LodgersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LodgersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
