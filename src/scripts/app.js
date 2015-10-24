import Settings from 'settings';
import Win      from 'utils/window';
import RAF      from 'utils/raf';
import Renderer from 'helpers/renderer';
import Controls from 'helpers/controls';
import Camera   from 'helpers/camera';
import Scene    from 'helpers/scene';
import View     from 'views/index';

class APP {

  constructor() {

    Settings.debug ? this.debug() : null

    this.bindEvents();

    this.view     = new View();
    this.camera   = Camera;
    this.scene    = Scene;
    this.settings = Settings;

  }

  bindEvents() {

    RAF.on('tick', this.update);
    Win.on('resize', this.resize);

  }

  debug() {

    Scene.add(new THREE.GridHelper(50, 10));
    Scene.add(new THREE.AxisHelper(60));

  }

  update() {

    Renderer.setViewport(0, 0, Win.width, Win.height);
    Renderer.setScissor(0, 0, Win.width, Win.height);
    Renderer.enableScissorTest(true);
    Renderer.render(Scene, Camera);

    Camera.updateProjectionMatrix();

    Controls.update();

  }

  resize() {

    Renderer.setSize(Win.width, Win.height);

    Camera.aspect = Win.width / Win.height;

  }

}

window.app = new APP();