import { TestBed, inject } from '@angular/core/testing';

import { FirebaseNotesService } from './firebase-notes.service';

describe('FirebaseNotesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseNotesService]
    });
  });

  it('should be created', inject([FirebaseNotesService], (service: FirebaseNotesService) => {
    expect(service).toBeTruthy();
  }));
});
