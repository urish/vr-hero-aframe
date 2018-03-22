import { Component, OnInit } from '@angular/core';
import { UserPresenceService, IUser } from './user-presence.service';
import { FirebaseNotesService, INoteEvent } from './firebase-notes.service';

const cdnUrl = 'https://cdn.glitch.com/ed38cda4-8b9e-460f-83fa-3c9f7ed0bf7e';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  users: IUser[];

  balls: INoteEvent[] = [];

  sounds = {
    throw: { src: `${cdnUrl}/sfx_throw.wav?1521187676351` },
    jump: { src: `${cdnUrl}/jump.ogg?1521187674201` },
  };

  constructor(private userPresence: UserPresenceService, private notes: FirebaseNotesService) {
    userPresence.users$.subscribe((users) => {
      this.users = Object.values(users);
    });
    notes.notes$.subscribe((note) => {
      this.balls.push(note);
    });
  }

  removeBall(ball) {
    this.balls = this.balls.filter((b) => b !== ball);
  }

  ngOnInit() {}
}