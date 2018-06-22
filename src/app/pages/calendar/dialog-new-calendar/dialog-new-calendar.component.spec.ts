import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewCalendarComponent } from './dialog-new-calendar.component';

describe('DialogNewCalendarComponent', () => {
  let component: DialogNewCalendarComponent;
  let fixture: ComponentFixture<DialogNewCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogNewCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
