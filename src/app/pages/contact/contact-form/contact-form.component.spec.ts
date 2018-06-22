import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewContactComponent } from './contact-form.component';

describe('DialogNewContactComponent', () => {
  let component: DialogNewContactComponent;
  let fixture: ComponentFixture<DialogNewContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogNewContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
