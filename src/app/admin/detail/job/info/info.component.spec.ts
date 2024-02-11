import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { InfoComponent } from './info.component';

describe('InfoComponent', () => {
  let component: InfoComponent;
  let fixture: ComponentFixture<InfoComponent>;
  let apolloMock: any;
  let routeMock: any;

  beforeEach(() => {
    apolloMock = { query: () => of({}), mutate: () => of({}) };
    routeMock = {
      parent: { paramMap: of(convertToParamMap({ id: 'testId' })) },
    };

    TestBed.configureTestingModule({
      declarations: [InfoComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: Apollo, useValue: apolloMock },
        { provide: ActivatedRoute, useValue: routeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // D'autres tests ici...
  it('should update form values on startHarborSelection', () => {
    const mockHarbor = { id: 'harbor1', name: 'Harbor One' };
    component.startHarborSelection(mockHarbor);
    expect(component.adForm.value.startHarbor).toEqual('harbor1');
    expect(component.adForm.value.startHarborName).toEqual('Harbor One');
  });

  // Test pour vérifier si la méthode updateAd appelle la fonction mutate d'Apollo
  it('updateAd should call apollo.mutate', () => {
    const spy = spyOn(apolloMock, 'mutate').and.callThrough();
    component.updateAd();
    expect(spy).toHaveBeenCalled();
  });

  // Ajoutez d'autres tests en fonction de la logique de votre composant
});
