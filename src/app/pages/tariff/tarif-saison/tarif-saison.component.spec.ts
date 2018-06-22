import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifSaisonComponent } from './tarif-saison.component';

describe('TarifSaisonComponent', () => {
  let component: TarifSaisonComponent;
  let fixture: ComponentFixture<TarifSaisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarifSaisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifSaisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
