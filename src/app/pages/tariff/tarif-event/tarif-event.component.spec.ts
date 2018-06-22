import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifEventComponent } from './tarif-event.component';

describe('TarifEventComponent', () => {
  let component: TarifEventComponent;
  let fixture: ComponentFixture<TarifEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarifEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
