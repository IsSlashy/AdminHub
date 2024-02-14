import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobComponent } from './job.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';
import { EventEmitter } from '@angular/core';

describe('JobComponent', () => {
  let component: JobComponent;
  let fixture: ComponentFixture<JobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobComponent, ModalConfirmedComponent],
      imports: [
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
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
    fixture = TestBed.createComponent(JobComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.jobSub = new EventEmitter().asObservable().subscribe();
    expect(component).toBeTruthy();
  });
});
