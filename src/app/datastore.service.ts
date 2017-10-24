import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subject } from 'rxjs/Subject';

import * as firebase from 'firebase';
import 'firebase/firestore';
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
  stringId: number;
  fret: number;
  note: number;
  match?: boolean;
}

@Injectable()
export class DatastoreService {
  private db: firebase.firestore.Firestore;
  private songRef: firebase.database.Reference;
  private users: firebase.firestore.CollectionReference;
  private users$ = new Subject<any>();
  private user: firebase.firestore.DocumentReference;

  notes$: Observable<INoteEvent>;

  constructor(zone: NgZone) {
    firebase.initializeApp(config);

    // Realtime
    this.songRef = firebase.database().ref('/song');
    this.notes$ = new Observable<INoteEvent>((observer: Subscriber<INoteEvent>) => {
      const listener = this.songRef.on('child_added', snap => {
        zone.run(() => {
          observer.next(snap.val() as INoteEvent);
        });
      }, (err: Error) => observer.error(err));

      return () => this.songRef.off('child_added', listener);
    }).publish().refCount();

    // DB
    this.db = firebase.firestore();
    const usersSnapshots = new Subject<firebase.firestore.QuerySnapshot>();
    this.users = this.db.collection('users');
    this.users.onSnapshot(usersSnapshots);
    usersSnapshots.map(snap => snap.docs.map(docSnap => docSnap.data()))
      .subscribe(this.users$);

    // Auth
    firebase.auth().signInAnonymously();
    firebase.auth().onAuthStateChanged(user => {
      this.user = this.users.doc(firebase.auth().currentUser.uid);
      this.user.set({
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        color: 'red',
      }, { merge: true });
    });
  }

}
