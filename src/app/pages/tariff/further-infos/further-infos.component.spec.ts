import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FurtherInfosComponent } from './further-infos.component';

describe('FurtherInfosComponent', () => {
  let component: FurtherInfosComponent;
  let fixture: ComponentFixture<FurtherInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FurtherInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FurtherInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
