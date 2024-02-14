import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumesComponent } from './resumes.component';
import { Apollo } from 'apollo-angular';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ResumesComponent', () => {
  let component: ResumesComponent;
  let fixture: ComponentFixture<ResumesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResumesComponent],
      imports: [
        MatSelectModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [Apollo],
    });
    fixture = TestBed.createComponent(ResumesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
