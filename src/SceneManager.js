import * as THREE from 'three';
import {EffectComposer, EffectPass, BlurPass, RenderPass, KernelSize, BloomEffect, ScanlineEffect, ChromaticAberrationEffect} from 'postprocessing';
// import {BoxVisualizer} from './visualizers/BoxVisualizer';
import {PieVisualizer} from './visualizers/PieVisualizer';
import {ParticleSystem} from './visualizers/ParticleSystem';
import {TunnelVisualizer} from './visualizers/TunnelVisualizer';

class EffectModulator {
  constructor({effect, modulator}) {
    this.effect = effect;
    this.modulator = modulator || (() => {});
  }
  animate(params) {
    this.modulator(this.effect, params);
  }
}

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

    this.effectModulators = [
      new EffectModulator({
        effect: new BloomEffect(),
      }),
      new EffectModulator({
        effect: new ChromaticAberrationEffect(),
        modulator(effect, {rms}) {
          const minOffset = new THREE.Vector2(0, 0);
          const maxOffset = new THREE.Vector2(0.05, 0.05);
          const offset = minOffset.lerp(maxOffset, rms);
          effect.offset = offset;
        },
      }),
      new EffectModulator({
        effect: new ScanlineEffect(),
      }),
    ];

    const effects = this.effectModulators.map(modulator => modulator.effect);

    const composer = new EffectComposer(renderer);

    const passes = [
      new RenderPass(scene, camera),
      new EffectPass(camera, ...effects),
      new BlurPass({
        kernelSize: KernelSize.VERY_SMALL,
      }),
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

    this.visualizers = [
      new PieVisualizer({scene}),
      new ParticleSystem({scene}),
      new TunnelVisualizer({scene}),
    ];
  }
  animate(params) {
    const {width, height} = params;
    if (width !== this.lastWidth || height !== this.lastHeight) {
      this.composer.setSize(width, height);
      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.lastWidth = width;
      this.lastHeight = height;
    }
    // TODO adding to params seems to mix concerns; who should own the clock?
    params.clock = this.clock;
    this.visualizers.forEach(visualizer => visualizer.animate(params));
    this.effectModulators.forEach(effectModulator => effectModulator.animate(params));
    this.composer.render(this.scene, this.camera);
  }
}

export {SceneManager};
