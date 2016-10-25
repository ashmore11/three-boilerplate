import settings from 'app/settings';
import win from 'utils/window';
import raf from 'utils/raf';
import renderer from 'helpers/renderer';
import controls from 'helpers/controls';
import camera from 'helpers/camera';
import scene from 'helpers/scene';
import App from 'views/App';

export default class Main {
  constructor() {
    if (settings.debug) this.debug();

    this.bindEvents();

    this.app = new App();
  }

  bindEvents() {
    raf.on('tick', ::this.update);
    win.on('resize', ::this.resize);
  }

  debug() {
    scene.add(new THREE.GridHelper(50, 10));
    scene.add(new THREE.AxisHelper(100));
  }

  update(delta) {
    renderer.setViewport(0, 0, win.width, win.height);
    renderer.setScissor(0, 0, win.width, win.height);
    renderer.setScissorTest(true);
    renderer.render(scene, camera);

    camera.updateProjectionMatrix();

    controls.update();

    this.app.update(delta);
  }

  resize() {
    renderer.setSize(win.width, win.height);
    camera.aspect = win.width / win.height;
  }
}