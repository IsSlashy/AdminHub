import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteModelComponent } from './autocomplete-model.component';

describe('AutocompleteModelComponent', () => {
  let component: AutocompleteModelComponent;
  let fixture: ComponentFixture<AutocompleteModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteModelComponent],
    });
    fixture = TestBed.createComponent(AutocompleteModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
