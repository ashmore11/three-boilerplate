import Settings from 'app/settings';
import Win from 'utils/window';

const Renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});

Renderer.setSize(Win.width, Win.height);
Renderer.setClearColor(0xFFFFFF, 1);

const el = document.querySelector('main');
el.appendChild(Renderer.domElement);

export default Renderer;