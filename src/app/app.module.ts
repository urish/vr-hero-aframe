import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { AframePipeModule } from 'angular-aframe-pipe';
import { JumpDetectionService } from './jump-detection.service';
import { FirebaseUtilsService } from './firebase-utils.service';
import { ControllerService } from './controller.service';
import { UserPresenceService } from './user-presence.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AframePipeModule],
  providers: [JumpDetectionService, FirebaseUtilsService, ControllerService, UserPresenceService, AframePipeModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
