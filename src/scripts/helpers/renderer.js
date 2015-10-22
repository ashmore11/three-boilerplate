import win from 'utils/window';

const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(win.width, win.height);
renderer.setClearColor("#ffffff");

renderer.shadowMapEnabled = true;

$('main').append(renderer.domElement);

export default renderer;