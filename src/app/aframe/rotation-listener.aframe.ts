AFRAME.registerComponent('rotation-listener', {
  tick() {
    const cameraEl = this.el.sceneEl.camera.el;
    const newValue = cameraEl.getAttribute('rotation');
    const stringCoords = AFRAME.utils.coordinates.stringify(newValue);
    if (this.lastValue !== stringCoords) {
      cameraEl.emit('rotationChanged', newValue);
      this.lastValue = stringCoords;
    }
  },
});
