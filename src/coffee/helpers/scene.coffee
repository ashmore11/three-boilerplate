Settings = require 'settings'

module.exports = new THREE.Scene

if Settings.fog
  
  module.exports.fog = new THREE.FogExp2 0x000000, 0.005