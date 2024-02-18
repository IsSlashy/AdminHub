import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';
import { DataServiceService } from 'src/app/admin/services/data-service.service';
import { PaimentsComponent } from './paiments.component';

describe('PaimentsComponent', () => {
  let component: PaimentsComponent;
  let fixture: ComponentFixture<PaimentsComponent>;
  let dataService: DataServiceService;

  const fakeData = {
    data: {
      user: {
        jobsAsClientPaid: {
          nodes: 'titi',
        },
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaimentsComponent],
      providers: [
        Apollo,
        {
          provide: ActivatedRoute,
          useValue: {
            parent: {
              paramMap: of({
                get: () => 0,
              }),
            },
          },
        },
      ],
    });
    fixture = TestBed.createComponent(PaimentsComponent);
    dataService = TestBed.inject(DataServiceService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', fakeAsync(() => {
    const serviceSpy = spyOn(dataService, 'clientPaiementById').and.returnValue(
      of(fakeData as any)
    );
    component.ngOnInit();
    tick(1);
    expect(serviceSpy).toHaveBeenCalled();
    expect(component.jobs).toEqual(fakeData.data.user.jobsAsClientPaid.nodes);
  }));
});
