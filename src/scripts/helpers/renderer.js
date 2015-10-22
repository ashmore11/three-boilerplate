import Settings from 'settings';
import Win      from 'utils/window';

const Renderer = new THREE.WebGLRenderer({
  antialias: Settings.antialias
});

Renderer.setSize(Win.width, Win.height);
Renderer.setClearColor(Settings.renderColor);

Renderer.shadowMapEnabled = true;

$('main').append(Renderer.domElement);

export default Renderer;