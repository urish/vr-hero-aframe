import { Component, OnInit } from '@angular/core';
import { FirebaseNotesService, INoteEvent } from './firebase-notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  colors = ['red', 'pink', 'orange', 'green', 'blue', 'purple'];
  colorIndex = 0;

  constructor(private notes: FirebaseNotesService) {
    notes.fakeNotes$.subscribe(() => {
      this.colorIndex++;
    });
  }

  get color() {
    return this.colors[this.colorIndex % this.colors.length];
  }

  ngOnInit() {

  }
}
