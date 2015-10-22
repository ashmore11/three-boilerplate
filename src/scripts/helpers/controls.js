import Camera from 'helpers/camera';

const Controls = new THREE.TrackballControls(Camera, $('canvas')[0]);

Controls.rotateSpeed          = 1.0
Controls.zoomSpeed            = 1.2
Controls.panSpeed             = 0.8
Controls.noZoom               = false
Controls.noPan                = false
Controls.staticMoving         = true
Controls.dynamicDampingFactor = 0.5

export default Controls;