import { UserPresenceService, IUser } from './user-presence.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  users: IUser[];

  constructor(private userPresence: UserPresenceService) {
    userPresence.users$.subscribe((users) => {
      this.users = Object.values(users);
    });
  }

  ngOnInit() {

  }
}
