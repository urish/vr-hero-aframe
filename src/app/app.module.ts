import { FirebaseNotesService } from './firebase-notes.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { AframePipe } from './aframe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AframePipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [FirebaseNotesService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
