import { TestBed, inject } from '@angular/core/testing';

import { JumpDetectionService } from './jump-detection.service';

describe('JumpDetectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JumpDetectionService]
    });
  });

  it('should be created', inject([JumpDetectionService], (service: JumpDetectionService) => {
    expect(service).toBeTruthy();
  }));
});
