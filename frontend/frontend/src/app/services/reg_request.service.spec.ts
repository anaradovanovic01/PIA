import { TestBed } from '@angular/core/testing';

import { RegRequestService } from './reg_request.service';

describe('RegRequestService', () => {
  let service: RegRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
