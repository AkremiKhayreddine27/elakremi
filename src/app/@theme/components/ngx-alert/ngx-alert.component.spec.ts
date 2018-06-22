import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAlertComponent } from './ngx-alert.component';

describe('NgxAlertComponent', () => {
  let component: NgxAlertComponent;
  let fixture: ComponentFixture<NgxAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
