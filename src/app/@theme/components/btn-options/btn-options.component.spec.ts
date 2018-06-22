import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnOptionsComponent } from './btn-options.component';

describe('BtnOptionsComponent', () => {
  let component: BtnOptionsComponent;
  let fixture: ComponentFixture<BtnOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
