import { FirebaseUtilsService } from './firebase-utils.service';
import { Injectable } from '@angular/core';
import { Observable, interval, merge } from 'rxjs';
import { filter, map, tap, shareReplay } from 'rxjs/operators';
import { firebaseApp } from './firebase.config';

export interface IBlastEvent {
  type: string;
  payload?: any;
}

const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'gold'];

@Injectable()
export class BlastService {
  readonly actions$: Observable<IBlastEvent>;
  readonly fakeActions$ = merge<IBlastEvent>(
    interval(10000).pipe(map((i) => ({ type: 'color', payload: colors[i % colors.length] }))),
    interval(3000).pipe(map(() => ({ type: 'blast', payload: {} }))),
  ).pipe(tap(console.log));
  readonly blasts$: Observable<IBlastEvent>;
  readonly color$: Observable<string>;

  constructor(firebaseUtils: FirebaseUtilsService) {
    const actionRef = firebaseApp.database().ref('/action');
    this.actions$ = firebaseUtils.observe<IBlastEvent>(actionRef, 'child_added');
    this.color$ = this.actions$.pipe(
      filter(({ type }) => type === 'color'),
      map((action) => action.payload),
      shareReplay(1),
    );
    this.blasts$ = this.actions$.pipe(filter(({ type }) => type === 'blast'));
  }
}
