import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreesComponent } from './degrees.component';

describe('DegreesComponent', () => {
  let component: DegreesComponent;
  let fixture: ComponentFixture<DegreesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DegreesComponent]
    });
    fixture = TestBed.createComponent(DegreesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
