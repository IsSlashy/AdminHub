import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';
import { AutocompleteModelComponent } from 'src/app/components/autocomplete-model/autocomplete-model.component';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';
import { DataServiceService } from '../../services/data-service.service';
import { ModelComponent } from './model.component';

describe('ModelComponent', () => {
  let component: ModelComponent;
  let fixture: ComponentFixture<ModelComponent>;
  let dataService: DataServiceService;

  const fakeData = {
    data: {
      model: {
        id: 'fake_id',
        name: 'fake_name',
        enginePower: 'fake_enginePower',
        boatType: 'fake_boatType',
        hullLength: 'fake_hullLength',
        headroom: 'fake_headroom',
        draft: 'fake_draft',
        grossTonnage: 'fake_grossTonnage',
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModelComponent,
        AutocompleteModelComponent,
        ModalConfirmedComponent,
      ],
      imports: [
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        CommonModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      providers: [Apollo, FormBuilder],
    });
    fixture = TestBed.createComponent(ModelComponent);
    dataService = TestBed.inject(DataServiceService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.boatForm).toBeDefined();
  });

  it('should handleSelect', fakeAsync(() => {
    const patchValueSpy = spyOn(component.boatForm, 'patchValue');
    spyOn(dataService, 'getBoatById').and.callFake(() => of(fakeData as any));
    component.onSelect({ titi: 'toto' } as any);
    tick(10);
    expect(patchValueSpy).toHaveBeenCalledTimes(2);
    expect(component.selectedBoat).toEqual({ titi: 'toto' });
  }));
});
