import { JumpDetectionService } from './jump-detection.service';
import { Component, OnInit } from '@angular/core';
import { UserPresenceService, IUser } from './user-presence.service';
import { BlastService, IBlastEvent } from './blast.service';

const cdnUrl = 'https://cdn.glitch.com/ed38cda4-8b9e-460f-83fa-3c9f7ed0bf7e';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  users$ = this.userPresence.users$;
  blasts: IBlastEvent[] = [];
  blastColor$ = this.blastService.color$;
  me: IUser;

  sounds = {
    throw: { src: `${cdnUrl}/sfx_throw.wav?1521187676351` },
    jump: { src: `${cdnUrl}/jump.ogg?1521187674201` },
  };

  constructor(
    private userPresence: UserPresenceService,
    private blastService: BlastService,
    jumpDetectionService: JumpDetectionService,
  ) {
    userPresence.me$.subscribe((value) => {
      this.me = value;
    });
    blastService.blasts$.subscribe((blast) => {
      this.blasts.push(blast);
    });
    jumpDetectionService.jumps$.subscribe((jumpValue) => {
      userPresence.setJumping(jumpValue);
    });
  }

  removeBlast(blast: IBlastEvent) {
    this.blasts = this.blasts.filter((b) => b !== blast);
  }

  ngOnInit() {}

  userId(user: IUser) {
    return user.id;
  }

  onRotationChanged(value: AFrame.Coordinate) {
    this.userPresence.updateMyRotation(value);
  }

  onPositionChanged(value: AFrame.Coordinate) {
    this.userPresence.updateMyPosition(value);
  }
}
