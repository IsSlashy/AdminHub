import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';
import { OfferComponent } from './offer.component';

describe('OfferComponent', () => {
  let component: OfferComponent;
  let fixture: ComponentFixture<OfferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferComponent, ModalConfirmedComponent],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatOptionModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
      ],
      providers: [
        Apollo,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of({
              get: () => 0,
            }),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(OfferComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
