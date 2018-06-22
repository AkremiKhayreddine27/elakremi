import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewPaymentComponent } from './dialog-new-payment.component';

describe('DialogNewPaymentComponent', () => {
  let component: DialogNewPaymentComponent;
  let fixture: ComponentFixture<DialogNewPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogNewPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
