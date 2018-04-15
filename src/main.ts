/// <reference types="aframe" />

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import 'aframe-fireball-component';
import 'aframe-animation-component';
import './app/aframe/rotation-listener.aframe';
import './app/aframe/position-listener.aframe';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
