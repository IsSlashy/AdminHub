import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCompleteJobComponent } from './new-complete-job.component';

describe('NewCompleteJobComponent', () => {
  let component: NewCompleteJobComponent;
  let fixture: ComponentFixture<NewCompleteJobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewCompleteJobComponent],
    });
    fixture = TestBed.createComponent(NewCompleteJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
