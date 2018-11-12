import * as THREE from 'three';

class SpectralCurve {
  constructor({startAngle = 0}) {
    this.numControlPoints = 10;
    this.numCurvePoints = 100;
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

    this.curve = curve;
    this.curveObject = curveObject;
  }
  animate({spectrum}) {
    // Update curve geometry
    const pointBandwidth = Math.floor(spectrum.length / this.numCurvePoints);
    for (let i = 0; i < this.curve.points.length; i++) {
      const binAmplitude = spectrum[i * pointBandwidth];
      const point = this.curve.points[i];
      const newPoint = point.direction.clone().multiplyScalar(binAmplitude);
      point.set(newPoint.x, newPoint.y, newPoint.z);
    }
    this.curveObject.geometry.setFromPoints(this.curve.getPoints(this.numCurvePoints));
    this.curveObject.geometry.verticesNeedUpdate = true;
  }
  getSceneObject() {
    return this.curveObject;
  }
}

export {SpectralCurve};
