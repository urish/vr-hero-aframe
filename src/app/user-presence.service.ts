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
  private readonly currentUserRef: firebase.database.Reference;

  readonly users$: Observable<{ [key: string]: IUser }>;

  constructor(firebaseUtils: FirebaseUtilsService) {
    this.users$ = firebaseUtils.observe<{ [key: string]: IUser }>(this.usersRef);

    const randRadius = 3 + Math.random() * 5;
    const randAngle = Math.random() * Math.PI * 2;

    this.currentUserRef = this.usersRef.push({
      color: colors[Math.floor(Math.random() * colors.length)],
      x: Math.sin(randAngle) * randRadius,
      z: Math.cos(randAngle) * randRadius,
    });
    this.currentUserRef.onDisconnect().remove();
  }

  async setJumping(jumpValue: number) {
    await this.currentUserRef.update({ jump: jumpValue });
  }
}
