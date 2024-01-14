import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDocumentComponent } from './alert-document.component';

describe('AlertDocumentComponent', () => {
  let component: AlertDocumentComponent;
  let fixture: ComponentFixture<AlertDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertDocumentComponent]
    });
    fixture = TestBed.createComponent(AlertDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
