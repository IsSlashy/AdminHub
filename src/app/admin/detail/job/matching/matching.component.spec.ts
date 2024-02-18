import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingComponent } from './matching.component';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';

describe('MatchingComponent', () => {
  let component: MatchingComponent;
  let fixture: ComponentFixture<MatchingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatchingComponent],
      imports: [MatTableModule],
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
    fixture = TestBed.createComponent(MatchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
