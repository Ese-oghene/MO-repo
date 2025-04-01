import { TestBed } from '@angular/core/testing';

import { SharedStylesService } from './shared-styles.service';

describe('SharedStylesService', () => {
  let service: SharedStylesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedStylesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
