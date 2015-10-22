import Win from 'utils/window';

let fov = 65;
let aspect = Win.width / Win.height;
let near = 0.1;
let far = 10000;

const Camera = new THREE.PerspectiveCamera(
  fov,
  aspect,
  near,
  far
);

Camera.position.set(60, 45, 60)
Camera.lookAt(new THREE.Vector3());

export default Camera;