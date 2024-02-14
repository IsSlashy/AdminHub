import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SailorComponent } from './sailor.component';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('SailorComponent', () => {
  let component: SailorComponent;
  let fixture: ComponentFixture<SailorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SailorComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of({
              get: () => 0,
            }),
          },
        },
        Apollo,
      ],
    });
    fixture = TestBed.createComponent(SailorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
