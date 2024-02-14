import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementComponent } from './management.component';
import { Apollo } from 'apollo-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';

describe('ManagementComponent', () => {
  let component: ManagementComponent;
  let fixture: ComponentFixture<ManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagementComponent, ModalConfirmedComponent],
      imports: [
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatPaginatorModule,
      ],
      providers: [Apollo],
    });
    fixture = TestBed.createComponent(ManagementComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
