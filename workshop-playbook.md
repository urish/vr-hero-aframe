# VR-Hero Workshop Playbook

Authors: [Alex Castillo](https://twitter.com/@castillo__io) and [Uri Shaked](https://twitter.com/UriShaked).

## Prerequisites

Please make sure you have the following prerequisites installed:

- Yarn: https://yarnpkg.com/en/
- Angular CLI 6.0.0:

    yarn global add @angular/cli@next

## Setting up dependencies and creating the project

Set up the CLI to work with yarn:

    ng set --global packageManager=yarn

Then create a new project:

    ng new vr-hero-aframe

(You can also get creative with the project name)

Next, install [aframe](https://aframe.io/), the set of components we will use, and a the [Angular a-frame pipe](https://www.npmjs.com/package/angular-aframe-pipe):

    cd vr-hero-aframe
    yarn add aframe aframe-fireball-component
    yarn add aframe-animation-component
    yarn add angular-aframe-pipe

Finally, install Firebase (we'll need it later):

    yarn add firebase

Note: You can install all the above dependencies with a single `yarn add` command, we split it here just for the sake of readability.

## Setting up A-Frame
You will need to do a little setup before you can use a-frame in your Angular project.

Open `src/polyfills.ts` and add the following line:

```typescript
import 'aframe';
```

You can add it right after the import for `core-js/es7/reflect` polyfill.

Then, go to `src/app/app.module.ts`, and add the following import:

```typescript
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AframePipeModule } from 'angular-aframe-pipe';
```

Add the following line inside the `@NgModule` definition:

```typescript
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
```

This enables support for third-party web components (such as A-Frame's component) inside the Angular compiler.

Finally, add the `AframePipeModule` to your module's `imports` section:

```typescript
    imports: [BrowserModule, AframePipeModule],
```

## Load A-Frame Plugins

Import all the A-Frame components we have installed by adding the following lines in your `src/main.ts`:

```typescript
import 'aframe-fireball-component';
import 'aframe-animation-component';
```

## Create your first A-Frame scene

Hooray! You are ready to go :-)

Creating your first A-Frame scene in Angular is super-easy. Just open app.component.html, and replace the boilerplate content with the following scene:

```html
<a-scene>
  <a-sphere position="0 1.5 -5" color="red"></a-sphere>
</a-scene>
```

Run `yarn start` and go to http://localhost:4200/ to see what you have just created. You can use the mouse to tilt the camera, and the arrow keys (or WASD) keys to move around.

If you want to make it a little more interesting, you can also add a sky, just before the sphere:

```html
<a-scene>
  <a-sky color="yellow"></a-sky>
  <a-sphere position="0 1.5 -5" color="red"></a-sphere>
</a-scene>
```
