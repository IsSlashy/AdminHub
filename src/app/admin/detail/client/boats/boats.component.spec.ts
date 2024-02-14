import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatsComponent } from './boats.component';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('BoatsComponent', () => {
  let component: BoatsComponent;
  let fixture: ComponentFixture<BoatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoatsComponent],
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
    fixture = TestBed.createComponent(BoatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
