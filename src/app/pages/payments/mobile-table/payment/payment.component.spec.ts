import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilePaymentComponent } from './payment.component';

describe('PaymentComponent', () => {
  let component: MobilePaymentComponent;
  let fixture: ComponentFixture<MobilePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobilePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
