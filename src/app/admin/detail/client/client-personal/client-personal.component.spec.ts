import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPersonalComponent } from './client-personal.component';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';

describe('ClientPersonalComponent', () => {
  let component: ClientPersonalComponent;
  let fixture: ComponentFixture<ClientPersonalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientPersonalComponent, ModalConfirmedComponent],
      imports: [
        MatRadioModule,
        MatOptionModule,
        MatInputModule,
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
    fixture = TestBed.createComponent(ClientPersonalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
