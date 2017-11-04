import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subject } from 'rxjs/Subject';

import * as firebase from 'firebase';
import 'firebase/auth';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';

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
export class DatastoreService {
  private songRef: firebase.database.Reference;
  private users: firebase.database.Reference;
  private users$ = new Subject<any>();
  private user: firebase.database.Reference;

  notes$: Observable<INoteEvent>;

  constructor(private zone: NgZone) {
    firebase.initializeApp(config);

    // Notes
    this.songRef = firebase.database().ref('/song');
    this.notes$ = this.observe<INoteEvent>(this.songRef, 'child_added');

    // Users
    this.users = firebase.database().ref('/users');
    this.observe(this.users, 'value')
      .subscribe(this.users$);

    // Auth
    firebase.auth().signInAnonymously();
    firebase.auth().onAuthStateChanged(user => {
      this.user = this.users.child(firebase.auth().currentUser.uid);
      this.user.set({
        lastSeen: firebase.database.ServerValue.TIMESTAMP,
        color: 'red',
      });
      this.user.onDisconnect().remove();
    });
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
