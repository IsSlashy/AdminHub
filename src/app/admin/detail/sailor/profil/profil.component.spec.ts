import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilComponent } from './profil.component';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';

describe('ProfilComponent', () => {
  let component: ProfilComponent;
  let fixture: ComponentFixture<ProfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilComponent, ModalConfirmedComponent],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        FormsModule,
        ReactiveFormsModule,
        MatOptionModule,
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
    fixture = TestBed.createComponent(ProfilComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
