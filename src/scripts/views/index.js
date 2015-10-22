import RAF   from 'utils/raf';
import Scene from 'helpers/scene';

class Index {

  constructor() {

    RAF.on('tick', this.update);

    let geometry = new THREE.SphereGeometry(10, 16, 16);
    let material = new THREE.MeshBasicMaterial({
      color: 0x000000,
      wireframe: true
    });
    
    let mesh = new THREE.Mesh(geometry, material);

    Scene.add(mesh);

  }

  update( time ) {
    //
  }

}

export default Index;