import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotationsComponent } from './notations.component';

describe('NotationsComponent', () => {
  let component: NotationsComponent;
  let fixture: ComponentFixture<NotationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotationsComponent]
    });
    fixture = TestBed.createComponent(NotationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
