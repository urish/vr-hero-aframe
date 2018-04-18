import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { AframePipe } from 'angular-aframe-pipe';
import { JumpDetectionService } from './jump-detection.service';
import { FirebaseUtilsService } from './firebase-utils.service';
import { ControllerService } from './controller.service';
import { UserPresenceService } from './user-presence.service';

@NgModule({
  declarations: [AppComponent, AframePipe],
  imports: [BrowserModule],
  providers: [JumpDetectionService, FirebaseUtilsService, ControllerService, UserPresenceService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
