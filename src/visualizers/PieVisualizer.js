import * as THREE from 'three';

class PieVisualizer {
  constructor({scene}) {

    const numSlices = 100;
    const slices = [];

    for (let i = 0; i < numSlices; i++) {
      const sliceShape = new THREE.Shape();

      const startOffset = -Math.PI / 2;
      const angularBounds = 2 * Math.PI / numSlices;
      const angularMargin = 0.001;
      const angularWidth = angularBounds - 2 * angularMargin;

      const sliceStart = startOffset + angularBounds * i + angularMargin;
      const sliceEnd = sliceStart + angularWidth;

      sliceShape.absarc(0, 0, 0.5, sliceEnd,sliceStart, true);
      sliceShape.absarc(0, 0, 1, sliceStart, sliceEnd, false);

      const geometry = new THREE.ExtrudeGeometry(sliceShape, {
        depth: 0.2,
        steps : 1,
        bevelEnabled: false,
        curveSegments: 50,
      });

      const material = new THREE.MeshBasicMaterial({color: 0xffffff});

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
      const binAmplitude = Math.max(Math.log(10 * spectrum[index * sliceBandwidth]), 0.001);
      slice.scale.x = binAmplitude;
      slice.scale.y = binAmplitude;
    });
  }
}

export {PieVisualizer};
