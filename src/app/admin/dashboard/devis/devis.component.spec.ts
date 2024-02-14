import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisComponent } from './devis.component';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';

describe('DevisComponent', () => {
  let component: DevisComponent;
  let fixture: ComponentFixture<DevisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevisComponent],
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
    fixture = TestBed.createComponent(DevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
