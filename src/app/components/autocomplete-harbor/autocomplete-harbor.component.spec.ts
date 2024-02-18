import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteHarborComponent } from './autocomplete-harbor.component';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AutocompleteHarborComponent', () => {
  let component: AutocompleteHarborComponent;
  let fixture: ComponentFixture<AutocompleteHarborComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteHarborComponent],
      imports: [
        MatInputModule,
        MatAutocompleteModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
    });
    fixture = TestBed.createComponent(AutocompleteHarborComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
