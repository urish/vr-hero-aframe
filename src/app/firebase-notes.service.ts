import { FirebaseUtilsService } from './firebase-utils.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { firebaseApp } from './firebase.config';
import { interval } from 'rxjs/observable/interval';
import { map, switchMap } from 'rxjs/operators';

export interface INoteEvent {
  id: number;
  stringId: number;
  fret: number;
  note: number;
  match?: boolean;
}

@Injectable()
export class FirebaseNotesService {
  readonly notes$: Observable<INoteEvent>;

  // Generate fake note events
  fakeNoteId = 100000;
  fakeNotes$: Observable<INoteEvent> = interval(500).pipe(
    switchMap((i) => interval(Math.random() * 600 + 100)),
    map((value) => ({
      id: this.fakeNoteId++,
      stringId: Math.floor(Math.random() * 6),
      fret: Math.floor(Math.random() * 6),
      note: 0,
    })),
  );

  constructor(firebaseUtils: FirebaseUtilsService) {
    const songRef = firebaseApp.database().ref('/song');
    this.notes$ = firebaseUtils.observe<INoteEvent>(songRef, 'child_added');
  }
}
