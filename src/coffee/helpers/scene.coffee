Settings = require 'settings'

scene = new THREE.Scene

if Settings.debug

  scene.add new THREE.GridHelper 50, 10
  scene.add new THREE.AxisHelper 60

module.exports = scene