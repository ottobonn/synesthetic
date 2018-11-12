import * as THREE from 'three';

class TunnelVisualizer {
  constructor({scene}) {
    this.numControlPoints = 10;
    this.numCurvePoints = 100;
    this.numCurves = 50;
    this.treadmillLength = 50;
    this.treadmillSpeed = 2;

    this.curves = [];
    for (let i = 0; i < this.numCurves; i++) {
      const startAngle = 0;
      const {curve, curveObject} = this.makeCurve({startAngle});
      curveObject.position.z = THREE.Math.lerp(-this.treadmillLength / 2, this.treadmillLength / 2, i / this.numCurves);
      scene.add(curveObject);
      this.curves.push({curve, curveObject});
    }
  }
  makeCurve({startAngle}) {
    const curvePoints = [];
    for (let j = 0; j < this.numControlPoints; j++) {
      const point = new THREE.Vector3();
      const angle = startAngle + 2 * Math.PI * j / this.numControlPoints;
      point.direction = new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0);
      curvePoints.push(point);
    }
    const curve = new THREE.CatmullRomCurve3(curvePoints, true);
    const points = curve.getPoints(this.numCurvePoints);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 3,
    });
    const curveObject = new THREE.Line(geometry, material);
    return {curve, curveObject};
  }
  animate({spectrum, clock}) {
    if (!spectrum.length) {
      return;
    }
    const pointBandwidth = Math.floor(spectrum.length / this.numCurvePoints);
    const clockDelta = clock.getDelta();
    this.curves.forEach(({curve, curveObject}) => {
      // Update curve geometry
      for (let i = 0; i < curve.points.length; i++) {
        const binAmplitude = spectrum[i * pointBandwidth];
        const point = curve.points[i];
        const newPoint = point.direction.clone().multiplyScalar(binAmplitude);
        point.set(newPoint.x, newPoint.y, newPoint.z);
      }

      curveObject.geometry.setFromPoints(curve.getPoints(this.numCurvePoints));
      curveObject.geometry.verticesNeedUpdate = true;
      
      // Move curve along treadmill
      const {x, y, z} = curveObject.position;
      curveObject.position.set(x, y, z + clockDelta * this.treadmillSpeed);
      if (z > this.treadmillLength / 2) {
        curveObject.position.set(x, y, -this.treadmillLength / 2);
      }
    });
  }
}

export {TunnelVisualizer};
