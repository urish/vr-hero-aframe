import { DatastoreService, INoteEvent } from './datastore.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/switchMap';

import './sphere-shader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  clicks = new Subject();

  lines = ['red', 'pink', 'orange', 'green', 'blue', 'purple'];
  spheres = [];

  constructor(private datastore: DatastoreService) {
  }

  ngOnInit() {
    const events = Observable.merge(this.datastore.notes$, this.clicks);
    events.subscribe((noteEvent: INoteEvent) => {
      const line = noteEvent.stringId - 1;
      const color = this.lines[line];
      this.spheres.push({
        color: color,
        position: `${line - 2} 0.5 0`,
        stringId: noteEvent.stringId,
        note: noteEvent.note
      });
    });
  }

  getPosition(index: number) {
    return `${index - 2} 0 -10`;
  }

  removeSphere(sphere: any) {
    this.spheres = this.spheres.filter(s => s !== sphere);
  }
}
