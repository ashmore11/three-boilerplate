import Settings from 'settings';
import win      from 'utils/window';
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
    win.on('resize', this.resize);

    this.view = new View;

  }

  update() {

    Renderer.setViewport(0, 0, win.width, win.height);
    Renderer.setScissor(0, 0, win.width, win.height);
    Renderer.enableScissorTest(true);
    Renderer.render(Scene, Camera);

    Camera.updateProjectionMatrix();

    Controls.update();

  }

  resize() {

    Renderer.setSize(win.width, win.height);

    Camera.aspect = win.width / win.height;
    
    Camera.updateProjectionMatrix();

  }

}

export default new APP();