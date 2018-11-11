import * as THREE from 'three';

class ParticleSystem {
  constructor({scene}) {
    // create the particle variables
    const particleCount = 1000;
    const particles = new THREE.Geometry();
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      map: new THREE.TextureLoader().load('/assets/textures/particle.png'),
      blending: THREE.AdditiveBlending,
      transparent: true,
    });

    const boundingRadius = 5;
    const boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), boundingRadius);
    const getRandomCoordinate = () => THREE.Math.mapLinear(Math.random(), 0, 1, -boundingRadius, boundingRadius);

    while (particles.vertices.length < particleCount) {
      const x = getRandomCoordinate();
      const y = getRandomCoordinate();
      const z = getRandomCoordinate();
      const particle = new THREE.Vector3(x, y, z);
      if (boundingSphere.containsPoint(particle)) {
        particles.vertices.push(particle);
      }
    }

    this.particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(this.particleSystem);
  }
  animate() {
    this.particleSystem.rotation.y += 0.0001;
  }
}

export {ParticleSystem};
