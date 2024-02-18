import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { TrainingsComponent } from './trainings.component';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { DataServiceService } from '../../services/data-service.service';

describe('TrainingsComponent', () => {
  let component: TrainingsComponent;
  let fixture: ComponentFixture<TrainingsComponent>;
  let dataService: DataServiceService;

  const fakeDocuments = {
    data: {
      documentTypes: {
        nodes: [
          {
            name: 'donald duck',
            id: 'jzijizfizjizfiz',
            country: {
              shortName: 'United States',
            },
          },
        ],
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingsComponent],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        MatSelectModule,
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
    dataService = TestBed.inject(DataServiceService);
    fixture = TestBed.createComponent(TrainingsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should throw error when editing document', () => {
    expect(() => component.editDocument('item')).toThrowError(
      'Method not implemented.'
    );
  });

  it('should init', fakeAsync(() => {
    component.selectedTable = 'WAITING';
    spyOn(dataService, 'getDocuments').and.returnValue(
      of(fakeDocuments as any)
    );
    spyOn(dataService, 'watchTrainings').and.returnValue({
      valueChanges: of({
        data: {
          documents: {
            totalCount: 0,
          },
        },
      }),
    } as any);
    component.ngOnInit();
    tick(2);
    expect(component.options.length).toBe(1);
    expect(component.filteredOptions).toBeDefined();
    expect(component.searchTraining).toBeDefined();
    expect(component.waitingTraining).toBeDefined();
  }));

  it('should handle parameters changes', () => {
    const spy = spyOn((component as any).cdRef, 'detectChanges').and.callFake(
      () => void 0
    );
    component.searchTraining = '{}';
    component.ngOnChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.searchDocObject).toBeDefined();
  });

  it('should change document', () => {
    component.changeDocument({
      option: {
        value: {
          id: 'toto',
          value: 'titi',
        },
      },
    });
    expect(component.modifyForm.get('type')?.value).toEqual('toto');
  });
});
