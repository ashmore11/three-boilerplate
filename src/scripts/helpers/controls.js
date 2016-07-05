import TrackballControls from 'three-trackballcontrols';
import Camera from 'helpers/camera';

const el = document.querySelector('canvas');
const Controls = new TrackballControls(Camera, el);

Controls.rotateSpeed = 1.0
Controls.zoomSpeed = 1.2
Controls.panSpeed = 0.8
Controls.noZoom = false
Controls.noPan = false
Controls.staticMoving = true
Controls.dynamicDampingFactor = 0.5

export default Controls;