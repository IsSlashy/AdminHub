import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SailorJobsComponent } from './sailor-jobs.component';

describe('SailorJobsComponent', () => {
  let component: SailorJobsComponent;
  let fixture: ComponentFixture<SailorJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SailorJobsComponent],
    });
    fixture = TestBed.createComponent(SailorJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
