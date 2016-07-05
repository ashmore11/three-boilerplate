import Settings from 'app/settings';
import Win from 'utils/window';
import RAF from 'utils/raf';
import Renderer from 'helpers/renderer';
import Controls from 'helpers/controls';
import Camera from 'helpers/camera';
import Scene from 'helpers/scene';
import View from 'views/index';

class APP {
  constructor() {
    Settings.debug ? this.debug() : null

    this.view = new View();

    this.bindEvents();
  }

  bindEvents() {
    RAF.on('tick', this.update.bind(this));
    Win.on('resize', this.resize.bind(this));
  }

  debug() {
    // Scene.add(new THREE.GridHelper(50, 10));
    Scene.add(new THREE.AxisHelper(60));
  }

  update() {
    Renderer.setViewport(0, 0, Win.width, Win.height);
    Renderer.setScissor(0, 0, Win.width, Win.height);
    Renderer.setScissorTest(true);
    Renderer.render(Scene, Camera);

    Camera.updateProjectionMatrix();

    Controls.update();
    this.view.update();
  }

  resize() {
    Renderer.setSize(Win.width, Win.height);
    Camera.aspect = Win.width / Win.height;
  }
}

window.app = new APP();