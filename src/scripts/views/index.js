import RAF      from 'utils/raf';
import Scene    from 'helpers/scene';
import BaseView from 'views/baseView';

class Index extends BaseView {

  constructor() {

    super(); // Expose the parent class to this view

    this.addObjects();

  }

  /**
   * Bind all events here
   */
  bindEvents() {
    
    RAF.on('tick', this.update);

  }

  addObjects() {

    let geometry = new THREE.SphereGeometry(10, 16, 16);
    let material = new THREE.MeshBasicMaterial({
      color: 0x000000,
      wireframe: true,
    });
    
    let mesh = new THREE.Mesh(geometry, material);

    Scene.add(mesh);

  }

  /**
   * requestAnimationFrame update
   */
  update(time) {
    
  }

}

export default Index;