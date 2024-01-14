import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientJobsComponent } from './client-jobs.component';

describe('ClientJobsComponent', () => {
  let component: ClientJobsComponent;
  let fixture: ComponentFixture<ClientJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientJobsComponent]
    });
    fixture = TestBed.createComponent(ClientJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
