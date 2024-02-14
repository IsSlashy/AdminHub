import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotationComponent } from './notation.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Apollo } from 'apollo-angular';

describe('NotationComponent', () => {
  let component: NotationComponent;
  let fixture: ComponentFixture<NotationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotationComponent],
      providers: [
        Apollo,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => of(0),
              },
            },
          },
        },
      ],
    });
    fixture = TestBed.createComponent(NotationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
