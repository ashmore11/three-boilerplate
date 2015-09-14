win = require 'utils/window'

camera = new THREE.PerspectiveCamera( 65, win.width / win.height, 0.1, 100000 )

camera.position.set 60, 45, 60
camera.lookAt new THREE.Vector3

module.exports = camera