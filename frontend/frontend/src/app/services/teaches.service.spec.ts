import { TestBed } from '@angular/core/testing';

import { TeachesService } from './teaches.service';

describe('TeachesService', () => {
  let service: TeachesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeachesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
