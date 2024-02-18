import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarborComponent } from './harbor.component';
import { Apollo } from 'apollo-angular';
import { AutocompleteHarborComponent } from 'src/app/components/autocomplete-harbor/autocomplete-harbor.component';
import { AutocompletePlaceComponent } from 'src/app/components/autocomplete-place/autocomplete-place.component';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HarborComponent', () => {
  let component: HarborComponent;
  let fixture: ComponentFixture<HarborComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HarborComponent,
        AutocompleteHarborComponent,
        AutocompletePlaceComponent,
        ModalConfirmedComponent,
      ],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        NoopAnimationsModule,
      ],
      providers: [Apollo],
    });
    fixture = TestBed.createComponent(HarborComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
