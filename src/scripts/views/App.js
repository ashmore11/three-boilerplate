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
    const spotLight = new THREE.SpotLight(0xffffff, 2, 200, 1, 0.5, 1.5);
    spotLight.position.set(50, 200, 50);

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
      const height = 0.01;
      const radiusSegments = Math.round(i * 2) + 16;
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
      const material = new THREE.MeshBasicMaterial({ color });
      const cylinder = new THREE.Mesh(geometry, material);

      cylinder.material.side = THREE.DoubleSide;
      cylinder.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(i * 0.3, 0, 0));
      
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
      cylinder.rotation.y = (delta + cylinder.offset) * 0.0025;
    }
  }
}