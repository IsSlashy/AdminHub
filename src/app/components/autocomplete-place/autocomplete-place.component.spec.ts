import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompletePlaceComponent } from './autocomplete-place.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AutocompletePlaceComponent', () => {
  let component: AutocompletePlaceComponent;
  let fixture: ComponentFixture<AutocompletePlaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompletePlaceComponent],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
      ],
    });
    fixture = TestBed.createComponent(AutocompletePlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
