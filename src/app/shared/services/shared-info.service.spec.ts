import { TestBed } from '@angular/core/testing';

import { SharedInfoService } from './shared-info.service';

describe('SharedInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedInfoService = TestBed.get(SharedInfoService);
    expect(service).toBeTruthy();
  });
});
