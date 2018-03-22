import { TestBed, inject } from '@angular/core/testing';

import { UserPresenceService } from './user-presence.service';

describe('UserPresenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserPresenceService]
    });
  });

  it('should be created', inject([UserPresenceService], (service: UserPresenceService) => {
    expect(service).toBeTruthy();
  }));
});
