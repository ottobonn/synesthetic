import * as THREE from 'three';

class PieVisualizer {
  constructor({scene}) {

    const numSlices = 100;
    const slices = [];

    for (let i = 0; i < numSlices; i++) {
      const sliceShape = new THREE.Shape();

      const startOffset = -Math.PI / 2;
      const angularBounds = 2 * Math.PI / numSlices;
      const angularMargin = 0.01;
      const angularWidth = angularBounds - 2 * angularMargin;

      const sliceStart = startOffset + angularBounds * i + angularMargin;
      const sliceEnd = sliceStart + angularWidth;

      sliceShape.moveTo(0, 0);
      sliceShape.absarc(0, 0, 1, sliceStart, sliceEnd, false);
      sliceShape.lineTo(0, 0);

      const geometry = new THREE.ExtrudeGeometry(sliceShape, {
        depth: 1,
        steps : 1,
        bevelEnabled: false,
        curveSegments: 24,
      });

      const material = new THREE.MeshBasicMaterial({color: 0x00eeff});

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      slices.push(mesh);
    }

    this.slices = slices;
  }

  animate({spectrum}) {
    if (!spectrum.length) {
      return;
    }
    const numSlices = this.slices.length;
    const sliceBandwidth = Math.floor(spectrum.length / numSlices);
    this.slices.forEach((slice, index) => {
      const binAmplitude = Math.max(Math.log(10 * spectrum[index * sliceBandwidth]), 0.01);
      slice.scale.x = binAmplitude;
      slice.scale.y = binAmplitude;
    });
  }
}

export {PieVisualizer};