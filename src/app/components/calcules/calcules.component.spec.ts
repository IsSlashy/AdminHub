import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculesComponent } from './calcules.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CalculesComponent', () => {
  let component: CalculesComponent;
  let fixture: ComponentFixture<CalculesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalculesComponent],
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
    });
    fixture = TestBed.createComponent(CalculesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
