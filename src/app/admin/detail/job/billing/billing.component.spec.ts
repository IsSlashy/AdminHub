import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingComponent } from './billing.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { GooglePlacesAutocompleteComponent } from 'src/app/components/google-places-autocomplete/google-places-autocomplete.component';
import { AutocompleteHarborComponent } from 'src/app/components/autocomplete-harbor/autocomplete-harbor.component';
import { AutocompleteModelComponent } from 'src/app/components/autocomplete-model/autocomplete-model.component';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('BillingComponent', () => {
  let component: BillingComponent;
  let fixture: ComponentFixture<BillingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BillingComponent,
        GooglePlacesAutocompleteComponent,
        AutocompleteHarborComponent,
        AutocompleteModelComponent,
        ModalConfirmedComponent,
      ],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatAutocompleteModule,
        FormsModule,
        ReactiveFormsModule,
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
    fixture = TestBed.createComponent(BillingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
