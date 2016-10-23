import settings from 'app/settings';
import win from 'utils/window';

const renderer = new THREE.WebGLRenderer({
  antialias: settings.antialias,
});

renderer.setSize(win.width, win.height);
renderer.setClearColor(settings.renderColor);

renderer.shadowMap.enabled = true;

document.querySelector('#main').appendChild(renderer.domElement);

export default renderer;