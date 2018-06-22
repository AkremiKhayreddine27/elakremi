import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCheckInComponent } from './dialog-check-in.component';

describe('DialogCheckInComponent', () => {
  let component: DialogCheckInComponent;
  let fixture: ComponentFixture<DialogCheckInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCheckInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
