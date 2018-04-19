import { FirebaseUtilsService } from './firebase-utils.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { firebaseApp } from './firebase.config';

export interface IControllerEvent {
  type: string;
  payload?: any;
}

@Injectable()
export class ControllerService {
  readonly actions$: Observable<IControllerEvent>;
  readonly pulse$: Observable<IControllerEvent>;
  readonly color$: Observable<string>;

  constructor(firebaseUtils: FirebaseUtilsService) {
    const actionRef = firebaseApp.database().ref('/action');
    this.actions$ = firebaseUtils.observe<IControllerEvent>(actionRef, 'child_added');
    this.color$ = this.actions$.pipe(
      filter(({ type }) => type === 'color'),
      map(action => action.payload)
    );
    this.pulse$ = this.actions$.pipe(
      filter(({ type }) => type === 'pulse'),
    );
  }
}
