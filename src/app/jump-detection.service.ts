import { Injectable } from '@angular/core';
import { fromEvent, merge, timer } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

const gravityG = 9.8; /* meters per second^2 */
const jumpAccelerationTreshold = 2 * gravityG;

@Injectable()
export class JumpDetectionService {
  // Emits the approx. jump force whenever a jump is detected, null when the jump is over
  public accelerometerJumps$ = fromEvent<DeviceMotionEvent>(window, 'devicemotion').pipe(
    map((e) => e.accelerationIncludingGravity),
    map((accel) => accel && accel.x),
    filter((val) => val > jumpAccelerationTreshold),
    switchMap((val) => merge([val], timer(500).pipe(map(() => null as null)))),
  );

  // Emits a jump event whenever space is pressed, stops jumping when space is released
  public keyboardJumps$ = fromEvent<KeyboardEvent>(window, 'keydown').pipe(
    filter((e) => e.key === ' '),
    switchMap(() =>
      merge(
        [jumpAccelerationTreshold],
        fromEvent<KeyboardEvent>(window, 'keyup').pipe(filter((e) => e.key === ' '), map(() => null as number)),
      ),
    ),
  );

  public jumps$ = merge(this.accelerometerJumps$, this.keyboardJumps$);

  constructor() {}
}
