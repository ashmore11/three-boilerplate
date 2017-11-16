win = require 'utils/window'

renderer = new THREE.WebGLRenderer antialias: true

renderer.setSize win.width, win.height
renderer.setClearColor "#ffffff"

renderer.shadowMap.enabled = on

$('main').append renderer.domElement

module.exports = renderer