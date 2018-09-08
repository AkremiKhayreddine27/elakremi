import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatusPaginationComponent } from './locatus-pagination.component';

describe('LocatusPaginationComponent', () => {
  let component: LocatusPaginationComponent;
  let fixture: ComponentFixture<LocatusPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocatusPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatusPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
