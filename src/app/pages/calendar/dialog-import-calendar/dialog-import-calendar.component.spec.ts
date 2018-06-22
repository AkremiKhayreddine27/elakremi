import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogImportCalendarComponent } from './dialog-import-calendar.component';

describe('DialogImportCalendarComponent', () => {
  let component: DialogImportCalendarComponent;
  let fixture: ComponentFixture<DialogImportCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogImportCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogImportCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
