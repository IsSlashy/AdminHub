import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBoatComponent } from './new-boat.component';

describe('NewBoatComponent', () => {
  let component: NewBoatComponent;
  let fixture: ComponentFixture<NewBoatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewBoatComponent]
    });
    fixture = TestBed.createComponent(NewBoatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
