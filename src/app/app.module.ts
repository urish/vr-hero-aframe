import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { AframePipe } from './aframe.pipe';
import { JumpDetectionService } from './jump-detection.service';
import { FirebaseUtilsService } from './firebase-utils.service';
import { FirebaseNotesService } from './firebase-notes.service';
import { UserPresenceService } from './user-presence.service';
import { RotationListenerDirective } from './rotation-listener.directive';

@NgModule({
  declarations: [AppComponent, AframePipe, RotationListenerDirective],
  imports: [BrowserModule],
  providers: [JumpDetectionService, FirebaseUtilsService, FirebaseNotesService, UserPresenceService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
