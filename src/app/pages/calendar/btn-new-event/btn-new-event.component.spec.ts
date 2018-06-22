import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnNewEventComponent } from './btn-new-event.component';

describe('BtnNewEventComponent', () => {
  let component: BtnNewEventComponent;
  let fixture: ComponentFixture<BtnNewEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnNewEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnNewEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
