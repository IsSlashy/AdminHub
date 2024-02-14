import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDocumentComponent } from './alert-document.component';
import { Apollo } from 'apollo-angular';
import { RouterTestingModule } from '@angular/router/testing';

describe('AlertDocumentComponent', () => {
  let component: AlertDocumentComponent;
  let fixture: ComponentFixture<AlertDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertDocumentComponent],
      imports: [RouterTestingModule],
      providers: [Apollo],
    });
    fixture = TestBed.createComponent(AlertDocumentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
