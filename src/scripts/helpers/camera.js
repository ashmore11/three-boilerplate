import win from 'utils/window';

let fov = 65;
let aspect = win.width / win.height;
let near = 0.1;
let far = 10000;

const camera = new THREE.PerspectiveCamera(
  fov,
  aspect,
  near,
  far
);

camera.position.set(60, 45, 60)
camera.lookAt(new THREE.Vector3());

export default camera;