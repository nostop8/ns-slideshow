import { TestBed } from '@angular/core/testing';

import { MediaLoaderService } from './media-loader.service';

describe('MediaLoaderService', () => {
  let service: MediaLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
