import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaimentsComponent } from './paiments.component';

describe('PaimentsComponent', () => {
  let component: PaimentsComponent;
  let fixture: ComponentFixture<PaimentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaimentsComponent],
    });
    fixture = TestBed.createComponent(PaimentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
