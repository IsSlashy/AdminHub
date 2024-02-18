import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatComponent } from './boat.component';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteModelComponent } from 'src/app/components/autocomplete-model/autocomplete-model.component';
import { AutocompleteHarborComponent } from 'src/app/components/autocomplete-harbor/autocomplete-harbor.component';
import { MatRadioModule } from '@angular/material/radio';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('BoatComponent', () => {
  let component: BoatComponent;
  let fixture: ComponentFixture<BoatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BoatComponent,
        AutocompleteModelComponent,
        AutocompleteHarborComponent,
        ModalConfirmedComponent,
      ],
      imports: [
        MatFormFieldModule,
        MatAutocompleteModule,
        MatRadioModule,
        MatInputModule,
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
    fixture = TestBed.createComponent(BoatComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
