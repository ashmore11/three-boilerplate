win = require 'utils/window'

renderer = new THREE.WebGLRenderer antialias: true

renderer.setSize win.width, win.height
renderer.setClearColor 0x000000

renderer.shadowMapEnabled = on
renderer.shadowMapSoft = true

$('main').append renderer.domElement

module.exports = renderer