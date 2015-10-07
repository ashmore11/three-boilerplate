Camera = require 'helpers/camera'

controls = new THREE.TrackballControls Camera, $('canvas')[0]

controls.rotateSpeed          = 1.0
controls.zoomSpeed            = 1.2
controls.panSpeed             = 0.8
controls.noZoom               = false
controls.noPan                = false
controls.staticMoving         = true
controls.dynamicDampingFactor = 0.5
controls.maxDistance          = 300
controls.minDistance          = 100

module.exports = controls