import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GooglePlacesAutocompleteComponent } from './google-places-autocomplete.component';

describe('GooglePlacesAutocompleteComponent', () => {
  let component: GooglePlacesAutocompleteComponent;
  let fixture: ComponentFixture<GooglePlacesAutocompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GooglePlacesAutocompleteComponent]
    });
    fixture = TestBed.createComponent(GooglePlacesAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
