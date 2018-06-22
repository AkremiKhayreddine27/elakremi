import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewSeasonComponent } from './dialog-new-season.component';

describe('DialogNewSeasonComponent', () => {
  let component: DialogNewSeasonComponent;
  let fixture: ComponentFixture<DialogNewSeasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogNewSeasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewSeasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
