import * as THREE from 'three';

class BoxVisualizer {
  constructor({scene}) {
    const xCount = 5;
    const yCount = 4;
    this.objects = [];

    for (let i = 0; i < xCount; i++) {
      for (let j = 0; j < yCount; j++) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({color: 0x003300});
        const cube = new THREE.Mesh(geometry, material);

        const edges = new THREE.EdgesGeometry(geometry);
        const edgeMaterial = new THREE.LineBasicMaterial({
          color: 0xffffff,
          linewidth: 10,
        });
        const wireframe = new THREE.LineSegments(edges, edgeMaterial);
        const these = [cube, wireframe];
        these.forEach(object => {
          const scale = 2;
          const xOffset = scale * xCount / 2;
          const yOffset = scale * yCount / 2;
          object.position.x = i * scale - xOffset;
          object.position.y = j * scale - yOffset;
        });
        this.objects.push(...these);
      }
    }

    this.objects.forEach(object => {
      scene.add(object);
    });
  }

  animate({spectrum}) {
    if (!spectrum.length) {
      return;
    }
    const offset = 1;
    const gain = 3;
    const power = 5;
    this.objects.forEach(object => {
      object.scale.x = offset + gain * Math.pow(spectrum[50], power);
      object.scale.y = offset + gain * Math.pow(spectrum[100], power);
      object.scale.z = offset + gain * Math.pow(spectrum[150], power);
      // object.rotation.x += 0.01;
      // object.rotation.y += 0.01;
      // object.rotation.z += 0.01;
    });
  }
}

export {BoxVisualizer};
