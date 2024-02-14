import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { GooglePlacesAutocompleteComponent } from './google-places-autocomplete.component';
import { Apollo } from 'apollo-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('GooglePlacesAutocompleteComponent', () => {
  let component: GooglePlacesAutocompleteComponent;
  let fixture: ComponentFixture<GooglePlacesAutocompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GooglePlacesAutocompleteComponent],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
      providers: [Apollo],
    });
    fixture = TestBed.createComponent(GooglePlacesAutocompleteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', fakeAsync(() => {
    const fakeData: HTMLInputElement = {
      value: 'titi',
    } as HTMLInputElement;
    spyOn(document, 'getElementById').and.returnValue(fakeData);
    component.setAddresse = 'tutu';
    component.ngOnInit();
    tick(10);
    expect(fakeData.value).toEqual('titi');
  }));
});
