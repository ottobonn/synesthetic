import * as THREE from 'three';

class ParticleSystem {
  constructor({scene}) {
    // create the particle variables
    const particleCount = 2000;
    const particles = new THREE.Geometry();
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      map: new THREE.TextureLoader().load('/assets/textures/particle.png'),
      blending: THREE.AdditiveBlending,
      transparent: true,
    });

    const boundingRadius = 10;
    const boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), boundingRadius);
    const getRandomCoordinate = () => THREE.Math.mapLinear(Math.random(), 0, 1, -boundingRadius, boundingRadius);

    while (particles.vertices.length < particleCount) {
      const x = getRandomCoordinate();
      const y = getRandomCoordinate();
      const z = getRandomCoordinate();
      const particle = new THREE.Vector3(x, y, z);
      if (boundingSphere.containsPoint(particle)) {
        const r = particle.clone().divideScalar(particle.length());
        particle.heading = r;
        particles.vertices.push(particle);
      }
    }

    this.particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(this.particleSystem);

    this.boundingSphere = boundingSphere;
  }
  animate({rms}) {
    this.particleSystem.rotation.y += 0.0001;
    const geometry = this.particleSystem.geometry;
    for (const particle of geometry.vertices) {
      particle.add(particle.heading.clone().multiplyScalar(rms));
      if (!this.boundingSphere.containsPoint(particle)) {
        particle.set(0, 0, 0);
      }
    }
    this.particleSystem.geometry.verticesNeedUpdate = true;
  }
}

export {ParticleSystem};
