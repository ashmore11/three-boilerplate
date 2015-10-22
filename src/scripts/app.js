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

    if (Settings.debug) {
      Scene.add(new THREE.GridHelper(50, 10));
      Scene.add(new THREE.AxisHelper(60));
    }

    RAF.on('tick', this.update);
    Win.on('resize', this.resize);

    this.view = new View;

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
    
    Camera.updateProjectionMatrix();

  }

}

let app = new APP();