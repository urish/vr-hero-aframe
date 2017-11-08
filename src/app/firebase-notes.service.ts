import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

import * as firebase from 'firebase';

import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/switchMap';

const config = {
  apiKey: 'AIzaSyAeef6ppzfZI3kLGiUkXPrE2sBGeyochnY',
  authDomain: 'vr-hero-app.firebaseapp.com',
  databaseURL: 'https://vr-hero-app.firebaseio.com',
  projectId: 'vr-hero-app',
  messagingSenderId: '729035450276'
};

export interface INoteEvent {
  id: number;
  stringId: number;
  fret: number;
  note: number;
  match?: boolean;
}

@Injectable()
export class FirebaseNotesService {
  notes$: Observable<INoteEvent>;

  // Generate fake note events
  fakeNoteId = 100000;
  fakeNotes$: Observable<INoteEvent> = Observable.interval(500)
    .switchMap(i => Observable.interval(Math.random() * 600 + 100))
    .map((value) => ({
      id: this.fakeNoteId++,
      stringId: Math.floor(Math.random() * 6),
      fret: Math.floor(Math.random() * 6),
      note: 0,
    }));

  constructor(private zone: NgZone) {
    firebase.initializeApp(config);

    const songRef = firebase.database().ref('/song');
    this.notes$ = this.observe<INoteEvent>(songRef, 'child_added');
  }

  private observe<T>(query: firebase.database.Query, eventType = 'value') {
    return new Observable<T>((observer: Subscriber<T>) => {
      const listener = query.on(eventType, snap => {
        this.zone.run(() => {
          observer.next(snap.val() as T);
        });
      }, (err: Error) => observer.error(err));

      return () => query.off(eventType, listener);
    }).publish().refCount();
  }
}
