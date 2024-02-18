import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewJobComponent } from './new-job.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

describe('NewJobComponent', () => {
  let component: NewJobComponent;
  let fixture: ComponentFixture<NewJobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewJobComponent],
      imports: [
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatOptionModule,
        MatRadioModule,
        MatButtonModule,
        RouterModule,
      ],
      providers: [
        FormBuilder,
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
    fixture = TestBed.createComponent(NewJobComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
