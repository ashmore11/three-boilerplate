win = require 'utils/window'

camera = new THREE.PerspectiveCamera( 65, win.width / win.height, 0.1, 10000 )

camera.position.set 150, 45, 150
camera.lookAt new THREE.Vector3

module.exports = camera