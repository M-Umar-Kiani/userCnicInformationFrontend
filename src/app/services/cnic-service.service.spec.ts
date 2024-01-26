import { TestBed } from '@angular/core/testing';

import { CnicServiceService } from './cnic-service.service';

describe('CnicServiceService', () => {
  let service: CnicServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CnicServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
