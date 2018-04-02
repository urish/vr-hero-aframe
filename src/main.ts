import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import 'aframe-fireball-component';
import 'aframe-animation-component';
import 'aframe-gif-shader';
import './app/aframe/rotation-listener.aframe';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
