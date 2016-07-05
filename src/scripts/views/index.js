import RAF from 'utils/raf';
import Scene from 'helpers/scene';

export default class Index {

  constructor() {
    this.meshRadius = 300;

    this.createSpecialMesh();
  }

  createSpecialMesh() {
    this.nebula = new THREE.Object3D;

    const materialOptions = {
      side: THREE.DoubleSide,
      wireframe: true,
      color: 0x000000
    };

    const geometry = new THREE.ParametricGeometry(
      this.radialWave.bind(this), 20, 20, false
    );
    const material = new THREE.MeshBasicMaterial(materialOptions);
    const mesh = new THREE.Mesh(geometry, material);
    const matrix = new THREE.Matrix4;

    geometry.applyMatrix(
      matrix.makeTranslation(-(this.meshRadius / 2), 0, -(this.meshRadius / 2))
    );

    this.nebula.add(mesh);
    
    Scene.add(this.nebula);
  }

  radialWave(u, v) {
    const x = Math.sin(u) * this.meshRadius;
    const z = Math.sin(v) * this.meshRadius;
    const y = (Math.sin(u * 4 * Math.PI) + Math.cos(v * 6 * Math.PI)) * this.randomNumber(3, 5);

    const vector = new THREE.Vector3(x, y, z);

    return vector;
  }

  randomNumber(min, max) {
    return (Math.random() * (max - min + 1)) + min;
  }

  update() {
    // for (const plane of this.nebula.children) { 
    //   plane.geometry.verticesNeedUpdate = true;
    // }
  }
}