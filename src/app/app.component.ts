import { Component, OnInit } from '@angular/core';
import { FirebaseNotesService, INoteEvent } from './firebase-notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  colors = ['red', 'pink', 'orange', 'green', 'blue', 'purple'];

  balls: INoteEvent[] = [];

  constructor(private notes: FirebaseNotesService) {
    notes.fakeNotes$.subscribe(note => {
      this.balls.push(note);
    });
  }

  removeBall(ball) {
    this.balls = this.balls.filter(b => b !== ball);
  }

  ngOnInit() {

  }
}
