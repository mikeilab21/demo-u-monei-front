import { TestBed } from '@angular/core/testing';

import { ApiDropDownService } from './drop-down.service';

describe('ApiDropDownService', () => {
  let service: ApiDropDownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiDropDownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
