import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculesComponent } from './calcules.component';

describe('CalculesComponent', () => {
  let component: CalculesComponent;
  let fixture: ComponentFixture<CalculesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalculesComponent],
    });
    fixture = TestBed.createComponent(CalculesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
