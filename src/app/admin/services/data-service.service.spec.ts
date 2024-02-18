import { TestBed } from '@angular/core/testing';

import { DataServiceService } from './data-service.service';
import { Apollo } from 'apollo-angular';

describe('DataServiceService', () => {
  let service: DataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Apollo],
    });
    service = TestBed.inject(DataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
