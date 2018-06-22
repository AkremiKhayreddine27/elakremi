import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewEventComponent } from './dialog-new-event.component';

describe('DialogNewEventComponent', () => {
  let component: DialogNewEventComponent;
  let fixture: ComponentFixture<DialogNewEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogNewEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
