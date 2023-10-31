import { TestBed } from '@angular/core/testing';

import { NotifiConfirmService } from './notifi-confirm.service';

describe('NotifiConfirmService', () => {
  let service: NotifiConfirmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifiConfirmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
