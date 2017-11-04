import { DatastoreService, INoteEvent, IUser } from './datastore.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/switchMap';

import './star-nest.shader';

interface ISphere {
  id: number;
  color: string;
  fret: number;
  stringId: number;
  note: number;
  match?: boolean;
  endOfTrack?: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  clicks = new Subject();

  lines = ['red', 'pink', 'orange', 'green', 'blue', 'purple'];
  users: IUser[] = [];
  spheres: ISphere[] = [];
  autoId = 0x8000000;

  constructor(private datastore: DatastoreService) {
  }

  ngOnInit() {
    const events = Observable.merge(this.datastore.notes$,
      this.clicks.map(() => ({
        id: this.autoId++,
        stringId: Math.floor(Math.random() * 6),
        fret: Math.floor(Math.random() * 6)
      })));
    events.subscribe((noteEvent: INoteEvent) => {
      const line = noteEvent.stringId;
      const color = this.lines[noteEvent.stringId];
      const sphere = this.spheres.find(s => s.id === noteEvent.id);
      if (sphere) {
        sphere.match = noteEvent.match;
      } else {
        this.spheres.push({
          id: noteEvent.id,
          color: color,
          fret: noteEvent.fret,
          stringId: line,
          note: noteEvent.note,
          match: noteEvent.match || false,
        });
      }
    });

    this.datastore.users$.subscribe(users => {
      this.users = users;
    });
  }

  updateAnimation(sphere: ISphere) {
    sphere.endOfTrack = true;
  }

  removeSphere(sphere: ISphere) {
    this.spheres = this.spheres.filter(s => s !== sphere);
  }
}
