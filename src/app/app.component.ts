import { JumpDetectionService } from './jump-detection.service';
import { Component, OnInit } from '@angular/core';
import { UserPresenceService, IUser } from './user-presence.service';
import { ControllerService, IControllerEvent } from './controller.service';

const cdnUrl = 'https://cdn.glitch.com/ed38cda4-8b9e-460f-83fa-3c9f7ed0bf7e';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  users: IUser[];
  me: IUser;
  color$ = this.controller.color$;

  balls: IControllerEvent[] = [];

  sounds = {
    throw: { src: `${cdnUrl}/sfx_throw.wav?1521187676351` },
    jump: { src: `${cdnUrl}/jump.ogg?1521187674201` },
  };

  constructor(
    private userPresence: UserPresenceService,
    private controller: ControllerService,
    jumpDetectionService: JumpDetectionService,
  ) {
    userPresence.me$.subscribe((user) => {
      this.me = user;
    });
    userPresence.users$.subscribe((users) => {
      this.users = users;
    });
    controller.pulse$.subscribe((pulse) => {
      this.balls.push(pulse);
    });
    jumpDetectionService.jumps$.subscribe((jumpValue) => {
      userPresence.setJumping(jumpValue);
    });
  }

  removeBall(ball: IControllerEvent) {
    this.balls = this.balls.filter((b) => b !== ball);
  }

  ngOnInit() {}

  userId(user: IUser) {
    return user.id;
  }

  onRotationChanged(e: AFrame.DetailEvent<AFrame.Coordinate>) {
    this.userPresence.updateMyRotation(e.detail);
  }

  onPositionChanged(e: AFrame.DetailEvent<AFrame.Coordinate>) {
    this.userPresence.updateMyPosition(e.detail);
  }
}
