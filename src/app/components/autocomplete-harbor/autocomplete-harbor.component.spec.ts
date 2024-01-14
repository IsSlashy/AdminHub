import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteHarborComponent } from './autocomplete-harbor.component';

describe('AutocompleteHarborComponent', () => {
  let component: AutocompleteHarborComponent;
  let fixture: ComponentFixture<AutocompleteHarborComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteHarborComponent]
    });
    fixture = TestBed.createComponent(AutocompleteHarborComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
