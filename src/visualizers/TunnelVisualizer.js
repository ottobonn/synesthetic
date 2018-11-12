import * as THREE from 'three';

import {SpectralCurve} from './SpectralCurve';

class TunnelVisualizer {
  constructor({scene}) {
    this.numCurves = 50;
    this.treadmillLength = 50;
    this.treadmillSpeed = 2;

    this.curves = [];
    for (let i = 0; i < this.numCurves; i++) {
      const startAngle = 0;
      const curve = new SpectralCurve({scene, startAngle});
      curve.getSceneObject().position.z = THREE.Math.lerp(-this.treadmillLength / 2, this.treadmillLength / 2, i / this.numCurves);
      this.curves.push(curve);
      scene.add(curve.getSceneObject());
    }
  }
  animate({spectrum, clockDelta}) {
    if (!spectrum.length) {
      return;
    }
    this.curves.forEach(curve => {
      curve.animate({spectrum});
      // Move curve along treadmill
      const {x, y, z} = curve.getSceneObject().position;
      curve.getSceneObject().position.set(x, y, z + clockDelta * this.treadmillSpeed);
      if (z > this.treadmillLength / 2) {
        curve.getSceneObject().position.set(x, y, -this.treadmillLength / 2);
      }
    });
  }
}

export {TunnelVisualizer};
