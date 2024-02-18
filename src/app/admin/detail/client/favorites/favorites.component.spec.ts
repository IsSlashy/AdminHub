import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { FavorisComponent } from './favorites.component';
import { DataServiceService } from 'src/app/admin/services/data-service.service';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('FavorisComponent', () => {
  let component: FavorisComponent;
  let fixture: ComponentFixture<FavorisComponent>;
  let dataService: DataServiceService;

  const fakeData = {
    data: {
      user: {
        favourites: {
          nodes: [
            {
              id: 'toto',
              favouriteUser: {
                firstname: 'Donald',
                userDetailById: {
                  lastname: 'duck',
                  email: 'donald.duck@moncul.com',
                  phoneNumber: '+12331545',
                },
                userStatus: 'active',
              },
            },
          ],
        },
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavorisComponent],
      imports: [MatInputModule, FormsModule, ReactiveFormsModule],
      providers: [
        Apollo,
        {
          provide: ActivatedRoute,
          useValue: {
            parent: {
              paramMap: of({
                get: () => '0',
              }),
            },
          },
        },
      ],
    });
    dataService = TestBed.inject(DataServiceService);
    fixture = TestBed.createComponent(FavorisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', fakeAsync(() => {
    const spy = spyOn(component, 'initializeFavouritesWatcher').and.callFake(
      () => void 0
    );
    component.ngOnInit();
    tick(1);
    expect(spy).toHaveBeenCalledOnceWith('0');
    expect(component.userId).toEqual('0');
  }));

  it('should initializeFavouritesWatcher', fakeAsync(() => {
    spyOn(dataService, 'watchViewFavoritesQuery').and.returnValue({
      valueChanges: of(fakeData as any),
    } as any);
    component.initializeFavouritesWatcher('toto');
    tick(1);
    expect(component.favoris.length).toBe(1);
  }));
});
