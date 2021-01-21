import { TestBed } from '@angular/core/testing';

import { AlldataserviceService } from './alldataservice.service';

describe('AlldataserviceService', () => {
  let service: AlldataserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlldataserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
