import { FirebaseUtilsService } from './firebase-utils.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { firebaseApp } from './firebase.config';

export interface IControllerEvent {
  pose: string;
}

@Injectable()
export class ControllerService {
  readonly pose$: Observable<IControllerEvent>;

  constructor(firebaseUtils: FirebaseUtilsService) {
    const poseRef = firebaseApp.database().ref('/pose');
    this.pose$ = firebaseUtils.observe<IControllerEvent>(poseRef, 'child_added');
  }
}
