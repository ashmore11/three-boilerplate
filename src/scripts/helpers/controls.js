import TrackballControls from 'three-trackballcontrols';
import camera from 'helpers/camera';

const controls = new TrackballControls(camera, document.querySelector('canvas')[0]);

controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = true;
controls.dynamicDampingFactor = 0.5;

export default controls;