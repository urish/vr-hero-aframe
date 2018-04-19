import { FirebaseUtilsService } from './firebase-utils.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { firebaseApp } from './firebase.config';

export interface IBlastEvent {
  type: string;
  payload?: any;
}

@Injectable()
export class BlastService {
  readonly actions$: Observable<IBlastEvent>;
  readonly blasts$: Observable<IBlastEvent>;
  readonly color$: Observable<string>;

  constructor(firebaseUtils: FirebaseUtilsService) {
    const actionRef = firebaseApp.database().ref('/action');
    this.actions$ = firebaseUtils.observe<IBlastEvent>(actionRef, 'child_added');
    this.color$ = this.actions$.pipe(
      filter(({ type }) => type === 'color'),
      map(action => action.payload)
    );
    this.blasts$ = this.actions$.pipe(
      filter(({ type }) => type === 'blast'),
    );
  }
}
