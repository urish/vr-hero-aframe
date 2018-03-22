import { TestBed, inject } from '@angular/core/testing';

import { FirebaseUtilsService } from './firebase-utils.service';

describe('FirebaseUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseUtilsService]
    });
  });

  it('should be created', inject([FirebaseUtilsService], (service: FirebaseUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
