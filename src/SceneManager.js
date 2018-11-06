import * as THREE from 'three';
// import {BoxVisualizer} from './visualizers/BoxVisualizer';
import {PieVisualizer} from './visualizers/PieVisualizer';

class SceneManager {
  constructor({canvas}) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(76, 1, 0.1, 1000);
    const context = canvas.getContext('webgl2');
    const renderer = new THREE.WebGLRenderer({canvas, context});

    this.canvas = canvas;
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    camera.position.z = 5;

    this.visualizers = [new PieVisualizer({scene})];
  }
  animate({width, height, spectrum}) {
    if (width !== this.lastWidth || height !== this.lastHeight) {
      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.lastWidth = width;
      this.lastHeight = height;
    }
    this.visualizers.forEach(visualizer => visualizer.animate({
      width,
      height,
      spectrum,
    }));
    this.renderer.render(this.scene, this.camera);
  }
}

export {SceneManager};
