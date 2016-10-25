import scene from 'helpers/scene';
import randomcolor from 'randomcolor';

export default class App {
  cylinderCount = 20;
  cylinders = [];

  constructor() {
    this.addLight();
    this.addObjects();
  }

  addLight() {
    const color = 0xffffff;
    const intensity = 4;
    const distance = 200;
    const angle = 1;
    const penumbra = 0.5;
    const decay = 1.5;

    const spotLight = new THREE.SpotLight(
      color,
      intensity,
      distance,
      angle,
      penumbra,
      decay
    );

    spotLight.position.set(0, 200, 0);
    spotLight.castShadow = true;
    
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 300;
    spotLight.shadow.camera.far = 800;
    spotLight.shadow.camera.fov = 50;

    scene.add(spotLight);

    const shadowHelper = new THREE.CameraHelper(spotLight.shadow.camera);
    scene.add(shadowHelper);
  }

  addObjects() {
    for (let i = 0; i <= this.cylinderCount; i++) {
      const radiusTop = (i * 2) + 10;
      const radiusBottom = i * 2;
      const height = 0.001;
      const radiusSegments = Math.round(i * 2) + 32;
      const heightSegments = 1;
      const openEnded = true;
      const thetaStart = 0;
      const thetaLength = Math.PI * 2;
      const color = randomcolor({ luminosity: 'light', hue: 'random' });

      const geometry = new THREE.CylinderBufferGeometry(
        radiusTop,
        radiusBottom,
        height,
        radiusSegments,
        heightSegments,
        openEnded,
        thetaStart,
        thetaLength
      );
      const material = new THREE.MeshLambertMaterial({ color });
      const cylinder = new THREE.Mesh(geometry, material);

      cylinder.material.side = THREE.DoubleSide;
      cylinder.geometry.translate(0, 0, 0);
      
      cylinder.castShadow = true;
      cylinder.receiveShadow = true;

      cylinder.position.y = i * 5;
      cylinder.offset = i * 100;

      this.cylinders.push(cylinder);

      scene.add(cylinder);
    }
  }

  update(delta) {
    for (const cylinder of this.cylinders) {
      // cylinder.rotation.y = Math.sin((delta + cylinder.offset) * 0.001) * Math.PI;
      // cylinder.rotation.y = (delta + cylinder.offset) * 0.0025;
    }
  }
}