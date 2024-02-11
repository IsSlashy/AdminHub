import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompletePlaceComponent } from './autocomplete-place.component';

describe('AutocompletePlaceComponent', () => {
  let component: AutocompletePlaceComponent;
  let fixture: ComponentFixture<AutocompletePlaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompletePlaceComponent],
    });
    fixture = TestBed.createComponent(AutocompletePlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
