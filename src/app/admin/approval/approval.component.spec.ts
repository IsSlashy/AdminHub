import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalComponent } from './approval.component';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('ApprovalComponent', () => {
  let component: ApprovalComponent;
  let fixture: ComponentFixture<ApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovalComponent],
      imports: [RouterTestingModule],
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
    fixture = TestBed.createComponent(ApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
