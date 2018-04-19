import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';

import { FirebaseUtilsService } from './firebase-utils.service';
import { firebaseApp } from './firebase.config';

const colors = ['red', 'pink', 'orange', 'green', 'blue', 'purple'];

export interface IUser {
  id: string;
  color: string;
  x: number;
  z: number;
  jump?: number | null;
  rotationX?: number;
  rotationY?: number;
  me?: boolean;
}

@Injectable()
export class UserPresenceService {
  private readonly usersRef = firebaseApp.database().ref('/users');
  private readonly currentUserRef: firebase.database.Reference;

  readonly users$: Observable<IUser[]>;
  readonly me$: Observable<IUser>;
  readonly baseX: number;
  readonly baseZ: number;

  constructor(firebaseUtils: FirebaseUtilsService) {
    this.users$ = firebaseUtils.observe<{ [key: string]: IUser }>(this.usersRef).pipe(
      map((userDict) =>
        Object.keys(userDict).map((id) => ({
          id,
          ...userDict[id],
          me: id === this.currentUserRef.key,
        })),
      ),
    );

    const randRadius = 3 + Math.random() * 5;
    const randAngle = Math.random() * Math.PI * 2;
    this.baseX  = Math.sin(randAngle) * randRadius;
    this.baseZ = Math.cos(randAngle) * randRadius;

    this.currentUserRef = this.usersRef.push({
      color: colors[Math.floor(Math.random() * colors.length)],
      x: this.baseX,
      z: this.baseZ,
      rotationX: 0,
      rotationY: 0,
    });
    this.me$ = firebaseUtils.observe<IUser>(this.currentUserRef).pipe(
      map((value) => ({...value, me: true})),
    );
    this.currentUserRef.onDisconnect().remove();
  }

  async setJumping(jumpValue: number) {
    await this.currentUserRef.update({ jump: jumpValue });
  }

  async updateMyRotation(newRotation: AFrame.Coordinate) {
    this.currentUserRef.update({
      rotationX: newRotation.x,
      rotationY: newRotation.y,
    });
  }

  async updateMyPosition(newPosition: AFrame.Coordinate) {
    this.currentUserRef.update({
      x: this.baseX + newPosition.x,
      z: this.baseZ + newPosition.z,
    });
  }
}
