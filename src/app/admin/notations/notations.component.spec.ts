import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotationsComponent } from './notations.component';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

describe('NotationsComponent', () => {
  let component: NotationsComponent;
  let fixture: ComponentFixture<NotationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotationsComponent],
      imports: [MatPaginatorModule, MatTableModule],
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
    fixture = TestBed.createComponent(NotationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
