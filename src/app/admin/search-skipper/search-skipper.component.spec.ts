import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSkipperComponent } from './search-skipper.component';

describe('SearchSkipperComponent', () => {
  let component: SearchSkipperComponent;
  let fixture: ComponentFixture<SearchSkipperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchSkipperComponent],
    });
    fixture = TestBed.createComponent(SearchSkipperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
