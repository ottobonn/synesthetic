import * as THREE from 'three';
import {EffectComposer, EffectPass, BlurPass, RenderPass, KernelSize, BloomEffect, ScanlineEffect, ChromaticAberrationEffect} from 'postprocessing';
// import {BoxVisualizer} from './visualizers/BoxVisualizer';
import {PieVisualizer} from './visualizers/PieVisualizer';

class SceneManager {
  constructor({canvas}) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(76, 1, 0.1, 1000);
    const context = canvas.getContext('webgl2');
    const renderer = new THREE.WebGLRenderer({
      canvas,
      context,
      antialias: true,
    });

    const effects = [
      new BloomEffect(),
      new ChromaticAberrationEffect({
        offset: new THREE.Vector2(0.004, 0.004),
      }),
      new ScanlineEffect(),
    ];

    const composer = new EffectComposer(renderer);

    const passes = [
      new RenderPass(scene, camera),
      new BlurPass({
        kernelSize: KernelSize.SMALL,
      }),
      new EffectPass(camera, ...effects),
    ];

    passes[passes.length - 1].renderToScreen = true;
    passes.map(composer.addPass.bind(composer));

    this.composer = composer;
    this.clock = new THREE.Clock();
    this.canvas = canvas;
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    camera.position.z = 5;

    this.visualizers = [new PieVisualizer({scene})];
  }
  animate({width, height, spectrum}) {
    if (width !== this.lastWidth || height !== this.lastHeight) {
      this.composer.setSize(width, height);
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
    this.composer.render(this.scene, this.camera);
  }
}

export {SceneManager};
