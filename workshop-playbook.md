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
    yarn add aframe-animation-component aframe-camera-events
    yarn add aframe-gif-shader-pixelated
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
import 'aframe-gif-shader-pixelated';
import 'aframe-camera-events';
```

## Create your first A-Frame scene

Hooray! You are ready to go :-)

Creating your first A-Frame scene in Angular is super-easy. Just open app.component.html, and replace the boilerplate content with the following scene:

```html
<a-scene>
  <a-sphere position="0 1.5 -5" color="salmon"></a-sphere>
</a-scene>
```

Run `yarn start` and go to http://localhost:4200/ to see what you have just created. You can use the mouse to tilt the camera, and the arrow keys (or WASD) keys to move around.

If you want to make it a little more interesting, you can also add a sky, just before the sphere:

```html
<a-scene>
  <a-sky color="skyblue"></a-sky>
  <a-sphere position="0 1.5 -5" color="salmon"></a-sphere>
</a-scene>
```

Finally, let's add a plane below the sphere. We also need to rotate the plane so it's parallel with the ground:

```html
<a-scene>
  <a-sky color="skyblue"></a-sky>
  <a-sphere position="0 1.5 -5" color="salmon"></a-sphere>
  <a-plane color="yellow" position="0 0 -5" width="5"
    height="5" rotation="-90 0 0"></a-plane>
</a-scene>
```

## Adding User Presence

We will use Firebase to track the users currently logged-in into our vr experience. First, we need to initialize the Firebase SDK. Create a file called `src/app/firebase.config.ts` with the following content:

```typescript
import * as firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyAeef6ppzfZI3kLGiUkXPrE2sBGeyochnY',
  authDomain: 'vr-hero-app.firebaseapp.com',
  databaseURL: 'https://vr-hero-app.firebaseio.com',
  projectId: 'vr-hero-app',
  messagingSenderId: '729035450276',
};

export const firebaseApp = firebase.initializeApp(config);
```

You can change the value of the `config` object to point to your own Firebase project, if you wish. Next, we will create two services:

```
ng generate service firebase-utils
ng generate service user-presence
```

Paste [the code here](src/app/firebase-utils.service.ts) into `firebase-utils.service.ts`. It's a utility service that converts Firebase paths into RxJS observables that we can subscribe to in our Angular app.

Then, paste [this code](src/app/user-presence.service.ts) into `user-presence.service.ts`. This service tracks the users in your app - basically, creating a new `IUser` object for each users who joins the VR scene with the following fields:

```typescript
export interface IUser {
  id: string;
  color: string;
  x: number;
  z: number;
  rotationX?: number;
  rotationY?: number;
  me?: boolean;
}
```

New users are created with a unique id, a random position and color. Don't worry about the other fields (rotation / me) - we will get to them later.

Finally, the UserPresence service has a `users$` property which emits an array of logged-in users whenever there is an update to the user list.

We will attach this service to our component. Modify your `app.component.ts` to save this observable as a local property:

```typescript
export class AppComponent {
  users$ = this.userPresence.users$;

  constructor(private userPresence: UserPresenceService) {
  }

  userId(user: IUser) {
      return user.id;
  }
}
```

Now, that we have this observable on our component, we can use that to visualize the users in our scene. We'll modify the `<a-sphere>` element in our `app.component.ts` to repeat for each of the users:

```html
  <a-sphere *ngFor="let user of users$ | async; trackBy: userId" 
    [attr.position]="{x: user.x, y: 1.5, z: user.z} | aframe" 
    [attr.color]="user.color">
  </a-sphere>
```

We use the `async` pipe as `users$` is an observable. `trackBy` will be used to avoid re-creating the spheres whenever the user list change - otherwise, we will get an annoying flicker as the spheres are recreated.

Then, we bind the `position` attribute to an object containing the user position (specifically their x / z coordinates). We need to pass this object through the [aframe pipe](https://www.npmjs.com/package/angular-aframe-pipe), as a workaround for [an issue with Angular + A-Frame integration](https://github.com/angular/angular/issues/20452). 

Similarly, we bind the `color` attribute to the user's color property. Here we don't need the `aframe` pipe as the color is a simple string and not an object.

## Adding some visual touches

Let's make our world look more like a video game. We'll start by adding some colorful spikes on the floor, turning it into a dance floor. We'll start by loading a texture to be used for the floor:

```html
  <a-assets>
    <img id="floor-texture" src="assets/floor.gif">
  </a-assets>
```

We can then use this texture for our `<a-plane>` element:

```html
  <a-plane material="shader: gif; src: #floor-texture" 
    position="0 0 -5" rotation="-90 0 0" 
    width="5" height="5" ></a-plane>
```

Note the use of the `gif` shader, which adds animated GIF texture support to a-frame (it's a part of the [aframe-gif-component](https://www.npmjs.com/package/aframe-gif-component) package).

Now we will make our floor larger and repeat the texture multiple times:

```html
  <a-plane material="shader: gif; src: #floor-texture; repeat: 100 100" 
    position="0 0 -5" rotation="-90 0 0" 
    width="300" height="300"></a-plane>
```

At this point, we already got a nearly infinite dance floor, and we can make it better by enabling animation for the texture, using a-frame's GIF shader which supports animated GIF textures:

```html
  <a-plane material="src: #floor-texture; repeat: 100 100; shader: gif" 
    position="0 0 -5" rotation="-90 0 0" 
    width="300" height="300"></a-plane>
```

Let's add a similar touch for the sky, using an animated star texture and repeating it. First, load the new texture inside the `<a-assets>` element:

```html
  <a-assets>
    <img id="sky-texture" src="assets/stars.gif">
    <img id="floor-texture" src="assets/floor.gif">
  </a-assets>
```

Next, update the `<a-sky>` element to use this texture and repeat it:

```html
  <a-sky material="shader: gif; src: #sky-texture; repeat: 10 5"></a-sky>
```

## We are Invaders!

It's time to upgrade our simple spheres to actual Invaders!

We will start by loading the Invader 3D Model file. Add the following line to you `a-assets` section:

```html
    <a-asset id="invader-obj" src="assets/invader-2.obj"></a-asset>
```

And then replace the `<a-sphere>` element with `<a-obj-model>` referencing the asset we just added:

```html
  <a-obj-model src="#invader-obj" 
    *ngFor="let user of users$ | async; trackBy: userId" 
    [attr.position]="{x: user.x, y: 1.5, z: user.z} | aframe"
    [attr.color]="user.color">
  </a-obj-model>
```

It's basically the same thing as we had for the sphere above, only this time we are using `<a-obj-model src="invader-obj" ...>` in place of `<a-sphere ...>`.

## Setting up the camera

We want our invaders to follow the real players as they orient in our virtual world. In order to do so, we will take control of the a-frame camera. Add the following elements to your scene:

```html
  <a-camera position="0 1.6 0" look-controls wasd-controls>
  </a-camera>
```

The `look-controls` and `wasd-controls` attributes tell a-frame that we want to let the user control the camera by rotating their smartphones or using the keyboard on a computer.

Next, we will setup the event handlers for the camera:

```html
  <a-camera position="0 1.6 0" look-controls wasd-controls
    rotation-listener (rotationChanged)="onRotationChanged($event.detail)"
    position-listener (positionChanged)="onPositionChanged($event.detail)">
  </a-camera>
```

The `rotation-listener` and `position-listener` attributes poll the camera for changes in the respective attributes. They are provided by the [aframe-camera-events](https://www.npmjs.com/package/aframe-camera-events) package, and they fire the `rotationChanged` and `positionChanged` events on the camera component. Since `a-frame` elements are actually Web Components, we can use the angular syntax to listen for these events.

We also need to implement the event handlers in our AppController:

```typescript
  onRotationChanged(value: AFrame.Coordinate) {
    this.userPresence.updateMyRotation(value);
  }

  onPositionChanged(value: AFrame.Coordinate) {
    this.userPresence.updateMyPosition(value);
  }
```

These event listeners simply call the respective methods on our `userPresence` service, which in turn saves the new values to Firebase.

Let's update our invader objects to rotate following their respective users:

```html
  <a-obj-model src="#invader-obj" 
    *ngFor="let user of users$ | async; trackBy: userId" 
    [attr.visible]="!user.me"
    [attr.position]="{x: user.x, y: 1.5, z: user.z} | aframe"
    [attr.rotation]="{x: user.rotationX, y: user.rotationY, z: 0} | aframe"
    [attr.color]="user.color">
  </a-obj-model>
```

Also note how we set the `visible` attribute to `!user.me`, which will hide our own user for the display. This will be useful for the next step, where we will be changing you perspective to the random location chosen for your user by moving the camera there.

We will start by updating the constructor to include a `me` property with the current user's details:

```typescript
export class AppComponent implements OnInit {
  users$ = this.userPresence.users$;
  me: IUser;
  constructor(private userPresence: UserPresenceService) {
    userPresence.me$.subscribe((value) => {
      this.me = value;
    });
  }
```

Then, we can wrap the camera with another object, that will set its position based on our user's position:

```html
  <a-entity id="#rig" [attr.position]="{x: me.x, y: 0, z: me.z} | aframe">
    <a-camera position="0 1.6 0" look-controls wasd-controls
      rotation-listener (rotationChanged)="onRotationChanged($event.detail)"
      position-listener (positionChanged)="onPositionChanged($event.detail)">
    </a-camera>
  </a-entity>
```

## Jump jump jump!

To make our experience even more fun, we will make our users jump and use the accelerometer to detect these jumps. Start by creating a jump-detection service:

```
ng generate service jump-detection
```

then paste [this code](src/app/jump-detection.service.ts) following code into `jump-detection.service.ts`. This service exports an observable called `jumps$` which merges events from both the accelerometer (on mobile phone) and the keyboard (pressing the space key on a computer).

The `jump$` event will emit a value representing the jump strength whenever the user is jumping, then `null` when the jump event is over (either 500 milliseconds after the accelerometer value crossed the defined threshold, or whenever the space key was released).

We will subscribe to this observable in our AppComponent's constructor:

```typescript
  constructor(
    private userPresence: UserPresenceService,
    jumpDetectionService: JumpDetectionService,
  ) {
    ...
    jumpDetectionService.jumps$.subscribe((jumpValue) => {
      userPresence.setJumping(jumpValue);
    });
  }
```

This code basically updates our user object with Firebase, indicating whether we are jumping.

Two final touches would be updating our camera so our viewpoint changes whenever we jump, and also let other users see us jumping. Change the camera rig (the `e-entity` wrapping that wraps the `a-camera`) as follows:

```html
  <a-entity id="#rig" [attr.position]="{x: me.x, y: me.jump ? 3 : 1.5, z: me.z} | aframe">
```

and finally, change the `a-obj-model` that draws the player avatars to account for the jump parameter (note the change in the y value of `[attr.position]):

```html
  <a-obj-model src="#invader-obj" 
    *ngFor="let user of users$ | async; trackBy: userId" 
    [attr.visible]="!user.me"
    [attr.position]="{x: user.x, y: user.jump ? 3 : 1.5, z: user.z}|aframe" 
    [attr.rotation]="{x: user.rotationX, y: user.rotationY, z: 0}|aframe"
    [attr.color]="user.color">
  </a-obj-model>
```

That's all folks! Enjoy your new game :)
