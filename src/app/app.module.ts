import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AframePipeModule } from 'angular-aframe-pipe';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AframePipeModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
