import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBoatComponent } from './new-boat.component';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteModelComponent } from 'src/app/components/autocomplete-model/autocomplete-model.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('NewBoatComponent', () => {
  let component: NewBoatComponent;
  let fixture: ComponentFixture<NewBoatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewBoatComponent, AutocompleteModelComponent],
      imports: [
        MatFormFieldModule,
        MatInputModule,
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
    fixture = TestBed.createComponent(NewBoatComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
