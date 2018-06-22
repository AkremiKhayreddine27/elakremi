import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExportCalendarComponent } from './dialog-export-calendar.component';

describe('DialogExportCalendarComponent', () => {
  let component: DialogExportCalendarComponent;
  let fixture: ComponentFixture<DialogExportCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogExportCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogExportCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
