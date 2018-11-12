import * as THREE from 'three';

import {SpectralCurve} from './SpectralCurve';

class SphereVisualizer {
  constructor({scene}) {
    this.numCurves = 10;
    this.radius = 1.2;
    this.treadmillSpeed = 0.1;

    this.curves = [];
    this.group = new THREE.Group();
    for (let i = 0; i < this.numCurves; i++) {
      const startAngle = 0;
      const curve = new SpectralCurve({scene, startAngle});
      curve.getSceneObject().position.z = THREE.Math.lerp(-this.radius, this.radius, i / this.numCurves);
      this.curves.push(curve);
      this.group.add(curve.getSceneObject());
    }

    this.group.rotateX(Math.PI / 2);
    scene.add(this.group);
  }
  animate({spectrum, clockDelta}) {
    if (!spectrum.length) {
      return;
    }
    this.curves.forEach(curve => {
      curve.animate({spectrum});
      // Move curve along treadmill
      let {x, y, z} = curve.getSceneObject().position;
      const newZ = (this.radius + z + clockDelta * this.treadmillSpeed) % (2 * this.radius) - this.radius;
      curve.getSceneObject().position.set(x, y, newZ);

      ({x, y, z} = curve.getSceneObject().position);
      const scale = Math.max(Math.sqrt(this.radius**2 - z**2) / this.radius, 0.01);
      curve.getSceneObject().scale.set(scale, scale, 1);
    });

    this.group.rotateX(clockDelta * 0.1);
    this.group.rotateY(clockDelta * 0.1);
  }
}

export {SphereVisualizer};
