import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { DegreesComponent } from './degrees.component';
import { Apollo } from 'apollo-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { DataServiceService } from '../../services/data-service.service';
import { of } from 'rxjs';

describe('DegreesComponent', () => {
  let component: DegreesComponent;
  let fixture: ComponentFixture<DegreesComponent>;
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
      declarations: [DegreesComponent],
      imports: [
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [Apollo],
    });
    dataService = TestBed.inject(DataServiceService);
    fixture = TestBed.createComponent(DegreesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', fakeAsync(() => {
    spyOn(dataService, 'getDocuments').and.returnValue(
      of(fakeDocuments as any)
    );
    spyOn(dataService, 'watchDegrees').and.returnValue({
      valueChanges: of({
        data: {
          toto: 'titi',
        },
      }),
    } as any);
    component.ngOnInit();
    tick(2);
    expect(component.options.length).toBe(1);
    expect(component.filteredOptions).toBeDefined();
    expect(component.searchDocObject).toEqual({ toto: 'titi' });
  }));
});
