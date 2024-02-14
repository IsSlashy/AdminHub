import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAssigneOfferComponent } from './modal-assigne-offer.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Apollo } from 'apollo-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ModalAssigneOfferComponent', () => {
  let component: ModalAssigneOfferComponent;
  let fixture: ComponentFixture<ModalAssigneOfferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAssigneOfferComponent],
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        NoopAnimationsModule,
      ],
      providers: [
        Apollo,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    });
    fixture = TestBed.createComponent(ModalAssigneOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
