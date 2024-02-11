import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';
import { DataServiceService } from '../../services/data-service.service';
import { NewOfferComponent } from './new-offer.component';

describe('NewOfferComponent', () => {
  let component: NewOfferComponent;
  let fixture: ComponentFixture<NewOfferComponent>;
  let dataService: DataServiceService;

  const fakeData = {
    data: {
      job: {
        realPrice: 1.1,
        chessRemuneration: 2.2,
      }
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewOfferComponent, ModalConfirmedComponent],
      imports: [
        RouterTestingModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
      providers: [
        Apollo,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of({
              get: (type: string) => type == 'sailorId' ? 0 : 1
            })
          }
        },
      ]
    });
    fixture = TestBed.createComponent(NewOfferComponent);
    dataService = TestBed.inject(DataServiceService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should init", fakeAsync(() => {
    const loadSkipperMock = spyOn(component, "loadSkipper").and.callFake(() => void 0)
    spyOn(dataService, "getJobById").and.returnValue(of(fakeData as any))
    component.ngOnInit()
    tick(1)
    expect(loadSkipperMock).toHaveBeenCalledTimes(2)
    expect(component.offerForm.value.pSailorId).toBe(0)
    expect(component.offerForm.value.pJobId).toBe(1)
    expect(component.offerForm.value.price).toBe(1.1)
    expect(component.offerForm.value.chessRemuneration).toBe(2.2)
  }))
});
