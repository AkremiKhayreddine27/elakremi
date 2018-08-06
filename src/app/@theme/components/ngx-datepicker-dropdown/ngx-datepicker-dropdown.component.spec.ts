import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDatepickerDropdownComponent } from './ngx-datepicker-dropdown.component';

describe('NgxDatepickerDropdownComponent', () => {
  let component: NgxDatepickerDropdownComponent;
  let fixture: ComponentFixture<NgxDatepickerDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxDatepickerDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDatepickerDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
