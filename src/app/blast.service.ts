import { FirebaseUtilsService } from './firebase-utils.service';
import { Injectable } from '@angular/core';
import { Observable, interval, merge } from 'rxjs';
import { filter, map, tap, windowTime, flatMap, toArray, shareReplay } from 'rxjs/operators';
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
    interval(4000).pipe(map((i) => ({ type: 'color', payload: colors[i % colors.length] }))),
    interval(1200).pipe(map(() => ({ type: 'blast', payload: {} }))),
  ).pipe(tap(console.log));

  constructor(firebaseUtils: FirebaseUtilsService) {
    const actionRef = firebaseApp.database().ref('/action');
    this.actions$ = firebaseUtils.observe<IBlastEvent>(actionRef, 'child_added');
  }

  getBlastColor() {
    return this.actions$.pipe(filter(({ type }) => type === 'color'), map((action) => action.payload), shareReplay(1));
  }

  getBlasts({ animationLength = 2000 } = {}) {
    return this.actions$.pipe(
      filter(({ type }) => type === 'blast'),
      windowTime(animationLength),
      flatMap((blast) => blast.pipe(toArray())),
    );
  }
}
