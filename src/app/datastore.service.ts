import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import 'rxjs/add/operator/map';

const config = {
  apiKey: 'AIzaSyAeef6ppzfZI3kLGiUkXPrE2sBGeyochnY',
  authDomain: 'vr-hero-app.firebaseapp.com',
  databaseURL: 'https://vr-hero-app.firebaseio.com',
  projectId: 'vr-hero-app',
  messagingSenderId: '729035450276'
};

@Injectable()
export class DatastoreService {
  private db: firebase.firestore.Firestore;
  private users: firebase.firestore.CollectionReference;
  private users$ = new Subject<any>();
  private user: firebase.firestore.DocumentReference;

  constructor() {
    firebase.initializeApp(config);

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
