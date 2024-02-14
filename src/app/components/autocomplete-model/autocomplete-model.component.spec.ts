import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteModelComponent } from './autocomplete-model.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AutocompleteModelComponent', () => {
  let component: AutocompleteModelComponent;
  let fixture: ComponentFixture<AutocompleteModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteModelComponent],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        NoopAnimationsModule,
      ],
    });
    fixture = TestBed.createComponent(AutocompleteModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
