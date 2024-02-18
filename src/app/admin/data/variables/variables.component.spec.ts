import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariablesComponent } from './variables.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';

describe('VariablesComponent', () => {
  let component: VariablesComponent;
  let fixture: ComponentFixture<VariablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VariablesComponent, ModalConfirmedComponent],
      imports: [
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        ReactiveFormsModule,
        RouterTestingModule,
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
    fixture = TestBed.createComponent(VariablesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
