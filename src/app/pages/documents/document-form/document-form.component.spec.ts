import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewDocumentComponent } from './document-form.component';

describe('DialogNewDocumentComponent', () => {
  let component: DialogNewDocumentComponent;
  let fixture: ComponentFixture<DialogNewDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogNewDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
