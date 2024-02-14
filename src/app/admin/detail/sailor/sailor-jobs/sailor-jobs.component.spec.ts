import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SailorJobsComponent } from './sailor-jobs.component';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';

describe('SailorJobsComponent', () => {
  let component: SailorJobsComponent;
  let fixture: ComponentFixture<SailorJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SailorJobsComponent],
      imports: [MatTableModule],
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
    fixture = TestBed.createComponent(SailorJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
