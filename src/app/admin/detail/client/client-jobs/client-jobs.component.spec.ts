import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientJobsComponent } from './client-jobs.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Apollo } from 'apollo-angular';

describe('ClientJobsComponent', () => {
  let component: ClientJobsComponent;
  let fixture: ComponentFixture<ClientJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientJobsComponent],
      providers: [
        Apollo,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of({
              get: () => 0,
            }),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(ClientJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
