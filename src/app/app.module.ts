import { DatastoreService } from './datastore.service';
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
  providers: [DatastoreService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
