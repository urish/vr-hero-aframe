import { Observable } from 'rxjs/Observable';
import { FirebaseUtilsService } from './firebase-utils.service';
import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { firebaseApp } from './firebase.config';

const colors = ['red', 'pink', 'orange', 'green', 'blue', 'purple'];

export interface IUser {
  color: string;
  x: number;
  z: number;
}

@Injectable()
export class UserPresenceService {
  private readonly usersRef = firebaseApp.database().ref('/users');
  readonly users$: Observable<{ [key: string]: IUser }>;

  constructor(firebaseUtils: FirebaseUtilsService) {
    this.users$ = firebaseUtils.observe<{ [key: string]: IUser }>(this.usersRef);

    this.usersRef
      .push({
        color: colors[Math.floor(Math.random() * colors.length)],
        x: Math.random() * 5 - 2.5,
        z: Math.random() * 5 - 2.5,
      })
      .onDisconnect()
      .remove();
  }
}
