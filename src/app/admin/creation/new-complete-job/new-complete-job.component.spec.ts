import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { NewCompleteJobComponent } from './new-complete-job.component';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { AutocompleteHarborComponent } from 'src/app/components/autocomplete-harbor/autocomplete-harbor.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DataServiceService } from '../../services/data-service.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('NewCompleteJobComponent', () => {
  let component: NewCompleteJobComponent;
  let fixture: ComponentFixture<NewCompleteJobComponent>;
  let dataService: DataServiceService;
  let router: Router;

  const fakeGetBoatUser = {
    data: {
      user: {
        boatsByOwnerId: {
          nodes: [],
        },
      },
      countries: {
        node: ['fr', 'en', 'pt'],
      },
      languages: {
        node: ['fr', 'en', 'pt'],
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewCompleteJobComponent, AutocompleteHarborComponent],
      imports: [
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatRadioModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatSelectModule,
        MatNativeDateModule,
        RouterTestingModule,
      ],
      providers: [
        DateAdapter,
        Apollo,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of({
              get: () => ({
                ownerId: 'titi',
              }),
            }),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(NewCompleteJobComponent);
    router = TestBed.inject(Router);
    dataService = TestBed.inject(DataServiceService);
    component = fixture.componentInstance;
  });

  it('should create', fakeAsync(() => {
    spyOn(component, 'ngOnInit').and.callFake(() => void 0);
    tick(1);
    expect(component).toBeTruthy();
  }));

  it('should init', fakeAsync(() => {
    spyOn(dataService, 'getBoatUser').and.returnValue(
      of(fakeGetBoatUser as any)
    );
    spyOn(dataService, 'watchEstimatedPriceQuery').and.returnValue({
      valueChanges: of({
        data: {
          estimatedPrice: 2,
        },
      }),
      refetch: () => void 0,
    } as any);
    spyOn(dataService, 'watchChessPriceQuery').and.returnValue({
      valueChanges: of({
        data: {
          apiCalculeRemuChess: 3,
        },
      }),
      refetch: () => void 0,
    } as any);
    component.ngOnInit();
    expect(component.jobForm.get('ownerId')?.value).toEqual({
      ownerId: 'titi',
    });
    expect(component.jobForm.get('initialPrice')?.value).toBe(2);
    expect(component.jobForm.get('chessRemuneration')?.value).toBe(3);
    expect(component.owner).toEqual(fakeGetBoatUser.data.user);
    expect(component.jobForm.get('fee')?.value).toBeDefined();
    component.jobForm.patchValue({ monthlyRemuneration: 'toto' });
    expect(component.chessParam.duration).toBe(25);
    expect(component.estimationParam.duration).toBe(25);
    component.jobForm.patchValue({ ownerId: 'titi' });
    expect(component.owner).toBeDefined();
    component.jobForm.patchValue({ initialPrice: 12 });
    expect(component.chessParam.price).toBe(12 as any);
    component.daysCalcul = 666;
    component.jobForm.patchValue({ monthlyRemuneration: undefined });
    expect(component.chessParam.duration).toBe(666);
    component.jobForm.patchValue({ positionType: 'titi' });
    expect(component.estimationParam.positionType).toEqual('titi');
    component.jobForm.patchValue({ adType: 'tutu' });
    expect(component.estimationParam.adType).toEqual('tutu');
    component.jobForm.patchValue({ coastDistance: 'tata' });
    expect(component.chessParam.coastDistance).toEqual('tata');
    const dayCalculusSpy = spyOn(component, '_daysCalcul');
    component.jobForm.patchValue({ startDate: 'tyty' });
    tick(500);
    expect(dayCalculusSpy).toHaveBeenCalledTimes(1);
    component.jobForm.patchValue({ endDate: 'fafa' });
    tick(500);
    expect(dayCalculusSpy).toHaveBeenCalledTimes(2);
  }));

  it('should handle theoric time', () => {
    component.endHarbor = {
      lat: 10,
      lng: 12,
    };
    component.startHarbor = component.endHarbor;
    component.estimatePriceQuery = { refetch: () => void 0 } as any;
    component.chessPriceQuery = { refetch: () => void 0 } as any;
    component.theoriqueTime();

    expect(component.estimationParam).toBeDefined();
    component.boat = {
      model: {
        boatType: 'MOTORBOAT',
      },
    };
    const spy = spyOn(component.jobForm, 'patchValue');
    component.theoriqueTime();
    expect(spy).toHaveBeenCalled();
  });

  it('should create new job', fakeAsync(() => {
    component.jobForm.patchValue({
      startDate: '2024-02-18T10:03:37.438Z',
      endDate: '2024-02-18T10:03:37.438Z',
    });
    spyOn(dataService, 'createAd').and.returnValue(
      of({
        data: {
          createCompleteAd: {
            ad: {
              id: 'titi',
            },
          },
        },
      } as any)
    );
    spyOn(dataService, 'createJob').and.returnValue(
      of({
        data: {
          createCompleteJobAdmin: {
            job: {
              id: 'tutu',
            },
          },
        },
      } as any)
    );
    const routerSpy = spyOn(router, 'navigate');
    component.createJob();
    tick();
    expect(routerSpy).toHaveBeenCalled();
  }));
});
