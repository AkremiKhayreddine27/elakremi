import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentielComponent } from './potentiel.component';

describe('PotentielComponent', () => {
  let component: PotentielComponent;
  let fixture: ComponentFixture<PotentielComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotentielComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotentielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
