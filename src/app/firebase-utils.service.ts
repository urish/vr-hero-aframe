import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable, Subscriber } from 'rxjs';
import { publish, refCount } from 'rxjs/operators';

@Injectable()
export class FirebaseUtilsService {
  constructor(private zone: NgZone) {}

  observe<T>(query: firebase.database.Query, eventType = 'value') {
    return new Observable<T>((observer: Subscriber<T>) => {
      const listener = query.on(
        eventType,
        (snap) => {
          this.zone.run(() => {
            observer.next(snap.val() as T);
          });
        },
        (err: Error) => observer.error(err),
      );

      return () => query.off(eventType, listener);
    }).pipe(publish(), refCount());
  }
}
