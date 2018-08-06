import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileDropdownComponent } from './mobile-dropdown.component';

describe('MobileDropdownComponent', () => {
  let component: MobileDropdownComponent;
  let fixture: ComponentFixture<MobileDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
